import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/ai-image-generator/request-types";
import { Schemas$PostV1AiImageGeneratorBody } from "magic-hour/types/post-v1-ai-image-generator-body";
import { Schemas$PostV1AiImageGeneratorResponse } from "magic-hour/types/post-v1-ai-image-generator-response";

export class AiImageGeneratorClient extends CoreResourceClient {
  constructor(client: CoreClient) {
    super(client);
  }
  /**
   * Create AI Images
   *
   * Create an AI image. Each image costs 5 frames.
   *
   * POST /v1/ai-image-generator
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.PostV1AiImageGeneratorResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/ai-image-generator",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$PostV1AiImageGeneratorBody.out.parse(request),
      responseType: "json",
      responseSchema: Schemas$PostV1AiImageGeneratorResponse.in,
      opts,
    });
  }
}
