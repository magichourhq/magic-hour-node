import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/files/upload-urls/request-types";
import { Schemas$V1FilesUploadUrlsCreateBody } from "magic-hour/types/v1-files-upload-urls-create-body";
import { Schemas$V1FilesUploadUrlsCreateResponse } from "magic-hour/types/v1-files-upload-urls-create-response";
import { FilesClient } from "magic-hour/resources/v1/files";
import { ImageProjectsClient } from "magic-hour/resources/v1/image-projects";
import {
  GenerateOptions,
  GenerateRequestType,
} from "magic-hour/helpers/generate-type";
import { downloadFiles } from "magic-hour/helpers/download";

type GenerateRequest = GenerateRequestType<requests.CreateRequest, {}>;

export class UploadUrlsClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * Generate asset upload urls
   *
   * Generates a list of pre-signed upload URLs for the assets required - Generate with automatic polling and downloading
   *
   * - This method provides a convenient way to create a request and automatically wait for completion and download outputs.
   *
   */
  async generate(request: GenerateRequest, opts: GenerateOptions = {}) {
    const {
      waitForCompletion = true,
      downloadOutputs = true,
      downloadDirectory = undefined,
      ...createOpts
    } = opts;

    // Create the initial request
    const createResponse = await this.create(
      {
        ...request,
      },
      createOpts,
    );

    // Create image projects client to check result
    const imageProjectsClient = new ImageProjectsClient(
      this._client,
      this._opts,
    );

    const result = await imageProjectsClient.checkResult(
      { id: createResponse.id },
      {
        waitForCompletion,
        downloadOutputs,
        downloadDirectory,
        ...createOpts,
      },
    );

    if (downloadOutputs) {
      result.downloadedPaths = await downloadFiles(
        result.downloads,
        downloadDirectory,
      );
    }

    return result;
  }

  /**
   * Generate asset upload urls
   *
   * Generates a list of pre-signed upload URLs for the assets required. This API is only necessary if you want to upload to Magic Hour's storage. Refer to the [Input Files Guide](/integration/input-files) for more details.
   *
   * The response array will match the order of items in the request body.
   *
   * **Valid file extensions per asset type**:
   * - video: mp4, m4v, mov, webm
   * - audio: mp3, mpeg, wav, aac, aiff, flac
   * - image: png, jpg, jpeg, webp, avif, jp2, tiff, bmp
   *
   * > Note: `gif` is only supported for face swap API `video_file_path` field.
   *
   * Once you receive an upload URL, send a `PUT` request to upload the file directly.
   *
   * Example:
   *
   * ```
   * curl -X PUT --data '@/path/to/file/video.mp4' \
   *   https://videos.magichour.ai/api-assets/id/video.mp4?<auth params from the API response>
   * ```
   *
   *
   * POST /v1/files/upload-urls
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1FilesUploadUrlsCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/files/upload-urls",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1FilesUploadUrlsCreateBody.out.parse(request),
      responseSchema: Schemas$V1FilesUploadUrlsCreateResponse.in,
      opts,
    });
  }
}
