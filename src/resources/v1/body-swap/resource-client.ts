import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "make-api-request-js";

import * as requests from "magic-hour/resources/v1/body-swap/request-types";
import * as types from "magic-hour/types";
import { Schemas$V1BodySwapCreateBody } from "magic-hour/types/v1-body-swap-create-body";
import { Schemas$V1BodySwapCreateResponse } from "magic-hour/types/v1-body-swap-create-response";

export class BodySwapClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * Body Swap
   *
   * Swap a person into a scene image using Nano Banana 2. Credits depend on `resolution` (from 100 credits at 640px upward).
   *
   * POST /v1/body-swap
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1BodySwapCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/body-swap",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1BodySwapCreateBody.out.parse(request),
      responseSchema: Schemas$V1BodySwapCreateResponse.in,
      opts,
    });
  }
}
