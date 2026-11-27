import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
  encodeQueryParam,
} from "make-api-request-js";
import * as z from "zod";

import * as requests from "magic-hour/resources/v1/estimate/image/request-types";
import * as types from "magic-hour/types";
import { Schemas$V1EstimateImageListResponse } from "magic-hour/types/v1-estimate-image-list-response";

export class ImageClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * Estimate image credits
   *
   * Get the credits an image create request charges. Pass `tool`, then the fields below that the tool's create request uses, with the same values. Does not create a project or spend credits. It prices the fields passed here. It does not check your plan, your balance or the rest of the create request.
   *
   * GET /v1/estimate/image
   */
  list(
    request: requests.ListRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1EstimateImageListResponse> {
    return this._client.makeRequest({
      method: "get",
      path: "/v1/estimate/image",
      auth: ["bearerAuth"],
      query: [
        encodeQueryParam({
          name: "tool",
          value: z
            .enum([
              "ai-clothes-changer",
              "ai-face-editor",
              "ai-gif-generator",
              "ai-headshot-generator",
              "ai-image-editor",
              "ai-image-generator",
              "ai-image-upscaler",
              "ai-meme-generator",
              "ai-qr-code-generator",
              "body-swap",
              "face-swap-photo",
              "head-swap",
              "image-background-remover",
              "photo-colorizer",
            ])
            .parse(request.tool),
          style: "form",
          explode: true,
        }),
        encodeQueryParam({
          name: "image_count",
          value: z.number().int().optional().parse(request.imageCount),
          style: "form",
          explode: true,
        }),
        encodeQueryParam({
          name: "mode",
          value: z.string().optional().parse(request.mode),
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
          name: "scale_factor",
          value: z.number().optional().parse(request.scaleFactor),
          style: "form",
          explode: true,
        }),
      ],
      responseSchema: Schemas$V1EstimateImageListResponse.in,
      opts,
    });
  }
}
