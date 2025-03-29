import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/video-to-video/request-types";
import { Schemas$V1VideoToVideoCreateBody } from "magic-hour/types/v1-video-to-video-create-body";
import { Schemas$V1VideoToVideoCreateResponse } from "magic-hour/types/v1-video-to-video-create-response";

export class VideoToVideoClient extends CoreResourceClient {
  constructor(client: CoreClient) {
    super(client);
  }
  /**
   * Video-to-Video
   *
   * Create a Video To Video video. The estimated frame cost is calculated using 30 FPS. This amount is deducted from your account balance when a video is queued. Once the video is complete, the cost will be updated based on the actual number of frames rendered.
   *
   * Get more information about this mode at our [product page](/products/video-to-video).
   *
   *
   * POST /v1/video-to-video
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1VideoToVideoCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/video-to-video",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1VideoToVideoCreateBody.out.parse(request),
      responseSchema: Schemas$V1VideoToVideoCreateResponse.in,
      opts,
    });
  }
}
