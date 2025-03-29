import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/image-background-remover/request-types";
import { Schemas$V1ImageBackgroundRemoverCreateBody } from "magic-hour/types/v1-image-background-remover-create-body";
import { Schemas$V1ImageBackgroundRemoverCreateResponse } from "magic-hour/types/v1-image-background-remover-create-response";

export class ImageBackgroundRemoverClient extends CoreResourceClient {
  constructor(client: CoreClient) {
    super(client);
  }
  /**
   * Image Background Remover
   *
   * Remove background from image. Each image costs 5 frames.
   *
   * POST /v1/image-background-remover
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1ImageBackgroundRemoverCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/image-background-remover",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1ImageBackgroundRemoverCreateBody.out.parse(request),
      responseSchema: Schemas$V1ImageBackgroundRemoverCreateResponse.in,
      opts,
    });
  }
}
