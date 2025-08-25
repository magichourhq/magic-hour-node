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
import {
  GenerateOptions,
  GenerateRequestType,
} from "magic-hour/helpers/generate-type";
import { downloadFiles } from "magic-hour/helpers/download";
import { sleep } from "magic-hour/helpers/sleep";

type GenerateRequest = GenerateRequestType<
  requests.CreateRequest,
  {
    /** This is the image or video where the face will be detected. This value is either
     * - a direct URL to the image file
     * - a path to a local file
     *
     * Note: if the path begins with `api-assets`, it will be assumed to already be uploaded to Magic Hour's storage, and will not be uploaded again. */
    targetFilePath: string;
  }
>;

export class FaceDetectionClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * Face Detection
   *
   * Detect faces in an image or video
   *
   * This method provides a convenient way to create a request and automatically wait for completion and download outputs.
   *
   */
  async generate(request: GenerateRequest, opts: GenerateOptions = {}) {
    const {
      waitForCompletion = true,
      downloadOutputs = true,
      downloadDirectory = undefined,
      ...requestOpts
    } = opts;

    const fileClient = new FilesClient(this._client, this._opts);

    const { targetFilePath, ...restAssets } = request.assets;

    const [uploadedTargetFilePath] = await Promise.all([
      fileClient.uploadFile(targetFilePath),
    ]);

    const createResponse = await this.create(
      {
        ...request,
        assets: {
          ...restAssets,
          targetFilePath: uploadedTargetFilePath,
        },
      },
      requestOpts,
    );

    let apiResponse = await this.get({ id: createResponse.id }, requestOpts);

    if (!waitForCompletion) {
      return {
        ...apiResponse,
      };
    }

    const pollInterval = parseFloat(
      process.env["MAGIC_HOUR_POLL_INTERVAL"] || "0.5",
    );

    while (!["complete", "error", "canceled"].includes(apiResponse.status)) {
      await sleep(pollInterval * 1000); // Convert seconds to milliseconds
      apiResponse = await this.get({ id: createResponse.id }, requestOpts);
    }

    if (apiResponse.status !== "complete") {
      const log = apiResponse.status === "error" ? console.error : console.info;
      log(`Face detection ${apiResponse.id} has status ${apiResponse.status}`);
      return {
        ...apiResponse,
      };
    }

    if (!downloadOutputs) {
      return {
        ...apiResponse,
      };
    }

    const downloadedPaths = await downloadFiles(
      apiResponse.faces.map((f) => ({
        url: f.url,
        expiresAt: "ignore",
      })),
      downloadDirectory,
    );

    return {
      ...apiResponse,
      downloadedPaths,
    };
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
