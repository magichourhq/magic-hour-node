import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/ai-image-upscaler/request-types";
import { Schemas$PostV1AiImageUpscalerBody } from "magic-hour/types/post-v1-ai-image-upscaler-body";
import { Schemas$PostV1AiImageUpscalerResponse } from "magic-hour/types/post-v1-ai-image-upscaler-response";

export class AiImageUpscalerClient extends CoreResourceClient {
  constructor(client: CoreClient) {
    super(client);
  }
  /**
   * Create Upscaled Image
   *
   * Upscale your image using AI. Each 2x upscale costs 50 frames, and 4x upscale costs 200 frames.
   *
   * POST /v1/ai-image-upscaler
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.PostV1AiImageUpscalerResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/ai-image-upscaler",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$PostV1AiImageUpscalerBody.out.parse(request),
      responseType: "json",
      responseSchema: Schemas$PostV1AiImageUpscalerResponse.in,
      opts,
    });
  }
}
