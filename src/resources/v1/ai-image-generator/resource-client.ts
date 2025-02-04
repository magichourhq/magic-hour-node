import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/ai-image-generator/request-types";
import { Schemas$PostV1AiImageGeneratorBody } from "magic-hour/types/post-v1-ai-image-generator-body";
import { Schemas$V1AiImageGeneratorcreateResponse } from "magic-hour/types/v1-ai-image-generatorcreate-response";

export class AiImageGeneratorClient extends CoreResourceClient {
  constructor(client: CoreClient) {
    super(client);
  }
  /**
   * AI Images
   *
   * Create an AI image. Each image costs 5 frames.
   *
   * POST /v1/ai-image-generator
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1AiImageGeneratorcreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/ai-image-generator",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$PostV1AiImageGeneratorBody.out.parse(request),
      responseSchema: Schemas$V1AiImageGeneratorcreateResponse.in,
      opts,
    });
  }
}
