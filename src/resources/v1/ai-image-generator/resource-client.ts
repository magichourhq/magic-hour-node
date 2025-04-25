import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/ai-image-generator/request-types";
import { Schemas$V1AiImageGeneratorCreateBody } from "magic-hour/types/v1-ai-image-generator-create-body";
import { Schemas$V1AiImageGeneratorCreateResponse } from "magic-hour/types/v1-ai-image-generator-create-response";

export class AiImageGeneratorClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
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
