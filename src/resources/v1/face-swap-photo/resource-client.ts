import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "make-api-request-js";

import { types } from "magic-hour";
import {
  GenerateOptions,
  GenerateRequestType,
} from "magic-hour/helpers/generate-type";
import { getLogger } from "magic-hour/logger";
import * as requests from "magic-hour/resources/v1/face-swap-photo/request-types";
import { FilesClient } from "magic-hour/resources/v1/files";
import { ImageProjectsClient } from "magic-hour/resources/v1/image-projects";
import { Schemas$V1FaceSwapPhotoCreateBody } from "magic-hour/types/v1-face-swap-photo-create-body";
import { Schemas$V1FaceSwapPhotoCreateResponse } from "magic-hour/types/v1-face-swap-photo-create-response";

type GenerateRequest = GenerateRequestType<
  requests.CreateRequest,
  {
    /**
     * Array of face mappings for individual face swaps. Each newFace will be uploaded if it's a local file path.
     */
    faceMappings?:
      | {
          /**
           * The face image that will be used to replace the face in the original_face. This value is either
           * - a direct URL to the image file
           * - a path to a local file
           *
           * Note: if the path begins with `api-assets`, it will be assumed to already be uploaded to Magic Hour's storage, and will not be uploaded again.
           */
          newFace: string;
          /**
           * The face detected from the target image. This should correspond to the response from the face detection API.
           */
          originalFace: string;
        }[]
      | undefined;
    /**
     * This is the image from which the face is extracted. This value is either
     * - a direct URL to the image file
     * - a path to a local file
     *
     * Note: if the path begins with `api-assets`, it will be assumed to already be uploaded to Magic Hour's storage, and will not be uploaded again.
     */
    sourceFilePath?: string | undefined;
    /**
     * This is the image where the face from the source image will be placed. This value is either
     * - a direct URL to the image file
     * - a path to a local file
     *
     * Note: if the path begins with `api-assets`, it will be assumed to already be uploaded to Magic Hour's storage, and will not be uploaded again.
     */
    targetFilePath: string;
  }
>;

export class FaceSwapPhotoClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * Face Swap Photo
   *
   * Create a face swap photo
   *
   * This method provides a convenient way to create a request and automatically wait for completion and download outputs.
   *
   * @example
   * ```typescript
   * import { Client } from "magic-hour";
   *
   * const client = new Client({ token: process.env["API_TOKEN"]!! });
   * const res = await client.v1.faceSwapPhoto.generate(
   *   {
   *     assets: {
   *       faceMappings: [
   *         {
   *           newFace: "api-assets/id/1234.png",
   *           originalFace: "api-assets/id/0-0.png",
   *         },
   *       ],
   *       faceSwapMode: "all-faces",
   *       sourceFilePath: "/path/to/1234.png",
   *       targetFilePath: "/path/to/1234.png",
   *     },
   *     name: "Face Swap image",
   *   },
   *   {
   *     waitForCompletion: true,
   *     downloadOutputs: true,
   *     downloadDirectory: ".",
   *   },
   * );
   * ```
   */
  async generate(request: GenerateRequest, opts: GenerateOptions = {}) {
    const {
      waitForCompletion = true,
      downloadOutputs = true,
      downloadDirectory = undefined,
      ...createOpts
    } = opts;

    const fileClient = new FilesClient(this._client, this._opts);
    const { sourceFilePath, targetFilePath, faceMappings, ...restAssets } =
      request.assets;

    // Upload main files
    if (sourceFilePath) {
      getLogger().debug(
        `Uploading file ${sourceFilePath} to Magic Hour's storage`,
      );
    }
    getLogger().debug(
      `Uploading file ${targetFilePath} to Magic Hour's storage`,
    );

    const [uploadedSourceFilePath, uploadedTargetFilePath] = await Promise.all([
      sourceFilePath
        ? fileClient.uploadFile(sourceFilePath)
        : Promise.resolve(sourceFilePath),
      fileClient.uploadFile(targetFilePath),
    ]);

    if (sourceFilePath) {
      getLogger().info(
        `Uploaded file ${sourceFilePath} to Magic Hour's storage as ${uploadedSourceFilePath}`,
      );
    }
    getLogger().info(
      `Uploaded file ${targetFilePath} to Magic Hour's storage as ${uploadedTargetFilePath}`,
    );

    // Upload faceMappings newFace files if they exist
    let updatedFaceMappings = faceMappings;
    if (faceMappings && faceMappings.length > 0) {
      getLogger().debug(
        `Uploading ${faceMappings.length} newFace files for face mappings`,
      );

      const uploadPromises = faceMappings.map(async (mapping, index) => {
        const { newFace, originalFace } = mapping;

        // Check if newFace needs to be uploaded (not already uploaded and not a URL)
        if (
          newFace &&
          !newFace.startsWith("api-assets/") &&
          !newFace.startsWith("http")
        ) {
          getLogger().debug(
            `Uploading newFace file ${newFace} for face mapping ${index}`,
          );
          const uploadedNewFace = await fileClient.uploadFile(newFace);
          getLogger().info(
            `Uploaded newFace file ${newFace} as ${uploadedNewFace} for face mapping ${index}`,
          );
          return {
            newFace: uploadedNewFace,
            originalFace,
          };
        } else {
          return {
            newFace,
            originalFace,
          };
        }
      });

      updatedFaceMappings = await Promise.all(uploadPromises);
    }

    const createResponse = await this.create(
      {
        ...request,
        assets: {
          ...restAssets,
          sourceFilePath: sourceFilePath
            ? uploadedSourceFilePath
            : sourceFilePath,
          targetFilePath: uploadedTargetFilePath,
          ...(updatedFaceMappings && { faceMappings: updatedFaceMappings }),
        },
      },
      createOpts,
    );

    getLogger().info(
      `Created FaceSwapPhotoClient project ${createResponse.id}`,
    );

    const projectsClient = new ImageProjectsClient(this._client, this._opts);

    getLogger().debug(
      `Checking result for FaceSwapPhotoClient project ${createResponse.id}`,
    );

    const result = await projectsClient.checkResult(
      { id: createResponse.id },
      {
        waitForCompletion,
        downloadOutputs,
        downloadDirectory,
        ...createOpts,
      },
    );

    return result;
  }

  /**
   * Face Swap Photo
   *
   * Create a face swap photo. Each photo costs 5 credits. The height/width of the output image depends on your subscription. Please refer to our [pricing](https://magichour.ai/pricing) page for more details
   *
   * POST /v1/face-swap-photo
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1FaceSwapPhotoCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/face-swap-photo",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1FaceSwapPhotoCreateBody.out.parse(request),
      responseSchema: Schemas$V1FaceSwapPhotoCreateResponse.in,
      opts,
    });
  }
}
