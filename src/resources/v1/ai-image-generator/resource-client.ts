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
import * as requests from "magic-hour/resources/v1/ai-image-generator/request-types";
import { Schemas$V1AiImageGeneratorCreateBody } from "magic-hour/types/v1-ai-image-generator-create-body";
import { Schemas$V1AiImageGeneratorCreateResponse } from "magic-hour/types/v1-ai-image-generator-create-response";
import { FilesClient } from "magic-hour/resources/v1/files";
import { getLogger } from "magic-hour/logger";
import { ImageProjectsClient } from "magic-hour/resources/v1/image-projects";

type GenerateRequest = GenerateRequestType<requests.CreateRequest, {}>;

export class AiImageGeneratorClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * AI Images
   *
   * Create an AI image
   *
   * This method provides a convenient way to create a request and automatically wait for completion and download outputs.
   *
   * @example
   * ```typescript
   * import Client from "magic-hour";
   *
   * const client = new Client({ token: process.env["API_TOKEN"]!! });
   * const res = await client.v1.aiImageGenerator.generate(
   *   {
   *     imageCount: 1,
   *     name: "Ai Image image",
   *     orientation: "landscape",
   *     style: { prompt: "Cool image", tool: "ai-anime-generator" },
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

    const createResponse = await this.create(
      {
        ...request,
      },
      createOpts,
    );

    getLogger().info(
      `Created AiImageGeneratorClient project ${createResponse.id}`,
    );

    const projectsClient = new ImageProjectsClient(this._client, this._opts);

    getLogger().debug(
      `Checking result for AiImageGeneratorClient project ${createResponse.id}`,
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
   * AI Images
   *
   * Create an AI image. Each image costs 5 credits.
   *
   * POST /v1/ai-image-generator
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1AiImageGeneratorCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/ai-image-generator",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1AiImageGeneratorCreateBody.out.parse(request),
      responseSchema: Schemas$V1AiImageGeneratorCreateResponse.in,
      opts,
    });
  }
}
