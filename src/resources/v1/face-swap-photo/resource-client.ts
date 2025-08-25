import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "magic-hour/core";

import {
  GenerateOptions,
  GenerateRequestType,
} from "magic-hour/helpers/generate-type";
import * as requests from "magic-hour/resources/v1/face-swap-photo/request-types";
import { FilesClient } from "magic-hour/resources/v1/files";
import { Schemas$V1FaceSwapPhotoCreateBody } from "magic-hour/types/v1-face-swap-photo-create-body";
import { Schemas$V1FaceSwapPhotoCreateResponse } from "magic-hour/types/v1-face-swap-photo-create-response";
import { getLogger } from "magic-hour/logger";
import { ImageProjectsClient } from "magic-hour/resources/v1/image-projects";

type GenerateRequest = GenerateRequestType<
  requests.CreateRequest,
  {
    /**
     * This is the image from which the face is extracted. This value is either
     * - a direct URL to the image file
     * - a path to a local file
     *
     * Note: if the path begins with `api-assets`, it will be assumed to already be uploaded to Magic Hour's storage, and will not be uploaded again.
     */
    sourceFilePath: string;
    /**
     * This is the image where the face from the source image will be placed. This value is either
     * - a direct URL to the image file
     * - a path to a local file
     *
     * Note: if the path begins with `api-assets`, it will be assumed to already be uploaded to Magic Hour's storage, and will not be uploaded again.
     */
    targetFilePath: string;
  }
>;

export class FaceSwapPhotoClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * Face Swap Photo
   *
   * Create a face swap photo
   *
   * This method provides a convenient way to create a request and automatically wait for completion and download outputs.
   *
   * @example
   * ```typescript
   * import Client from "magic-hour";
   *
   * const client = new Client({ token: process.env["API_TOKEN"]!! });
   * const res = await client.v1.faceSwapPhoto.generate(
   *   {
   *     assets: {
   *       faceMappings: [
   *         {
   *           newFace: "api-assets/id/1234.png",
   *           originalFace: "api-assets/id/0-0.png",
   *         },
   *       ],
   *       faceSwapMode: "all-faces",
   *       sourceFilePath: "/path/to/1234.png",
   *       targetFilePath: "/path/to/1234.png",
   *     },
   *     name: "Face Swap image",
   *   },
   *   {
   *     waitForCompletion: true,
   *     downloadOutputs: true,
   *     downloadDirectory: "outputs",
   *   },
   * );
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

    getLogger().debug(
      `Uploading file ${sourceFilePath} to Magic Hour's storage`,
    );
    getLogger().debug(
      `Uploading file ${targetFilePath} to Magic Hour's storage`,
    );

    const [uploadedSourceFilePath, uploadedTargetFilePath] = await Promise.all([
      fileClient.uploadFile(sourceFilePath),
      fileClient.uploadFile(targetFilePath),
    ]);

    getLogger().info(
      `Uploaded file ${sourceFilePath} to Magic Hour's storage as ${uploadedSourceFilePath}`,
    );
    getLogger().info(
      `Uploaded file ${targetFilePath} to Magic Hour's storage as ${uploadedTargetFilePath}`,
    );

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

    getLogger().info(
      `Created FaceSwapPhotoClient project ${createResponse.id}`,
    );

    const projectsClient = new ImageProjectsClient(this._client, this._opts);

    getLogger().debug(
      `Checking result for FaceSwapPhotoClient project ${createResponse.id}`,
    );

    const result = await projectsClient.checkResult(
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
