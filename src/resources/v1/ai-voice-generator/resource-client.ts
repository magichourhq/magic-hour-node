import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "make-api-request-js";

import * as requests from "magic-hour/resources/v1/ai-voice-generator/request-types";
import * as types from "magic-hour/types";
import { Schemas$V1AiVoiceGeneratorCreateBody } from "magic-hour/types/v1-ai-voice-generator-create-body";
import { Schemas$V1AiVoiceGeneratorCreateResponse } from "magic-hour/types/v1-ai-voice-generator-create-response";

export class AiVoiceGeneratorClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * AI Voice Generator
   *
   * Generate speech from text. Each character costs 0.05 credits. The cost is rounded up to the nearest whole number.
   *
   * POST /v1/ai-voice-generator
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1AiVoiceGeneratorCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/ai-voice-generator",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1AiVoiceGeneratorCreateBody.out.parse(request),
      responseSchema: Schemas$V1AiVoiceGeneratorCreateResponse.in,
      opts,
    });
  }
}
