import qs from "qs";
import formUrlEncoded from "form-urlencoded";
import { toBase64 } from "js-base64";
import * as jsonpointer from "jsonpointer";

import { RUNTIME } from "./runtime";
import type { RequestConfig } from "./core-client";
import { ApiError } from "./api-error";

export interface AuthProvider {
  applyAuth: (cfg: RequestConfig) => Promise<RequestConfig>;
  setValue: (val?: string | undefined) => void;
}

const AUTHORIZATION = "Authorization";
const COOKIE = "Cookie";

export class AuthBasic implements AuthProvider {
  username: string | null;
  password: string | null;

  constructor(username?: string, password?: string) {
    this.username = username ?? null;
    this.password = password ?? null;
  }

  async applyAuth(cfg: RequestConfig): Promise<RequestConfig> {
    const headers = cfg.headers ?? {};
    if (this.username !== null && this.password !== null) {
      const encoded = toBase64(`${this.username}:${this.password}`);
      cfg.headers = headers;
      headers[AUTHORIZATION] = `Basic ${encoded}`;
    }

    return cfg;
  }

  setValue(val?: string | undefined) {
    this.username = val ?? null;
  }
}

export class AuthBearer implements AuthProvider {
  token: string | null;

  constructor(token?: string) {
    this.token = token ?? null;
  }

  async applyAuth(cfg: RequestConfig): Promise<RequestConfig> {
    const headers = cfg.headers ?? {};
    if (this.token !== null) {
      cfg.headers = headers;
      headers[AUTHORIZATION] = `Bearer ${this.token}`;
    }

    return cfg;
  }

  setValue(val?: string | undefined) {
    this.token = val ?? null;
  }
}

export class AuthKey implements AuthProvider {
  name: string;
  location: "query" | "header" | "cookie";
  key: string | null;

  constructor(
    name: string,
    location: "query" | "header" | "cookie",
    key?: string,
  ) {
    this.name = name;
    this.location = location;
    this.key = key ?? null;
  }

  async applyAuth(cfg: RequestConfig): Promise<RequestConfig> {
    if (this.key === null) {
      return cfg;
    }

    if (this.location === "query") {
      const query = cfg.query ?? [];
      cfg.query = query;
      query.push(qs.stringify({ [this.name]: this.key }));
    } else if (this.location === "header") {
      const headers = cfg.headers ?? {};
      cfg.headers = headers;
      headers[this.name] = this.key;
    } else if (this.location === "cookie" && RUNTIME.type === "browser") {
      cfg.withCredentials = true;
    } else if (this.location === "cookie") {
      const headers = cfg.headers ?? {};
      const cookies: string = headers[COOKIE] ?? "";
      headers[COOKIE] = `${cookies.length > 0 ? ";" : ""}${this.name}=${
        this.key
      }`;
      cfg.headers = headers;
    }

    return cfg;
  }

  setValue(val?: string | undefined) {
    this.key = val ?? null;
  }
}

/**
 * OAuth2 authentication props for a password flow
 *
 * Details:
 *    https://datatracker.ietf.org/doc/html/rfc6749#section-4.3
 */
export type OAuth2Password = {
  username: string;
  password: string;
  clientId?: string | undefined;
  clientSecret?: string | undefined;
  grantType?: "password" | string | undefined;
  scope?: string[] | undefined;

  tokenUrl?: string | undefined;
};
function isOAuth2Password(val: any): val is OAuth2Password {
  return typeof val.username === "string" && typeof val.password === "string";
}

/**
 * OAuth2 authentication props for a client credentials flow
 *
 * Details:
 *    https://datatracker.ietf.org/doc/html/rfc6749#section-4.4
 */
export type OAuth2ClientCredentials = {
  clientId: string;
  clientSecret: string;
  grantType?: "client_credentials" | string | undefined;
  scope?: string[] | undefined;

  tokenUrl?: string | undefined;
};
function isOAuth2ClientCredentials(val: any): val is OAuth2ClientCredentials {
  return (
    typeof val.clientId === "string" && typeof val.clientSecret === "string"
  );
}

