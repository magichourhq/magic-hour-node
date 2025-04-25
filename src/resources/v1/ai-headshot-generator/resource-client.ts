import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/ai-headshot-generator/request-types";
import { Schemas$V1AiHeadshotGeneratorCreateBody } from "magic-hour/types/v1-ai-headshot-generator-create-body";
import { Schemas$V1AiHeadshotGeneratorCreateResponse } from "magic-hour/types/v1-ai-headshot-generator-create-response";

export class AiHeadshotGeneratorClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
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
  ): ApiPromise<types.V1AiHeadshotGeneratorCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/ai-headshot-generator",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1AiHeadshotGeneratorCreateBody.out.parse(request),
      responseSchema: Schemas$V1AiHeadshotGeneratorCreateResponse.in,
      opts,
    });
  }
}
