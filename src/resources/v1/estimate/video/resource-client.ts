import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
  encodeQueryParam,
} from "make-api-request-js";
import * as z from "zod";

import * as requests from "magic-hour/resources/v1/estimate/video/request-types";
import * as types from "magic-hour/types";
import { Schemas$V1EstimateVideoListResponse } from "magic-hour/types/v1-estimate-video-list-response";

export class VideoClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * Estimate video credits
   *
   * Get the credits a video create request charges when it is submitted. Pass `tool`, then the fields below that the tool's create request uses, with the same values. Tools billed per frame charge an estimate at submission, assuming 30 fps for an uploaded video, and settle to the frames that render. Does not create a project or spend credits. It prices the fields passed here. It does not check your plan, your balance or the rest of the create request.
   *
   * GET /v1/estimate/video
   */
  list(
    request: requests.ListRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1EstimateVideoListResponse> {
    return this._client.makeRequest({
      method: "get",
      path: "/v1/estimate/video",
      auth: ["bearerAuth"],
      query: [
        encodeQueryParam({
          name: "end_seconds",
          value: z.number().parse(request.endSeconds),
          style: "form",
          explode: true,
        }),
        encodeQueryParam({
          name: "tool",
          value: z
            .enum([
              "ai-ugc-ad",
              "ai-video-editor",
              "ai-video-translator",
              "ai-video-upscaler",
              "audio-to-video",
              "auto-subtitle-generator",
              "character-replace",
              "face-swap",
              "image-to-video",
              "text-to-video",
            ])
            .parse(request.tool),
          style: "form",
          explode: true,
        }),
        encodeQueryParam({
          name: "audio",
          value: z.boolean().optional().parse(request.audio),
          style: "form",
          explode: true,
        }),
        encodeQueryParam({
          name: "has_video_reference",
          value: z.boolean().optional().parse(request.hasVideoReference),
          style: "form",
          explode: true,
        }),
        encodeQueryParam({
          name: "model",
          value: z.string().optional().parse(request.model),
          style: "form",
          explode: true,
        }),
        encodeQueryParam({
          name: "resolution",
          value: z.string().optional().parse(request.resolution),
          style: "form",
          explode: true,
        }),
        encodeQueryParam({
          name: "start_seconds",
          value: z.number().optional().parse(request.startSeconds),
          style: "form",
          explode: true,
        }),
      ],
      responseSchema: Schemas$V1EstimateVideoListResponse.in,
      opts,
    });
  }
}
