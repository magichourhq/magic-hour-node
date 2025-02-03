import * as z from "zod";
import formUrlEncoded from "form-urlencoded";
import { Response as NodeResponse } from "node-fetch";

import { AuthProvider } from "./auth";
import { RUNTIME } from "./runtime";
import { ApiPromise } from "./api-promise";
import { ApiError } from "./api-error";
import { createForm } from "./form-data";
import {
  JSON_PATTERN,
  TEXT_PATTERN,
  MULTIPART_FORM,
  URL_FORM,
} from "./content-type";

export interface CoreClientProps {
  baseUrl: string;
  timeout?: number | undefined;
}

export type HttpMethod = "get" | "post" | "put" | "patch" | "delete";
export type ResponseType = "json" | "blob" | "unknown" | "event-stream";

export type RequestConfig = {
  method: HttpMethod;
  path: string;
  responseType: ResponseType;
  responseSchema?: z.Schema;
  auth?: string[];
  query?: string[];
  body?: any;
  contentType?: string;
  headers?: Record<string, string>;
  opts?: RequestOptions | undefined;
  withCredentials?: boolean;
};

export interface RequestOptions {
  timeout?: number;
  additionalHeaders?: Record<string, string>;
  additionalQuery?: Record<string, string>;
}

export class CoreClient {
  public baseUrl: string;
  private auths: Record<string, AuthProvider>;
  private timeout: number | undefined;
  // private agent: any // TODO

  constructor(props: CoreClientProps) {
    this.baseUrl = props.baseUrl;
    this.auths = {};
    this.timeout = props.timeout;
  }

  registerAuth(name: string, provider: AuthProvider) {
    this.auths[name] = provider;
  }

  private async applyAuths(cfg: RequestConfig): Promise<RequestConfig> {
    for (const name of cfg.auth ?? []) {
      const provider = this.auths[name];
      if (provider) {
        cfg = await provider.applyAuth(cfg);
      }
    }

    return cfg;
  }

  buildUrl(path: string): string {
    const base = this.baseUrl.endsWith("/")
      ? this.baseUrl.slice(0, -1)
      : this.baseUrl;
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    return `${base}/${cleanPath}`;
  }

  private buildUrlFromCfg(cfg: RequestConfig): string {
    const base = this.baseUrl.endsWith("/")
      ? this.baseUrl.slice(0, -1)
      : this.baseUrl;
    const path = cfg.path.startsWith("/") ? cfg.path.slice(1) : cfg.path;
    let url = `${base}/${path}`;

    const searchParams = new URLSearchParams((cfg.query ?? []).join("&"));
    for (const [key, val] of Object.entries(cfg.opts?.additionalQuery ?? {})) {
      searchParams.append(key, val);
    }

    if (searchParams.toString().length > 0) {
      url += `?${searchParams.toString()}`;
    }

    return url;
  }

  private applyHeaders(cfg: RequestConfig, reqInit: RequestInit): RequestInit {
    const finalHeaders = {
      "x-sideko-sdk-language": "Javascript",
      "x-sideko-runtime": RUNTIME.type,
      ...(reqInit.headers ?? {}),
      ...(cfg.headers ?? {}),
      ...(cfg.contentType ? { "content-type": cfg.contentType } : {}),
      ...cfg.opts?.additionalHeaders,
    };

    reqInit.headers = finalHeaders;

    return reqInit;
  }

  private encodeBodyByContentType(
    cfg: RequestConfig,
    reqInit: RequestInit,
  ): RequestInit {
    const contentTypeOverride =
      cfg.opts?.additionalHeaders?.["content-type"] ??
      cfg.opts?.additionalHeaders?.["Content-Type"];
    const contentType = contentTypeOverride ?? cfg.contentType ?? "";

    if (typeof cfg.body === "undefined") {
      return reqInit;
    } else if (contentType.match(JSON_PATTERN)) {
      reqInit.body = JSON.stringify(cfg.body);
    } else if (contentType.match(TEXT_PATTERN)) {
      reqInit.body = String(cfg.body);
    } else if (contentType === MULTIPART_FORM) {
      // encode form
      const form = createForm(cfg.body);
      const headers = (reqInit.headers as Record<string, string>) ?? {};

      if (RUNTIME.type === "node") {
        // explicitly set boundary
        headers[
          "content-type"
        ] = `${MULTIPART_FORM}; boundary=${form.getBoundary()}`;
      } else {
        // the browser should automatically set the content type
        delete headers["content-type"];
      }

      reqInit.headers = headers;
      reqInit.body = form as unknown as FormData;
    } else if (contentType === URL_FORM) {
      reqInit.body = formUrlEncoded(cfg.body);
    } else {
      // we expect body to already be encoded in the correct fashion
      reqInit.body = cfg.body;
    }
    return reqInit;
  }

  private buildRequestInit(cfg: RequestConfig): RequestInit {
    let reqInit: RequestInit = { method: cfg.method.toUpperCase() };
    reqInit = this.applyHeaders(cfg, reqInit);
    reqInit = this.encodeBodyByContentType(cfg, reqInit);

    if (cfg.withCredentials) {
      reqInit.credentials = "include";
    }

    return reqInit;
  }

  private async request(cfg: RequestConfig): Promise<Response | NodeResponse> {
    const fetcherFn =
      RUNTIME.type === "node" || typeof fetch !== "function"
        ? require("node-fetch").default
        : fetch;

    cfg = await this.applyAuths(cfg);
    const reqInit = this.buildRequestInit(cfg);
    const url = this.buildUrlFromCfg(cfg);

    const timeout = cfg.opts?.timeout ?? this.timeout;
    const controller = new AbortController();
    let timeoutId;
    if (typeof timeout !== "undefined") {
      timeoutId = setTimeout(() => controller.abort(), timeout);
    }
    reqInit.signal = controller.signal;

    const response = await fetcherFn(url, reqInit);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (!response.ok) {
      throw new ApiError(cfg, response);
    }

    return response;
  }

  makeRequest<R>(cfg: RequestConfig): ApiPromise<R> {
    return new ApiPromise({
      responsePromise: this.request(cfg),
      responseType: cfg.responseType,
      responseSchema: cfg.responseSchema,
    });
  }
}

export class CoreResourceClient {
  protected _client: CoreClient;

  constructor(client: CoreClient) {
    this._client = client;
  }
}
