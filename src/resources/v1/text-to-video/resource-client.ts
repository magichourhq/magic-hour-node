import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/text-to-video/request-types";
import { Schemas$PostV1TextToVideoBody } from "magic-hour/types/post-v1-text-to-video-body";
import { Schemas$PostV1TextToVideoResponse } from "magic-hour/types/post-v1-text-to-video-response";

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
  ): ApiPromise<types.PostV1TextToVideoResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/text-to-video",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$PostV1TextToVideoBody.out.parse(request),
      responseType: "json",
      responseSchema: Schemas$PostV1TextToVideoResponse.in,
      opts,
    });
  }
}
