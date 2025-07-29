import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/face-detection/request-types";
import { Schemas$V1FaceDetectionCreateBody } from "magic-hour/types/v1-face-detection-create-body";
import { Schemas$V1FaceDetectionCreateResponse } from "magic-hour/types/v1-face-detection-create-response";
import { Schemas$V1FaceDetectionGetResponse } from "magic-hour/types/v1-face-detection-get-response";

export class FaceDetectionClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }
  /**
   * Get face detection details
   *
   * Get the details of a face detection task.
   *
   * GET /v1/face-detection/{id}
   */
  get(
    request: requests.GetRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1FaceDetectionGetResponse> {
    return this._client.makeRequest({
      method: "get",
      path: `/v1/face-detection/${request.id}`,
      auth: ["bearerAuth"],
      responseSchema: Schemas$V1FaceDetectionGetResponse.in,
      opts,
    });
  }
  /**
   * Face Detection
   *
   * Detect faces in an image or video.
   *
   * Note: Face detection is free to use for the near future. Pricing may change in the future.
   *
   * POST /v1/face-detection
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1FaceDetectionCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/face-detection",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1FaceDetectionCreateBody.out.parse(request),
      responseSchema: Schemas$V1FaceDetectionCreateResponse.in,
      opts,
    });
  }
}
