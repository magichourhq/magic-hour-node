import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/animation/request-types";
import { Schemas$V1AnimationCreateBody } from "magic-hour/types/v1-animation-create-body";
import { Schemas$V1AnimationCreateResponse } from "magic-hour/types/v1-animation-create-response";

export class AnimationClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
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
  ): ApiPromise<types.V1AnimationCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/animation",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1AnimationCreateBody.out.parse(request),
      responseSchema: Schemas$V1AnimationCreateResponse.in,
      opts,
    });
  }
}
