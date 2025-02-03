import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/animation/request-types";
import { Schemas$PostV1AnimationBody } from "magic-hour/types/post-v1-animation-body";
import { Schemas$PostV1AnimationResponse } from "magic-hour/types/post-v1-animation-response";

export class AnimationClient extends CoreResourceClient {
  constructor(client: CoreClient) {
    super(client);
  }
  /**
   * Animation
   *
   * Create a Animation video. The estimated frame cost is calculated based on the `fps` and `end_seconds` input.
   *
   * POST /v1/animation
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.PostV1AnimationResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/animation",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$PostV1AnimationBody.out.parse(request),
      responseType: "json",
      responseSchema: Schemas$PostV1AnimationResponse.in,
      opts,
    });
  }
}
