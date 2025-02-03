import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/image-to-video/request-types";
import { Schemas$PostV1ImageToVideoBody } from "magic-hour/types/post-v1-image-to-video-body";
import { Schemas$PostV1ImageToVideoResponse } from "magic-hour/types/post-v1-image-to-video-response";

export class ImageToVideoClient extends CoreResourceClient {
  constructor(client: CoreClient) {
    super(client);
  }
  /**
   * Image-to-Video
   *
   * Create a Image To Video video. The estimated frame cost is calculated using 30 FPS. This amount is deducted from your account balance when a video is queued. Once the video is complete, the cost will be updated based on the actual number of frames rendered.
   *
   * Get more information about this mode at our [product page](/products/image-to-video).
   *
   *
   * POST /v1/image-to-video
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.PostV1ImageToVideoResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/image-to-video",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$PostV1ImageToVideoBody.out.parse(request),
      responseType: "json",
      responseSchema: Schemas$PostV1ImageToVideoResponse.in,
      opts,
    });
  }
}
