import { AuthBearer, CoreClient, ResourceClientOptions } from "magic-hour/core";
import { Environment } from "magic-hour/environment";
import { V1Client } from "magic-hour/resources/v1";

export interface ClientOptions extends ResourceClientOptions {
  baseUrl?: string;
  environment?: Environment;
  timeout?: number;
  lazyLoad?: boolean;
  token?: string;
}

export class Client {
  private _v1Lazy?: V1Client; // lazy-loading cache

  protected _client: CoreClient;
  protected _opts: ResourceClientOptions;

  constructor(opts?: ClientOptions) {
    this._client = new CoreClient({
      baseUrl: opts?.baseUrl ?? opts?.environment ?? Environment.Environment,
      timeout: opts?.timeout,
    });
    this._opts = { lazyLoad: opts?.lazyLoad };
    this._client.registerAuth("bearerAuth", new AuthBearer(opts?.token));
    if (this._opts.lazyLoad === false) {
      this.v1;
    }
  }
  get v1(): V1Client {
    return (
      this._v1Lazy ??
      (this._v1Lazy = new (require("./resources/v1").V1Client)(
        this._client,
        this._opts,
      ))
    );
  }
}
