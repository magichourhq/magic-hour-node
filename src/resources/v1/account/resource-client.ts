import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "make-api-request-js";

import { CheckoutClient } from "magic-hour/resources/v1/account/checkout";
import * as types from "magic-hour/types";
import { Schemas$V1AccountListResponse } from "magic-hour/types/v1-account-list-response";

export class AccountClient extends CoreResourceClient {
  private _checkoutLazy?: CheckoutClient; // lazy-loading cache
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
    if (this._opts.lazyLoad === false) {
      this.checkout;
    }
  }

  /**
   * Get account details
   *
   * Get the current credit balance and subscription details of the account that owns the API key.
   *
   * GET /v1/account
   */
  list(opts?: RequestOptions): ApiPromise<types.V1AccountListResponse> {
    return this._client.makeRequest({
      method: "get",
      path: "/v1/account",
      auth: ["bearerAuth"],
      responseSchema: Schemas$V1AccountListResponse.in,
      opts,
    });
  }

  get checkout(): CheckoutClient {
    return (
      this._checkoutLazy ??
      (this._checkoutLazy = new (require("./checkout").CheckoutClient)(
        this._client,
        this._opts,
      ))
    );
  }
}
