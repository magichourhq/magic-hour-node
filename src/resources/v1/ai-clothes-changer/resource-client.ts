import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/ai-clothes-changer/request-types";
import { Schemas$V1AiClothesChangerCreateBody } from "magic-hour/types/v1-ai-clothes-changer-create-body";
import { Schemas$V1AiClothesChangerCreateResponse } from "magic-hour/types/v1-ai-clothes-changer-create-response";

export class AiClothesChangerClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }
  /**
   * AI Clothes Changer
   *
   * Change outfits in photos in seconds with just a photo reference. Each photo costs 25 frames.
   *
   * POST /v1/ai-clothes-changer
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1AiClothesChangerCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/ai-clothes-changer",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1AiClothesChangerCreateBody.out.parse(request),
      responseSchema: Schemas$V1AiClothesChangerCreateResponse.in,
      opts,
    });
  }
}
