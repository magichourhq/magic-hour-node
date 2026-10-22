import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "make-api-request-js";

import * as requests from "magic-hour/resources/v1/ai-music-generator/request-types";
import * as types from "magic-hour/types";
import { Schemas$V1AiMusicGeneratorCreateBody } from "magic-hour/types/v1-ai-music-generator-create-body";
import { Schemas$V1AiMusicGeneratorCreateResponse } from "magic-hour/types/v1-ai-music-generator-create-response";

export class AiMusicGeneratorClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * AI Music Generator
   *
   * Generate music from a description, with optional custom lyrics or instrumental-only output. Costs 1 credits per requested second. Returns a project ID; poll GET /v1/audio-projects/{id} for status and downloads.
   *
   * POST /v1/ai-music-generator
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1AiMusicGeneratorCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/ai-music-generator",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1AiMusicGeneratorCreateBody.out.parse(request),
      responseSchema: Schemas$V1AiMusicGeneratorCreateResponse.in,
      opts,
    });
  }
}
