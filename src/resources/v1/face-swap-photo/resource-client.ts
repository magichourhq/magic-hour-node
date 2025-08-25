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
import { FilesClient } from "magic-hour/resources/v1/files";
import { ImageProjectsClient } from "magic-hour/resources/v1/image-projects";
import {
  GenerateOptions,
  GenerateRequestType,
} from "magic-hour/helpers/generate-type";

type GenerateRequest = GenerateRequestType<
  requests.CreateRequest,
  {
    /** This is the image from which the face is extracted. */
    sourceFilePath: string;
    /** This is the image where the face from the source image will be placed. */
    targetFilePath: string;
  }
>;

export class FaceSwapPhotoClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * AI generate helper with automatic polling and downloading.
   * @example
   * ```ts
   * const result = await client.v1.faceSwapPhoto.generate({
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

    const { sourceFilePath, targetFilePath, ...restAssets } = request.assets;

    const [uploadedSourceFilePath, uploadedTargetFilePath] = await Promise.all([
      fileClient.uploadFile(sourceFilePath),
      fileClient.uploadFile(targetFilePath),
    ]);

    // Create the initial request
    const createResponse = await this.create(
      {
        ...request,
        assets: {
          ...restAssets,
          sourceFilePath: uploadedSourceFilePath,
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
   * Face Swap Photo
   *
   * Create a face swap photo. Each photo costs 5 credits. The height/width of the output image depends on your subscription. Please refer to our [pricing](https://magichour.ai/pricing) page for more details
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
