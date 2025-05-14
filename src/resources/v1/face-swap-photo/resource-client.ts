import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/face-swap-photo/request-types";
import { Schemas$V1FaceSwapPhotoCreateBody } from "magic-hour/types/v1-face-swap-photo-create-body";
import { Schemas$V1FaceSwapPhotoCreateResponse } from "magic-hour/types/v1-face-swap-photo-create-response";

export class FaceSwapPhotoClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }
  /**
   * Face Swap Photo
   *
   * Create a face swap photo. Each photo costs 5 credits. The height/width of the output image depends on your subscription. Please refer to our [pricing](/pricing) page for more details
   *
   * POST /v1/face-swap-photo
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1FaceSwapPhotoCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/face-swap-photo",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1FaceSwapPhotoCreateBody.out.parse(request),
      responseSchema: Schemas$V1FaceSwapPhotoCreateResponse.in,
      opts,
    });
  }
}
