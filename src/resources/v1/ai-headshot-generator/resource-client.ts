import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/ai-headshot-generator/request-types";
import { Schemas$PostV1AiHeadshotGeneratorBody } from "magic-hour/types/post-v1-ai-headshot-generator-body";
import { Schemas$PostV1AiHeadshotGeneratorResponse } from "magic-hour/types/post-v1-ai-headshot-generator-response";

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
  ): ApiPromise<types.PostV1AiHeadshotGeneratorResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/ai-headshot-generator",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$PostV1AiHeadshotGeneratorBody.out.parse(request),
      responseType: "json",
      responseSchema: Schemas$PostV1AiHeadshotGeneratorResponse.in,
      opts,
    });
  }
}
