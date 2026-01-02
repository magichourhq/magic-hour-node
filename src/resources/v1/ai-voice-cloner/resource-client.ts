import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "make-api-request-js";

import * as requests from "magic-hour/resources/v1/ai-voice-cloner/request-types";
import * as types from "magic-hour/types";
import { Schemas$V1AiVoiceClonerCreateBody } from "magic-hour/types/v1-ai-voice-cloner-create-body";
import { Schemas$V1AiVoiceClonerCreateResponse } from "magic-hour/types/v1-ai-voice-cloner-create-response";

export class AiVoiceClonerClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * AI Voice Cloner
   *
   * Clone a voice from an audio sample and generate speech.
   * * Each character costs 0.05 credits.
   * * The cost is rounded up to the nearest whole number
   *
   * POST /v1/ai-voice-cloner
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1AiVoiceClonerCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/ai-voice-cloner",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1AiVoiceClonerCreateBody.out.parse(request),
      responseSchema: Schemas$V1AiVoiceClonerCreateResponse.in,
      opts,
    });
  }
}
