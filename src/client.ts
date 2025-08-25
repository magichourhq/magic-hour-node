import { AuthBearer, CoreClient, ResourceClientOptions } from "magic-hour/core";
import { Environment } from "magic-hour/environment";
import { V1Client } from "magic-hour/resources/v1";
import { LogLevel, Logger, PossibleLogLevel } from "./logger";

export interface ClientOptions extends ResourceClientOptions {
  baseUrl?: string;
  environment?: Environment;
  timeout?: number;
  lazyLoad?: boolean;
  token?: string;
  logLevel?: PossibleLogLevel;
}

export class Client {
  private _v1Lazy?: V1Client; // lazy-loading cache

  protected _client: CoreClient;
  protected _opts: ResourceClientOptions;
  protected _logLevel: PossibleLogLevel;

  constructor(opts?: ClientOptions) {
    this._client = new CoreClient({
      baseUrl: opts?.baseUrl ?? opts?.environment ?? Environment.Environment,
      timeout: opts?.timeout,
      auths: { bearerAuth: new AuthBearer(opts?.token) },
    });
    this._opts = opts ?? {};

    if (this._opts.lazyLoad === false) {
      this.v1;
    }

    this._logLevel = opts?.logLevel ?? "info";

    this._client.logger.level = this._logLevel;
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
