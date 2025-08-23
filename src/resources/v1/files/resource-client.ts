import {
  CoreClient,
  CoreResourceClient,
  ResourceClientOptions,
  RUNTIME,
} from "magic-hour/core";
import { UploadUrlsClient } from "magic-hour/resources/v1/files/upload-urls";
import * as fs from "fs";
import * as path from "path";
import { Readable } from "stream";

export type FileInput =
  | string
  | Buffer
  | Readable
  | File
  | NodeJS.ReadableStream;

/**
 * Determine file type and extension from file path or name.
 */
function getFileTypeAndExtension(fileName: string): {
  fileType: "audio" | "image" | "video";
  extension: string;
} {
  const ext = path.extname(fileName).toLowerCase().slice(1); // Remove the leading dot

  // Video extensions
  const videoExts = ["mp4", "m4v", "mov", "webm"];
  // Audio extensions
  const audioExts = ["mp3", "mpeg", "wav", "aac", "aiff", "flac"];
  // Image extensions
  const imageExts = [
    "png",
    "jpg",
    "jpeg",
    "webp",
    "avif",
    "jp2",
    "tiff",
    "bmp",
  ];

  let fileType: "audio" | "image" | "video";
  if (videoExts.includes(ext)) {
    fileType = "video";
  } else if (audioExts.includes(ext)) {
    fileType = "audio";
  } else if (imageExts.includes(ext)) {
    fileType = "image";
  } else {
    throw new Error(
      `Unsupported file extension: ${ext}. ` +
        "Supported types: video (mp4, m4v, mov, webm), " +
        "audio (mp3, mpeg, wav, aac, aiff, flac), " +
        "image (png, jpg, jpeg, webp, avif, jp2, tiff, bmp)",
    );
  }

  return { fileType, extension: ext };
}

/**
 * Process different file input types and return standardized information.
 */
function processFileInput(file: FileInput): {
  filePath?: string;
  fileData?: Buffer | Readable | File;
  fileType: "audio" | "image" | "video";
  extension: string;
} {
  if (typeof file === "string") {
    // File path
    if (!fs.existsSync(file)) {
      throw new Error(`File not found: ${file}`);
    }
    const { fileType, extension } = getFileTypeAndExtension(file);
    return { filePath: file, fileType, extension };
  } else if (Buffer.isBuffer(file)) {
    throw new Error(
      "Buffer input requires a file name for extension detection. " +
        "Please use a file path, File object, or stream with a name property.",
    );
  } else if (file instanceof Readable) {
    // Stream with path property
    const filePath = (file as any).path;
    if (typeof filePath !== "string") {
      throw new Error(
        "Stream must have a 'path' property for extension detection.",
      );
    }
    const { fileType, extension } = getFileTypeAndExtension(filePath);
    return { fileData: file, fileType, extension };
  } else if (typeof File !== "undefined" && file instanceof File) {
    // File object (browser)
    const { fileType, extension } = getFileTypeAndExtension(file.name);
    return { fileData: file, fileType, extension };
  } else {
    throw new Error("Unsupported file input type");
  }
}

export class FilesClient extends CoreResourceClient {
  private _uploadUrlsLazy?: UploadUrlsClient; // lazy-loading cache

  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
    if (this._opts.lazyLoad === false) {
      this.uploadUrls;
    }
  }

  get uploadUrls(): UploadUrlsClient {
    return (
      this._uploadUrlsLazy ??
      (this._uploadUrlsLazy = new (require("./upload-urls").UploadUrlsClient)(
        this._client,
        this._opts,
      ))
    );
  }

  /**
   * Upload a file to Magic Hour's storage.
   *
   * This method uploads a file to Magic Hour's secure cloud storage and returns
   * a file path that can be used as input for other Magic Hour API endpoints.
   * The file type is automatically detected from the file extension.
   *
   * @param file - The file to upload. Can be:
   *   - **string**: Path to a local file (e.g., "/path/to/image.jpg")
   *   - **Buffer**: File content as buffer (requires extension detection via other means)
   *   - **Readable**: Node.js readable stream (must have a 'path' property)
   *   - **File**: File object (browser environment)
   *
   * @returns The uploaded file's path in Magic Hour's storage system.
   *   This path can be used as input for other API endpoints.
   *
   * @throws {Error} If the specified local file doesn't exist.
   * @throws {Error} If the file type is not supported.
   * @throws {Error} If the upload request fails (network/server errors).
   *
   * @example
   * ```typescript
   * import { Client } from "magic-hour";
   *
   * const client = new Client({ token: process.env.MAGIC_HOUR_API_TOKEN });
   *
   * // Upload from file path
   * const filePath = await client.v1.files.uploadFile("/path/to/your/image.jpg");
   * console.log(`Uploaded file: ${filePath}`);
   *
   * // Use the uploaded file in other API calls
   * const result = await client.v1.aiImageUpscaler.create({
   *   assets: { imageFilePath: filePath },
   *   style: { upscaleFactor: 2 }
   * });
   * ```
   */
  async uploadFile(file: FileInput): Promise<string> {
    const { filePath, fileData, fileType, extension } = processFileInput(file);

    // Create upload URL
    const response = await this.uploadUrls.create({
      items: [
        {
          extension,
          type: fileType,
        },
      ],
    });

    if (!response.items || response.items.length === 0) {
      throw new Error("No upload URL was returned from the server");
    }

    const uploadInfo = response.items[0];
    if (!uploadInfo) {
      throw new Error("Upload info is missing from server response");
    }

    // Prepare file content
    let content: Buffer;
    if (filePath) {
      content = fs.readFileSync(filePath);
    } else if (fileData) {
      if (Buffer.isBuffer(fileData)) {
        content = fileData;
      } else if (fileData instanceof Readable) {
        // For streams, read all data into buffer
        const chunks: Buffer[] = [];
        for await (const chunk of fileData) {
          chunks.push(chunk);
        }
        content = Buffer.concat(chunks);
      } else if (typeof File !== "undefined" && fileData instanceof File) {
        // File object - convert to buffer
        const arrayBuffer = await fileData.arrayBuffer();
        content = Buffer.from(arrayBuffer);
      } else {
        throw new Error("Unsupported file data type");
      }
    } else {
      throw new Error("No file data available");
    }

    // Upload the file
    const fetcherFn =
      RUNTIME.type === "node" || typeof fetch !== "function"
        ? require("node-fetch").default
        : fetch;

    const uploadResponse = await fetcherFn(uploadInfo.uploadUrl, {
      method: "PUT",
      body: content,
    });

    if (!uploadResponse.ok) {
      throw new Error(
        `Upload failed with status ${uploadResponse.status}: ${uploadResponse.statusText}`,
      );
    }

    return uploadInfo.filePath;
  }
}
