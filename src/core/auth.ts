import qs from "qs";
import formUrlEncoded from "form-urlencoded";
import { toBase64 } from "js-base64";
import * as jsonpointer from "jsonpointer";

import { RUNTIME } from "./runtime";
import { RequestConfig } from "./core-client";
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

export class AuthKeyQuery implements AuthProvider {
  name: string;
  key: string | null;

  constructor(name: string, key?: string) {
    this.name = name;
    this.key = key ?? null;
  }

  async applyAuth(cfg: RequestConfig): Promise<RequestConfig> {
    const query = cfg.query ?? [];
    if (this.key !== null) {
      cfg.query = query;
      query.push(qs.stringify({ [this.name]: this.key }));
    }

    return cfg;
  }

  setValue(val?: string | undefined) {
    this.key = val ?? null;
  }
}

export class AuthKeyHeader implements AuthProvider {
  name: string;
  key: string | null;

  constructor(name: string, key?: string) {
    this.name = name;
    this.key = key ?? null;
  }

  async applyAuth(cfg: RequestConfig): Promise<RequestConfig> {
    const headers = cfg.headers ?? {};
    if (this.key !== null) {
      cfg.headers = headers;
      headers[this.name] = this.key;
    }

    return cfg;
  }

  setValue(val?: string | undefined) {
    this.key = val ?? null;
  }
}

export class AuthCookieHeader implements AuthProvider {
  name: string;
  key: string | null;

  constructor(name: string, key?: string) {
    this.name = name;
    this.key = key ?? null;
  }

  async applyAuth(cfg: RequestConfig): Promise<RequestConfig> {
    if (RUNTIME.type === "browser") {
      cfg.withCredentials = true;
    } else if (this.key !== null) {
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
export type OAuth2PasswordProps = {
  username: string;
  password: string;
  clientId?: string | undefined;
  clientSecret?: string | undefined;
  grantType?: "password" | string | undefined;
  scope?: string[] | undefined;
};

/**
 * OAuth2 authentication props for a client credentials flow
 *
 * Details:
 *    https://datatracker.ietf.org/doc/html/rfc6749#section-4.4
 */
export type OAuth2ClientCredentialsProps = {
  clientId: string;
  clientSecret: string;
  grantType?: "client_credentials" | string | undefined;
  scope?: string[] | undefined;
};

export type OAuth2ProviderProps = {
  // OAuth2 provider configuration
  tokenUrl: string;
  accessTokenPointer: string;
  expiresInPointer: string;
  credentialsLocation: "request_body" | "basic_authorization_header";
  bodyContent: "form" | "json";
  requestMutator: AuthProvider;

  // OAuth2 access token request values
  username?: string | undefined;
  password?: string | undefined;
  clientId?: string | undefined;
  clientSecret?: string | undefined;
  grantType: "password" | "client_credentials" | string;
  scope?: string[] | undefined;
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

  async refresh(): Promise<{ accessToken: string; expiresAt: Date }> {
    const {
      tokenUrl,
      username,
      password,
      clientId,
      clientSecret,
      scope,
      grantType,
      credentialsLocation,
      bodyContent,
      accessTokenPointer,
      expiresInPointer,
    } = this.props;

    const reqHeaders: Record<string, string> = {};
    const reqData: Record<string, string | undefined> = {
      grant_type: grantType,
    };

    // Add client credentials
    if (
      typeof clientId !== "undefined" &&
      typeof clientSecret !== "undefined"
    ) {
      if (credentialsLocation === "basic_authorization_header") {
        const encoded = toBase64(`${clientId}:${clientSecret}`);
        reqHeaders[AUTHORIZATION] = `Basic ${encoded}`;
      } else {
        reqData["client_id"] = clientId;
        reqData["client_secret"] = clientSecret;
      }
    }

    if (typeof username !== "undefined") {
      reqData["username"] = username;
    }
    if (typeof password !== "undefined") {
      reqData["password"] = password;
    }
    if (typeof scope !== "undefined") {
      reqData["scope"] = scope.join(" ");
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
          responseType: "json",
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
    const expiresInSecs = typeof expiresInRaw == "number" ? expiresInRaw : 600;
    const now = new Date();
    const expiresAt = new Date(now.getTime() + expiresInSecs * 1000);

    return { accessToken, expiresAt };
  }

  async applyAuth(cfg: RequestConfig): Promise<RequestConfig> {
    if (!this.accessToken) {
      const { accessToken, expiresAt } = await this.refresh();
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
