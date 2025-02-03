import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/ai-clothes-changer/request-types";
import { Schemas$PostV1AiClothesChangerBody } from "magic-hour/types/post-v1-ai-clothes-changer-body";
import { Schemas$PostV1AiClothesChangerResponse } from "magic-hour/types/post-v1-ai-clothes-changer-response";

export class AiClothesChangerClient extends CoreResourceClient {
  constructor(client: CoreClient) {
    super(client);
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
  ): ApiPromise<types.PostV1AiClothesChangerResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/ai-clothes-changer",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$PostV1AiClothesChangerBody.out.parse(request),
      responseType: "json",
      responseSchema: Schemas$PostV1AiClothesChangerResponse.in,
      opts,
    });
  }
}
