import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/image-background-remover/request-types";
import { Schemas$V1ImageBackgroundRemoverCreateBody } from "magic-hour/types/v1-image-background-remover-create-body";
import { Schemas$V1ImageBackgroundRemoverCreateResponse } from "magic-hour/types/v1-image-background-remover-create-response";
import { FilesClient } from "magic-hour/resources/v1/files";
import { ImageProjectsClient } from "magic-hour/resources/v1/image-projects";
import {
  GenerateOptions,
  GenerateRequestType,
} from "magic-hour/helpers/generate-type";

type GenerateRequest = GenerateRequestType<
  requests.CreateRequest,
  {
    /** File input */
    backgroundImageFilePath: string;
    /** File input */
    imageFilePath: string;
  }
>;

export class ImageBackgroundRemoverClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * AI generate helper with automatic polling and downloading.
   * @example
   * ```ts
   * const result = await client.v1.imageBackgroundRemover.generate({
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

    const { backgroundImageFilePath, imageFilePath, ...restAssets } =
      request.assets;

    const [uploadedBackgroundImageFilePath, uploadedImageFilePath] =
      await Promise.all([
        fileClient.uploadFile(backgroundImageFilePath),
        fileClient.uploadFile(imageFilePath),
      ]);

    // Create the initial request
    const createResponse = await this.create(
      {
        ...request,
        assets: {
          ...restAssets,
          backgroundImageFilePath: uploadedBackgroundImageFilePath,
          imageFilePath: uploadedImageFilePath,
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
   * Image Background Remover
   *
   * Remove background from image. Each image costs 5 credits.
   *
   * POST /v1/image-background-remover
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1ImageBackgroundRemoverCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/image-background-remover",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1ImageBackgroundRemoverCreateBody.out.parse(request),
      responseSchema: Schemas$V1ImageBackgroundRemoverCreateResponse.in,
      opts,
    });
  }
}
