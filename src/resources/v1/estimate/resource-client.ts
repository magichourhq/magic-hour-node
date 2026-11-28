import {
  CoreClient,
  CoreResourceClient,
  ResourceClientOptions,
} from "make-api-request-js";

import { AudioClient } from "magic-hour/resources/v1/estimate/audio";
import { ImageClient } from "magic-hour/resources/v1/estimate/image";
import { VideoClient } from "magic-hour/resources/v1/estimate/video";

export class EstimateClient extends CoreResourceClient {
  private _videoLazy?: VideoClient; // lazy-loading cache
  private _audioLazy?: AudioClient; // lazy-loading cache
  private _imageLazy?: ImageClient; // lazy-loading cache

  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
    if (this._opts.lazyLoad === false) {
      this.audio;
      this.image;
      this.video;
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

  get audio(): AudioClient {
    return (
      this._audioLazy ??
      (this._audioLazy = new (require("./audio").AudioClient)(
        this._client,
        this._opts,
      ))
    );
  }

  get video(): VideoClient {
    return (
      this._videoLazy ??
      (this._videoLazy = new (require("./video").VideoClient)(
        this._client,
        this._opts,
      ))
    );
  }
}
