import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
  encodeQueryParam,
} from "make-api-request-js";
import * as z from "zod";

import * as requests from "magic-hour/resources/v1/estimate/audio/request-types";
import * as types from "magic-hour/types";
import { Schemas$V1EstimateAudioListResponse } from "magic-hour/types/v1-estimate-audio-list-response";

export class AudioClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * Estimate audio credits
   *
   * Get the credits an audio create request charges. Pass `tool`, then the field below that the tool's create request uses. Does not create a project or spend credits. It prices the fields passed here. It does not check your plan, your balance or the rest of the create request.
   *
   * GET /v1/estimate/audio
   */
  list(
    request: requests.ListRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1EstimateAudioListResponse> {
    return this._client.makeRequest({
      method: "get",
      path: "/v1/estimate/audio",
      auth: ["bearerAuth"],
      query: [
        encodeQueryParam({
          name: "tool",
          value: z
            .enum([
              "ai-music-generator",
              "ai-voice-cloner",
              "ai-voice-generator",
            ])
            .parse(request.tool),
          style: "form",
          explode: true,
        }),
        encodeQueryParam({
          name: "character_count",
          value: z.number().int().optional().parse(request.characterCount),
          style: "form",
          explode: true,
        }),
        encodeQueryParam({
          name: "duration",
          value: z.number().int().optional().parse(request.duration),
          style: "form",
          explode: true,
        }),
      ],
      responseSchema: Schemas$V1EstimateAudioListResponse.in,
      opts,
    });
  }
}
