import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
  encodeQueryParam,
} from "make-api-request-js";
import * as z from "zod";

import * as requests from "magic-hour/resources/v1/voices/request-types";
import * as types from "magic-hour/types";
import { Schemas$V1VoicesListResponse } from "magic-hour/types/v1-voices-list-response";

export class VoicesClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * List voices
   *
   * List the voices available for text-to-speech. Use a voice's `id` as `style.voice_name` in the AI Voice Generator API. To fetch the next page, pass the response's next_cursor as cursor.
   *
   * GET /v1/voices
   */
  list(
    request: requests.ListRequest = {},
    opts?: RequestOptions,
  ): ApiPromise<types.V1VoicesListResponse> {
    return this._client.makeRequest({
      method: "get",
      path: "/v1/voices",
      auth: ["bearerAuth"],
      query: [
        encodeQueryParam({
          name: "cursor",
          value: z.string().optional().parse(request.cursor),
          style: "form",
          explode: true,
        }),
        encodeQueryParam({
          name: "limit",
          value: z.number().int().optional().parse(request.limit),
          style: "form",
          explode: true,
        }),
      ],
      responseSchema: Schemas$V1VoicesListResponse.in,
      opts,
    });
  }
}
