import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/lip-sync/request-types";
import { Schemas$PostV1LipSyncBody } from "magic-hour/types/post-v1-lip-sync-body";
import { Schemas$PostV1LipSyncResponse } from "magic-hour/types/post-v1-lip-sync-response";

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
  ): ApiPromise<types.PostV1LipSyncResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/lip-sync",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$PostV1LipSyncBody.out.parse(request),
      responseType: "json",
      responseSchema: Schemas$PostV1LipSyncResponse.in,
      opts,
    });
  }
}
