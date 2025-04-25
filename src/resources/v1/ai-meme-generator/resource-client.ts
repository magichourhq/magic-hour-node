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

export class AiMemeGeneratorClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }
  /**
   * AI Meme Generator
   *
   * Create an AI generated meme. Each meme costs 10 frames.
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
