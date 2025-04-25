import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/ai-talking-photo/request-types";
import { Schemas$V1AiTalkingPhotoCreateBody } from "magic-hour/types/v1-ai-talking-photo-create-body";
import { Schemas$V1AiTalkingPhotoCreateResponse } from "magic-hour/types/v1-ai-talking-photo-create-response";

export class AiTalkingPhotoClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }
  /**
   * AI Talking Photo
   *
   * Create a talking photo from an image and audio or text input.
   *
   * POST /v1/ai-talking-photo
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1AiTalkingPhotoCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/ai-talking-photo",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1AiTalkingPhotoCreateBody.out.parse(request),
      responseSchema: Schemas$V1AiTalkingPhotoCreateResponse.in,
      opts,
    });
  }
}
