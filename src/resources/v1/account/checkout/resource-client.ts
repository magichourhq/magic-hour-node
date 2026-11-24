import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "make-api-request-js";

import * as requests from "magic-hour/resources/v1/account/checkout/request-types";
import * as types from "magic-hour/types";
import { Schemas$V1AccountCheckoutCreateBody } from "magic-hour/types/v1-account-checkout-create-body";
import { Schemas$V1AccountCheckoutCreateResponse } from "magic-hour/types/v1-account-checkout-create-response";

export class CheckoutClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * Create checkout
   *
   * Create a Stripe Checkout link for the account that owns the API key. Nothing is charged until the checkout is completed in a browser.
   *
   * POST /v1/account/checkout
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1AccountCheckoutCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/account/checkout",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1AccountCheckoutCreateBody.out.parse(request),
      responseSchema: Schemas$V1AccountCheckoutCreateResponse.in,
      opts,
    });
  }
}
