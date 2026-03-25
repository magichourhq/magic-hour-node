import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "make-api-request-js";

import * as requests from "magic-hour/resources/v1/head-swap/request-types";
import * as types from "magic-hour/types";
import { Schemas$V1HeadSwapCreateBody } from "magic-hour/types/v1-head-swap-create-body";
import { Schemas$V1HeadSwapCreateResponse } from "magic-hour/types/v1-head-swap-create-response";

export class HeadSwapClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * Head Swap
   *
   * Swap a head onto a body image. Each image costs 10 credits. Output resolution depends on your subscription; you may set `max_resolution` lower than your plan maximum if desired.
   *
   * POST /v1/head-swap
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1HeadSwapCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/head-swap",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1HeadSwapCreateBody.out.parse(request),
      responseSchema: Schemas$V1HeadSwapCreateResponse.in,
      opts,
    });
  }
}
