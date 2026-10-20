import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "make-api-request-js";

import { GenerateOptions } from "magic-hour/helpers/generate-type";
import { getLogger } from "magic-hour/logger";
import * as requests from "magic-hour/resources/v1/ai-ugc-ad/request-types";
import { FilesClient } from "magic-hour/resources/v1/files";
import { VideoProjectsClient } from "magic-hour/resources/v1/video-projects";
import * as types from "magic-hour/types";
import { Schemas$V1AiUgcAdCreateBody } from "magic-hour/types/v1-ai-ugc-ad-create-body";
import { Schemas$V1AiUgcAdCreateResponse } from "magic-hour/types/v1-ai-ugc-ad-create-response";

type GenerateRequest = requests.CreateRequest & {
  assets: {
    /**
     * Prepared image to animate. Accepts a local image path or a direct URL.
     * Paths beginning with `api-assets` are already uploaded and reused as is.
     */
    imageFilePath: string;
  };
};

export class AiUgcAdClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * Generate a UGC ad with automatic image upload, polling, and downloads.
   *
   * Accepts the same request fields as create(), including model and resolution.
   * The prepared image may be a local path, URL, or existing api-assets path.
   *
   * @example
   * ```typescript
   * const result = await client.v1.aiUgcAd.generate({
   *   assets: { imageFilePath: "path/to/image.jpg" },
   *   endSeconds: 4,
   *   script: "Meet your new everyday essential.",
   * });
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
    const uploadedImageFilePath = await fileClient.uploadFile(
      request.assets.imageFilePath,
    );
    const createResponse = await this.create(
      {
        ...request,
        assets: { ...request.assets, imageFilePath: uploadedImageFilePath },
      },
      createOpts,
    );
    getLogger().info(`Created AiUgcAdClient project ${createResponse.id}`);

    const projectsClient = new VideoProjectsClient(this._client, this._opts);
    return projectsClient.checkResult(
      { id: createResponse.id },
      {
        waitForCompletion,
        downloadOutputs,
        downloadDirectory,
        ...createOpts,
      },
    );
  }

  /**
   * AI UGC Ad Generator
   *
   * Create a spoken UGC video from a prepared image and script. Returns a project ID; poll GET /v1/video-projects/{id} for status and downloads. To compose an image, generate the image separately with the Image Editor API and supply its download URL.
   *
   * POST /v1/ai-ugc-ad
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1AiUgcAdCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/ai-ugc-ad",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1AiUgcAdCreateBody.out.parse(request),
      responseSchema: Schemas$V1AiUgcAdCreateResponse.in,
      opts,
    });
  }
}
