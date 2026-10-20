import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "make-api-request-js";

import * as requests from "magic-hour/resources/v1/ai-ugc-ad/request-types";
import * as types from "magic-hour/types";
import { Schemas$V1AiUgcAdCreateBody } from "magic-hour/types/v1-ai-ugc-ad-create-body";
import { Schemas$V1AiUgcAdCreateResponse } from "magic-hour/types/v1-ai-ugc-ad-create-response";

export class AiUgcAdClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * AI UGC Ad Generator
   *
   * Create a spoken UGC video from a prepared image and script. Returns a project ID; poll GET /v1/video-projects/{id} for status and downloads. To compose an image, generate the image separately with the Image Editor API and supply its download URL.
   *
   * POST /v1/ai-ugc-ad
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1AiUgcAdCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/ai-ugc-ad",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1AiUgcAdCreateBody.out.parse(request),
      responseSchema: Schemas$V1AiUgcAdCreateResponse.in,
      opts,
    });
  }
}
