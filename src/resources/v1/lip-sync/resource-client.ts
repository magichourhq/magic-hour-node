import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/lip-sync/request-types";
import { Schemas$V1LipSyncCreateBody } from "magic-hour/types/v1-lip-sync-create-body";
import { Schemas$V1LipSyncCreateResponse } from "magic-hour/types/v1-lip-sync-create-response";

export class LipSyncClient extends CoreResourceClient {
  constructor(client: CoreClient) {
    super(client);
  }
  /**
   * Lip Sync
   *
   * Create a Lip Sync video. The estimated frame cost is calculated using 30 FPS. This amount is deducted from your account balance when a video is queued. Once the video is complete, the cost will be updated based on the actual number of frames rendered.
   *
   * Get more information about this mode at our [product page](/products/lip-sync).
   *
   *
   * POST /v1/lip-sync
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1LipSyncCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/lip-sync",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1LipSyncCreateBody.out.parse(request),
      responseSchema: Schemas$V1LipSyncCreateResponse.in,
      opts,
    });
  }
}
