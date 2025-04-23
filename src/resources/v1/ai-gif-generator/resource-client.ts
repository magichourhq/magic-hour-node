import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/ai-gif-generator/request-types";
import { Schemas$V1AiGifGeneratorCreateBody } from "magic-hour/types/v1-ai-gif-generator-create-body";
import { Schemas$V1AiGifGeneratorCreateResponse } from "magic-hour/types/v1-ai-gif-generator-create-response";

export class AiGifGeneratorClient extends CoreResourceClient {
  constructor(client: CoreClient) {
    super(client);
  }
  /**
   * AI GIFs
   *
   * Create an AI GIF. Each GIF costs 5 frames.
   *
   * POST /v1/ai-gif-generator
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1AiGifGeneratorCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/ai-gif-generator",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1AiGifGeneratorCreateBody.out.parse(request),
      responseSchema: Schemas$V1AiGifGeneratorCreateResponse.in,
      opts,
    });
  }
}
