import {
  CoreClient,
  CoreResourceClient,
  ResourceClientOptions,
} from "make-api-request-js";

import { ImageClient } from "magic-hour/resources/v1/estimate/image";

export class EstimateClient extends CoreResourceClient {
  private _imageLazy?: ImageClient; // lazy-loading cache

  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
    if (this._opts.lazyLoad === false) {
      this.image;
    }
  }

  get image(): ImageClient {
    return (
      this._imageLazy ??
      (this._imageLazy = new (require("./image").ImageClient)(
        this._client,
        this._opts,
      ))
    );
  }
}
