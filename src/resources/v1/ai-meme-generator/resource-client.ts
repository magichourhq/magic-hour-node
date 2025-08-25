import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/ai-meme-generator/request-types";
import { Schemas$V1AiMemeGeneratorCreateBody } from "magic-hour/types/v1-ai-meme-generator-create-body";
import { Schemas$V1AiMemeGeneratorCreateResponse } from "magic-hour/types/v1-ai-meme-generator-create-response";
import { FilesClient } from "magic-hour/resources/v1/files";
import { ImageProjectsClient } from "magic-hour/resources/v1/image-projects";
import {
  GenerateOptions,
  GenerateRequestType,
} from "magic-hour/helpers/generate-type";

type GenerateRequest = GenerateRequestType<requests.CreateRequest, {}>;

export class AiMemeGeneratorClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * AI generate helper with automatic polling and downloading.
   * @example
   * ```ts
   * const result = await client.v1.aiMemeGenerator.generate({
   *   assets: {
   *
   *   },
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

    return result;
  }

  /**
   * AI Meme Generator
   *
   * Create an AI generated meme. Each meme costs 10 credits.
   *
   * POST /v1/ai-meme-generator
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1AiMemeGeneratorCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/ai-meme-generator",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1AiMemeGeneratorCreateBody.out.parse(request),
      responseSchema: Schemas$V1AiMemeGeneratorCreateResponse.in,
      opts,
    });
  }
}
