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
import * as requests from "magic-hour/resources/v1/ai-image-upscaler/request-types";
import { FilesClient } from "magic-hour/resources/v1/files";
import { Schemas$V1AiImageUpscalerCreateBody } from "magic-hour/types/v1-ai-image-upscaler-create-body";
import { Schemas$V1AiImageUpscalerCreateResponse } from "magic-hour/types/v1-ai-image-upscaler-create-response";
import { getLogger } from "magic-hour/logger";
import { ImageProjectsClient } from "magic-hour/resources/v1/image-projects";

type GenerateRequest = GenerateRequestType<
  requests.CreateRequest,
  {
    /**
     * The image to upscale. This value is either
     * - a direct URL to the image file
     * - a path to a local file
     *
     * Note: if the path begins with `api-assets`, it will be assumed to already be uploaded to Magic Hour's storage, and will not be uploaded again.
     */
    imageFilePath: string;
  }
>;

export class AiImageUpscalerClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * AI Image Upscaler
   *
   * Upscale your image using AI
   *
   * This method provides a convenient way to create a request and automatically wait for completion and download outputs.
   *
   * @example
   * ```typescript
   * import Client from "magic-hour";
   *
   * const client = new Client({ token: process.env["API_TOKEN"]!! });
   * const res = await client.v1.aiImageUpscaler.generate(
   *   {
   *     assets: { imageFilePath: "/path/to/1234.png" },
   *     name: "Image Upscaler image",
   *     scaleFactor: 2.0,
   *     style: { enhancement: "Balanced" },
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

    getLogger().info(
      `Created AiImageUpscalerClient project ${createResponse.id}`,
    );

    const projectsClient = new ImageProjectsClient(this._client, this._opts);

    getLogger().debug(
      `Checking result for AiImageUpscalerClient project ${createResponse.id}`,
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
   * AI Image Upscaler
   *
   * Upscale your image using AI. Each 2x upscale costs 50 credits, and 4x upscale costs 200 credits.
   *
   * POST /v1/ai-image-upscaler
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1AiImageUpscalerCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/ai-image-upscaler",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1AiImageUpscalerCreateBody.out.parse(request),
      responseSchema: Schemas$V1AiImageUpscalerCreateResponse.in,
      opts,
    });
  }
}
