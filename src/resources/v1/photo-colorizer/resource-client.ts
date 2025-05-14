import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/photo-colorizer/request-types";
import { Schemas$V1PhotoColorizerCreateBody } from "magic-hour/types/v1-photo-colorizer-create-body";
import { Schemas$V1PhotoColorizerCreateResponse } from "magic-hour/types/v1-photo-colorizer-create-response";

export class PhotoColorizerClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }
  /**
   * Photo Colorizer
   *
   * Colorize image. Each image costs 5 credits.
   *
   * POST /v1/photo-colorizer
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1PhotoColorizerCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/photo-colorizer",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1PhotoColorizerCreateBody.out.parse(request),
      responseSchema: Schemas$V1PhotoColorizerCreateResponse.in,
      opts,
    });
  }
}
