import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/face-swap-photo/request-types";
import { Schemas$PostV1FaceSwapPhotoBody } from "magic-hour/types/post-v1-face-swap-photo-body";
import { Schemas$PostV1FaceSwapPhotoResponse } from "magic-hour/types/post-v1-face-swap-photo-response";

export class FaceSwapPhotoClient extends CoreResourceClient {
  constructor(client: CoreClient) {
    super(client);
  }
  /**
   * Face Swap Photo
   *
   * Create a face swap photo. Each photo costs 5 frames. The height/width of the output image depends on your subscription. Please refer to our [pricing](/pricing) page for more details
   *
   * POST /v1/face-swap-photo
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.PostV1FaceSwapPhotoResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/face-swap-photo",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$PostV1FaceSwapPhotoBody.out.parse(request),
      responseType: "json",
      responseSchema: Schemas$PostV1FaceSwapPhotoResponse.in,
      opts,
    });
  }
}
