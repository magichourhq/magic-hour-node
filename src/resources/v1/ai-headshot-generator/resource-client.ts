import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/ai-headshot-generator/request-types";
import { Schemas$PostV1AiHeadshotGeneratorBody } from "magic-hour/types/post-v1-ai-headshot-generator-body";
import { Schemas$V1AiHeadshotGeneratorcreateResponse } from "magic-hour/types/v1-ai-headshot-generatorcreate-response";

export class AiHeadshotGeneratorClient extends CoreResourceClient {
  constructor(client: CoreClient) {
    super(client);
  }
  /**
   * AI Headshots
   *
   * Create an AI headshot. Each headshot costs 50 frames.
   *
   * POST /v1/ai-headshot-generator
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1AiHeadshotGeneratorcreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/ai-headshot-generator",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$PostV1AiHeadshotGeneratorBody.out.parse(request),
      responseSchema: Schemas$V1AiHeadshotGeneratorcreateResponse.in,
      opts,
    });
  }
}
