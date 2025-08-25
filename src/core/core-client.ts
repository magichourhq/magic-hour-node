import type * as z from "zod";
import type { Response as NodeResponse } from "node-fetch";

import type { AuthProvider } from "./auth";
import { RUNTIME } from "./runtime";
import { ApiPromise } from "./api-promise";
import { ApiError } from "./api-error";
import { createForm } from "./form-data";
import { encodeQueryParam, type QueryStyle } from "./query";
import {
  JSON_PATTERN,
  TEXT_PATTERN,
  MULTIPART_FORM,
  URL_FORM,
} from "./content-type";

export interface CoreClientProps {
  baseUrl: string | Record<string, string | undefined>;
  timeout?: number | undefined;
  auths?: Record<string, AuthProvider>;
}

export type ApiResponse = Response | NodeResponse;
export type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

export type RequestConfig = {
  method: HttpMethod;
  path: string;
  serviceName?: string | undefined;
  responseSchema?: z.Schema;
  responseStream?: boolean;
  responseRaw?: boolean;
  auth?: string[];
  query?: string[];
  body?: any;
  bodyEncoding?: {
    style?: Record<string, QueryStyle>;
    explode?: Record<string, boolean>;
  };
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

const _DEFAULT_SERVICE_NAME = "__default_service__";

export class CoreClient {
  private baseUrl: Record<string, string | undefined>;
  private auths: Record<string, AuthProvider>;
  private timeout: number | undefined;

  constructor(props: CoreClientProps) {
    this.baseUrl =
      typeof props.baseUrl === "string"
        ? { [_DEFAULT_SERVICE_NAME]: props.baseUrl }
        : props.baseUrl;
    this.auths = props.auths ?? {};
    this.timeout = props.timeout;
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

  buildUrl(path: string, serviceName: string = _DEFAULT_SERVICE_NAME): string {
    const baseUrl = this.baseUrl[serviceName ?? _DEFAULT_SERVICE_NAME] ?? "";
    const base = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    return `${base}/${cleanPath}`;
  }

  private buildUrlFromCfg(cfg: RequestConfig): string {
    let url = this.buildUrl(cfg.path, cfg.serviceName);

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
      if (typeof cfg.body !== "object") {
        throw new TypeError(
          "x-www-form-urlencoded data must be an object at the top level",
        );
      }

      // encode form data
      const styleMap = cfg.bodyEncoding?.style ?? {};
      const explodeMap = cfg.bodyEncoding?.explode ?? {};
      const formData = Object.entries(cfg.body).map(([name, value]) => {
        const style = styleMap[name] ?? "form";
        const explode = explodeMap[name] ?? style === "form";
        return encodeQueryParam({ name, value, style, explode });
      });

      reqInit.body = formData.join("&");
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

  private async request(cfg: RequestConfig): Promise<ApiResponse> {
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
      responseRaw: cfg.responseRaw ?? false,
      responseStream: cfg.responseStream ?? false,
      responseSchema: cfg.responseSchema,
    });
  }
}

export interface ResourceClientOptions {
  lazyLoad?: boolean | undefined;
}

export class CoreResourceClient {
  protected _client: CoreClient;
  protected _opts: ResourceClientOptions;

  constructor(client: CoreClient, opts: ResourceClientOptions) {
    this._client = client;
    this._opts = opts;
  }
}
