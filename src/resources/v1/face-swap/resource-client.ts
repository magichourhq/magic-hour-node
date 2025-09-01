import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "magic-hour/core";
import {
  GenerateOptions,
  GenerateRequestType,
} from "magic-hour/helpers/generate-type";
import { getLogger } from "magic-hour/logger";
import * as requests from "magic-hour/resources/v1/face-swap/request-types";
import { FilesClient } from "magic-hour/resources/v1/files";
import { VideoProjectsClient } from "magic-hour/resources/v1/video-projects";
import { Schemas$V1FaceSwapCreateBody } from "magic-hour/types/v1-face-swap-create-body";
import { Schemas$V1FaceSwapCreateResponse } from "magic-hour/types/v1-face-swap-create-response";

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
     * The path of the input image with the face to be swapped. This value is either
     * - a direct URL to the image file
     * - a path to a local file
     *
     * Note: if the path begins with `api-assets`, it will be assumed to already be uploaded to Magic Hour's storage, and will not be uploaded again.
     */
    imageFilePath?: string | undefined;
    /**
     * Required if `video_source` is `file`. This value is either
     * - a direct URL to the image file
     * - a path to a local file
     *
     * Note: if the path begins with `api-assets`, it will be assumed to already be uploaded to Magic Hour's storage, and will not be uploaded again.
     */
    videoFilePath?: string | undefined;
  }
>;

export class FaceSwapClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * Face Swap video
   *
   * Create a Face Swap video
   *
   * This method provides a convenient way to create a request and automatically wait for completion and download outputs.
   *
   * @example
   * ```typescript
   * import Client from "magic-hour";
   *
   * const client = new Client({ token: process.env["API_TOKEN"]!! });
   * const res = await client.v1.faceSwap.generate(
   *   {
   *     assets: {
   *       faceMappings: [
   *         {
   *           newFace: "api-assets/id/1234.png",
   *           originalFace: "api-assets/id/0-0.png",
   *         },
   *       ],
   *       faceSwapMode: "all-faces",
   *       imageFilePath: "image/id/1234.png",
   *       videoFilePath: "/path/to/1234.mp4",
   *       videoSource: "file",
   *     },
   *     endSeconds: 15.0,
   *     name: "Face Swap video",
   *     startSeconds: 0.0,
   *     style: { version: "default" },
   *   },
   *   {
   *     waitForCompletion: true,
   *     downloadOutputs: true,
   *     downloadDirectory: "outputs",
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
    const { imageFilePath, videoFilePath, faceMappings, ...restAssets } =
      request.assets;

    // Upload main files
    if (imageFilePath) {
      getLogger().debug(
        `Uploading file ${imageFilePath} to Magic Hour's storage`,
      );
    }
    if (videoFilePath) {
      getLogger().debug(
        `Uploading file ${videoFilePath} to Magic Hour's storage`,
      );
    }

    const [uploadedImageFilePath, uploadedVideoFilePath] = await Promise.all([
      imageFilePath
        ? fileClient.uploadFile(imageFilePath)
        : Promise.resolve(imageFilePath),
      videoFilePath
        ? fileClient.uploadFile(videoFilePath)
        : Promise.resolve(videoFilePath),
    ]);

    if (imageFilePath) {
      getLogger().info(
        `Uploaded file ${imageFilePath} to Magic Hour's storage as ${uploadedImageFilePath}`,
      );
    }
    if (videoFilePath) {
      getLogger().info(
        `Uploaded file ${videoFilePath} to Magic Hour's storage as ${uploadedVideoFilePath}`,
      );
    }

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
          imageFilePath: imageFilePath ? uploadedImageFilePath : imageFilePath,
          videoFilePath: videoFilePath ? uploadedVideoFilePath : videoFilePath,
          ...(updatedFaceMappings && { faceMappings: updatedFaceMappings }),
        },
      },
      createOpts,
    );

    getLogger().info(`Created FaceSwapClient project ${createResponse.id}`);

    const projectsClient = new VideoProjectsClient(this._client, this._opts);

    getLogger().debug(
      `Checking result for FaceSwapClient project ${createResponse.id}`,
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
   * Face Swap video
   *
   * Create a Face Swap video. The estimated frame cost is calculated using 30 FPS. This amount is deducted from your account balance when a video is queued. Once the video is complete, the cost will be updated based on the actual number of frames rendered.
   *
   * Get more information about this mode at our [product page](https://magichour.ai/products/face-swap).
   *
   *
   * POST /v1/face-swap
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1FaceSwapCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/face-swap",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1FaceSwapCreateBody.out.parse(request),
      responseSchema: Schemas$V1FaceSwapCreateResponse.in,
      opts,
    });
  }
}
