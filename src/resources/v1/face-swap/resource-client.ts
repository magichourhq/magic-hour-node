import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/face-swap/request-types";
import { Schemas$PostV1FaceSwapBody } from "magic-hour/types/post-v1-face-swap-body";
import { Schemas$PostV1FaceSwapResponse } from "magic-hour/types/post-v1-face-swap-response";

export class FaceSwapClient extends CoreResourceClient {
  constructor(client: CoreClient) {
    super(client);
  }
  /**
   * Face Swap video
   *
   * Create a Face Swap video. The estimated frame cost is calculated using 30 FPS. This amount is deducted from your account balance when a video is queued. Once the video is complete, the cost will be updated based on the actual number of frames rendered.
   *
   * Get more information about this mode at our [product page](/products/face-swap).
   *
   *
   * POST /v1/face-swap
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.PostV1FaceSwapResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/face-swap",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$PostV1FaceSwapBody.out.parse(request),
      responseType: "json",
      responseSchema: Schemas$PostV1FaceSwapResponse.in,
      opts,
    });
  }
}
