import { AuthBearer, CoreClient } from "magic-hour/core";
import { Environment } from "magic-hour/environment";
import { V1Client } from "magic-hour/resources/v1";

export interface ClientOptions {
  baseUrl?: string;
  environment?: Environment;
  timeout?: number;
  token?: string;
}

export class Client {
  protected _client: CoreClient;
  v1: V1Client;

  constructor(opts?: ClientOptions) {
    const baseUrl =
      opts?.baseUrl ?? opts?.environment ?? Environment.Environment;
    this._client = new CoreClient({ baseUrl, timeout: opts?.timeout });
    this._client.registerAuth("bearerAuth", new AuthBearer(opts?.token));

    this.v1 = new V1Client(this._client);
  }
}
