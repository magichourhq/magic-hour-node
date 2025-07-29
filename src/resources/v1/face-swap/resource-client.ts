import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/face-swap/request-types";
import { Schemas$V1FaceSwapCreateBody } from "magic-hour/types/v1-face-swap-create-body";
import { Schemas$V1FaceSwapCreateResponse } from "magic-hour/types/v1-face-swap-create-response";

export class FaceSwapClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }
  /**
   * Face Swap video
   *
   * Create a Face Swap video. The estimated frame cost is calculated using 30 FPS. This amount is deducted from your account balance when a video is queued. Once the video is complete, the cost will be updated based on the actual number of frames rendered.
   *
   * Get more information about this mode at our [product page](https://magichour.ai/products/face-swap).
   *
   *
   * POST /v1/face-swap
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1FaceSwapCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/face-swap",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1FaceSwapCreateBody.out.parse(request),
      responseSchema: Schemas$V1FaceSwapCreateResponse.in,
      opts,
    });
  }
}
