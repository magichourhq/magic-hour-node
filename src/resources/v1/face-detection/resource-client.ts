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
import { FilesClient } from "magic-hour/resources/v1/files";
import { ImageProjectsClient } from "magic-hour/resources/v1/image-projects";
import {
  GenerateOptions,
  GenerateRequestType,
} from "magic-hour/helpers/generate-type";

type GenerateRequest = GenerateRequestType<
  requests.CreateRequest,
  {
    /** This is the image or video where the face will be detected. */
    targetFilePath: string;
  }
>;

export class FaceDetectionClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * AI generate helper with automatic polling and downloading.
   * @example
   * ```ts
   * const result = await client.v1.faceDetection.generate({
   *   assets: {
   *
   *   },
   * });
   * ```
   */
  async generate(request: GenerateRequest, opts: GenerateOptions = {}) {
    const {
      waitForCompletion = true,
      downloadOutputs = true,
      downloadDirectory = undefined,
      ...createOpts
    } = opts;

    const fileClient = new FilesClient(this._client, this._opts);

    const { targetFilePath, ...restAssets } = request.assets;

    const [uploadedTargetFilePath] = await Promise.all([
      fileClient.uploadFile(targetFilePath),
    ]);

    // Create the initial request
    const createResponse = await this.create(
      {
        ...request,
        assets: {
          ...restAssets,
          targetFilePath: uploadedTargetFilePath,
        },
      },
      createOpts,
    );

    // Create image projects client to check result
    const imageProjectsClient = new ImageProjectsClient(
      this._client,
      this._opts,
    );

    const result = await imageProjectsClient.checkResult(
      { id: createResponse.id },
      {
        waitForCompletion,
        downloadOutputs,
        downloadDirectory,
        ...createOpts,
      },
    );

    return result;
  }

  /**
   * Get face detection details
   *
   * Get the details of a face detection task.
   *
   * Use this API to get the list of faces detected in the image or video to use in the [face swap photo](/api-reference/face-swap-photo/face-swap-photo) or [face swap video](/api-reference/face-swap/face-swap-video) API calls for multi-face swaps.
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
   * Use this API to get the list of faces detected in the image or video to use in the [face swap photo](/api-reference/face-swap-photo/face-swap-photo) or [face swap video](/api-reference/face-swap/face-swap-video) API calls for multi-face swaps.
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
