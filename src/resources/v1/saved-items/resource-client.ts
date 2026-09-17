import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
  encodeQueryParam,
} from "make-api-request-js";
import * as z from "zod";

import * as requests from "magic-hour/resources/v1/saved-items/request-types";
import * as types from "magic-hour/types";
import { Schemas$V1SavedItemsListResponse } from "magic-hour/types/v1-saved-items-list-response";

export class SavedItemsClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * List saved items
   *
   * Returns active saved items owned by the authenticated account, newest first. Each item includes every saved asset with a durable file_path for reuse in compatible generation APIs and a temporary signed URL for previewing or downloading. Filter by type to find characters, references, voices, moodboards, or brand kits. To fetch the next page, pass the response's next_cursor as cursor.
   *
   * GET /v1/saved-items
   */
  list(
    request: requests.ListRequest = {},
    opts?: RequestOptions,
  ): ApiPromise<types.V1SavedItemsListResponse> {
    return this._client.makeRequest({
      method: "get",
      path: "/v1/saved-items",
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
        encodeQueryParam({
          name: "type",
          value: z
            .enum(["brand_kit", "character", "moodboard", "reference", "voice"])
            .optional()
            .parse(request.type),
          style: "form",
          explode: true,
        }),
      ],
      responseSchema: Schemas$V1SavedItemsListResponse.in,
      opts,
    });
  }
}
