import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/text-to-video/request-types";
import { Schemas$V1TextToVideoCreateBody } from "magic-hour/types/v1-text-to-video-create-body";
import { Schemas$V1TextToVideoCreateResponse } from "magic-hour/types/v1-text-to-video-create-response";

export class TextToVideoClient extends CoreResourceClient {
  constructor(client: CoreClient) {
    super(client);
  }
  /**
   * Text-to-Video
   *
   * Create a Text To Video video. The estimated frame cost is calculated using 30 FPS. This amount is deducted from your account balance when a video is queued. Once the video is complete, the cost will be updated based on the actual number of frames rendered.
   *
   * Get more information about this mode at our [product page](/products/text-to-video).
   *
   *
   * POST /v1/text-to-video
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1TextToVideoCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/text-to-video",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1TextToVideoCreateBody.out.parse(request),
      responseSchema: Schemas$V1TextToVideoCreateResponse.in,
      opts,
    });
  }
}
