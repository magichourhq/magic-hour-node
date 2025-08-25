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
import * as requests from "magic-hour/resources/v1/face-swap/request-types";
import { FilesClient } from "magic-hour/resources/v1/files";
import { Schemas$V1FaceSwapCreateBody } from "magic-hour/types/v1-face-swap-create-body";
import { Schemas$V1FaceSwapCreateResponse } from "magic-hour/types/v1-face-swap-create-response";
import { getLogger } from "magic-hour/logger";
import { VideoProjectsClient } from "magic-hour/resources/v1/video-projects";

type GenerateRequest = GenerateRequestType<
  requests.CreateRequest,
  {
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

    const { imageFilePath, videoFilePath, ...restAssets } = request.assets;

    getLogger().debug(
      `Uploading file ${imageFilePath} to Magic Hour's storage`,
    );
    getLogger().debug(
      `Uploading file ${videoFilePath} to Magic Hour's storage`,
    );

    const [uploadedImageFilePath, uploadedVideoFilePath] = await Promise.all([
      fileClient.uploadFile(imageFilePath),
      fileClient.uploadFile(videoFilePath),
    ]);

    getLogger().info(
      `Uploaded file ${imageFilePath} to Magic Hour's storage as ${uploadedImageFilePath}`,
    );
    getLogger().info(
      `Uploaded file ${videoFilePath} to Magic Hour's storage as ${uploadedVideoFilePath}`,
    );

    const createResponse = await this.create(
      {
        ...request,
        assets: {
          ...restAssets,
          imageFilePath: uploadedImageFilePath,
          videoFilePath: uploadedVideoFilePath,
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
