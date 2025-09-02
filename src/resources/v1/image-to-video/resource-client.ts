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
import { FilesClient } from "magic-hour/resources/v1/files";
import * as requests from "magic-hour/resources/v1/image-to-video/request-types";
import { VideoProjectsClient } from "magic-hour/resources/v1/video-projects";
import { Schemas$V1ImageToVideoCreateBody } from "magic-hour/types/v1-image-to-video-create-body";
import { Schemas$V1ImageToVideoCreateResponse } from "magic-hour/types/v1-image-to-video-create-response";

type GenerateRequest = GenerateRequestType<
  requests.CreateRequest,
  {
    /**
     * The path of the image file. This value is either
     * - a direct URL to the image file
     * - a path to a local file
     *
     * Note: if the path begins with `api-assets`, it will be assumed to already be uploaded to Magic Hour's storage, and will not be uploaded again.
     */
    imageFilePath: string;
  }
>;

export class ImageToVideoClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * Image-to-Video
   *
   * Create a Image To Video video
   *
   * This method provides a convenient way to create a request and automatically wait for completion and download outputs.
   *
   * @example
   * ```typescript
   * import Client from "magic-hour";
   *
   * const client = new Client({ token: process.env["API_TOKEN"]!! });
   * const res = await client.v1.imageToVideo.generate(
   *   {
   *     assets: { imageFilePath: "/path/to/1234.png" },
   *     endSeconds: 5.0,
   *     name: "Image To Video video",
   *     resolution: "720p",
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
    const { imageFilePath, ...restAssets } = request.assets;

    getLogger().debug(
      `Uploading file ${imageFilePath} to Magic Hour's storage`,
    );

    const [uploadedImageFilePath] = await Promise.all([
      fileClient.uploadFile(imageFilePath),
    ]);

    getLogger().info(
      `Uploaded file ${imageFilePath} to Magic Hour's storage as ${uploadedImageFilePath}`,
    );

    const createResponse = await this.create(
      {
        ...request,
        assets: {
          ...restAssets,
          imageFilePath: uploadedImageFilePath,
        },
      },
      createOpts,
    );

    getLogger().info(`Created ImageToVideoClient project ${createResponse.id}`);

    const projectsClient = new VideoProjectsClient(this._client, this._opts);

    getLogger().debug(
      `Checking result for ImageToVideoClient project ${createResponse.id}`,
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
   * Image-to-Video
   *
   * Create a Image To Video video. The estimated frame cost is calculated using 30 FPS. This amount is deducted from your account balance when a video is queued. Once the video is complete, the cost will be updated based on the actual number of frames rendered.
   *
   * Get more information about this mode at our [product page](https://magichour.ai/products/image-to-video).
   *
   *
   * POST /v1/image-to-video
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1ImageToVideoCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/image-to-video",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1ImageToVideoCreateBody.out.parse(request),
      responseSchema: Schemas$V1ImageToVideoCreateResponse.in,
      opts,
    });
  }
}