export type OAuth2ProviderProps = {
  // OAuth2 provider configuration
  baseUrl: string;
  defaultTokenUrl: string;
  accessTokenPointer: string;
  expiresInPointer: string;
  credentialsLocation: "request_body" | "basic_authorization_header";
  bodyContent: "form" | "json";
  requestMutator: AuthProvider;

  // OAuth2 access token request values
  form?: OAuth2Password | OAuth2ClientCredentials | undefined;
};
export class OAuth2 implements AuthProvider {
  // OAuth2 provider configuration
  props: OAuth2ProviderProps;

  // access token storage
  accessToken?: string | undefined;
  expiresAt?: Date;

  constructor(props: OAuth2ProviderProps) {
    this.props = props;
  }

  async refresh(
    form: OAuth2Password | OAuth2ClientCredentials,
  ): Promise<{ accessToken: string; expiresAt: Date }> {
    const {
      baseUrl,
      defaultTokenUrl,
      credentialsLocation,
      bodyContent,
      accessTokenPointer,
      expiresInPointer,
    } = this.props;

    // build token url
    let tokenUrl = form?.tokenUrl ?? defaultTokenUrl;
    if (tokenUrl.startsWith("/")) {
      // relative token url
      const base = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
      tokenUrl = `${base}${tokenUrl}`;
    }

    let defaultGrantType = isOAuth2Password(form)
      ? "password"
      : "client_credentials";

    const reqHeaders: Record<string, string> = {};
    const reqData: Record<string, string | undefined> = {
      grant_type: form.grantType ?? defaultGrantType,
    };

    // Add client credentials
    if (isOAuth2ClientCredentials(form)) {
      if (credentialsLocation === "basic_authorization_header") {
        const encoded = toBase64(`${form.clientId}:${form.clientSecret}`);
        reqHeaders[AUTHORIZATION] = `Basic ${encoded}`;
      } else {
        reqData["client_id"] = form.clientId;
        reqData["client_secret"] = form.clientSecret;
      }
    }

    if (isOAuth2Password(form)) {
      reqData["username"] = form.username;
      reqData["password"] = form.password;
    }
    if (typeof form.scope !== "undefined") {
      reqData["scope"] = form.scope.join(" ");
    }

    const reqInit: RequestInit = { method: "POST" };
    if (bodyContent === "form") {
      reqInit.body = formUrlEncoded(reqData);
      reqHeaders["content-type"] = "application/x-www-form-urlencoded";
    } else {
      reqInit.body = JSON.stringify(reqData);
      reqHeaders["content-type"] = "application/json";
    }

    reqInit.headers = reqHeaders;
    const fetcherFn =
      RUNTIME.type === "node" || typeof fetch !== "function"
        ? require("node-fetch").default
        : fetch;
    const tokenRes = await fetcherFn(tokenUrl, reqInit);
    if (!tokenRes.ok) {
      throw new ApiError(
        {
          method: "post",
          path: tokenUrl,
          headers: reqHeaders,
          body: reqData,
          contentType: reqHeaders["content-type"],
        },
        tokenRes,
      );
    }

    const tokenResJson = await tokenRes.json();
    const accessTokenRaw = jsonpointer.get(tokenResJson, accessTokenPointer);
    const accessToken =
      typeof accessTokenRaw === "string" ? accessTokenRaw : "";

    const expiresInRaw = jsonpointer.get(tokenResJson, expiresInPointer);
    const expiresInSecs = typeof expiresInRaw === "number" ? expiresInRaw : 600;
    const now = new Date();
    const expiresAt = new Date(now.getTime() + expiresInSecs * 1000);

    return { accessToken, expiresAt };
  }

  async applyAuth(cfg: RequestConfig): Promise<RequestConfig> {
    if (this.props.form && !this.accessToken) {
      const { accessToken, expiresAt } = await this.refresh(this.props.form);
      this.accessToken = accessToken;
      this.expiresAt = expiresAt;
    }

    this.props.requestMutator.setValue(this.accessToken);

    return await this.props.requestMutator.applyAuth(cfg);
  }

  setValue(val?: string | undefined) {
    throw "an OAuth2 auth provider can not a requestMutator";
  }
}
