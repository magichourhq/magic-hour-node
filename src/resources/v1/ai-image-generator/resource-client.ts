/**
 * Generated by Sideko (sideko.dev)
 **/

import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/ai-image-generator/request-types";

export class AiImageGeneratorClient extends CoreResourceClient {
  constructor(client: CoreClient) {
    super(client);
  }
  /**
   * Create an AI image. Each image costs 5 frames.
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.PostV1AiImageGeneratorResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/ai-image-generator",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: request.data,
      responseType: "json",
      opts,
    });
  }
}
