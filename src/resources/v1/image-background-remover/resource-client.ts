import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "make-api-request-js";

import { types } from "magic-hour";
import {
  GenerateOptions,
  GenerateRequestType,
} from "magic-hour/helpers/generate-type";
import { getLogger } from "magic-hour/logger";
import { FilesClient } from "magic-hour/resources/v1/files";
import * as requests from "magic-hour/resources/v1/image-background-remover/request-types";
import { ImageProjectsClient } from "magic-hour/resources/v1/image-projects";
import { Schemas$V1ImageBackgroundRemoverCreateBody } from "magic-hour/types/v1-image-background-remover-create-body";
import { Schemas$V1ImageBackgroundRemoverCreateResponse } from "magic-hour/types/v1-image-background-remover-create-response";

type GenerateRequest = GenerateRequestType<
  requests.CreateRequest,
  {
    /**
     * The image used as the new background for the image_file_path. This value is either
     * - a direct URL to the image file
     * - a path to a local file
     *
     * Note: if the path begins with `api-assets`, it will be assumed to already be uploaded to Magic Hour's storage, and will not be uploaded again.
     */
    backgroundImageFilePath?: string | undefined;
    /**
     * The image to remove the background. This value is either
     * - a direct URL to the image file
     * - a path to a local file
     *
     * Note: if the path begins with `api-assets`, it will be assumed to already be uploaded to Magic Hour's storage, and will not be uploaded again.
     */
    imageFilePath: string;
  }
>;

export class ImageBackgroundRemoverClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * Image Background Remover
   *
   * Remove background from image
   *
   * This method provides a convenient way to create a request and automatically wait for completion and download outputs.
   *
   * @example
   * ```typescript
   * import { Client } from "magic-hour";
   *
   * const client = new Client({ token: process.env["API_TOKEN"]!! });
   * const res = await client.v1.imageBackgroundRemover.generate(
   *   {
   *     assets: {
   *       backgroundImageFilePath: "/path/to/1234.png",
   *       imageFilePath: "/path/to/1234.png",
   *     },
   *     name: "Background Remover image",
   *   },
   *   {
   *     waitForCompletion: true,
   *     downloadOutputs: true,
   *     downloadDirectory: ".",
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
    const { backgroundImageFilePath, imageFilePath, ...restAssets } =
      request.assets;

    if (backgroundImageFilePath) {
      getLogger().debug(
        `Uploading file ${backgroundImageFilePath} to Magic Hour's storage`,
      );
    }
    getLogger().debug(
      `Uploading file ${imageFilePath} to Magic Hour's storage`,
    );

    const [uploadedBackgroundImageFilePath, uploadedImageFilePath] =
      await Promise.all([
        backgroundImageFilePath
          ? fileClient.uploadFile(backgroundImageFilePath)
          : Promise.resolve(backgroundImageFilePath),
        fileClient.uploadFile(imageFilePath),
      ]);

    if (backgroundImageFilePath) {
      getLogger().info(
        `Uploaded file ${backgroundImageFilePath} to Magic Hour's storage as ${uploadedBackgroundImageFilePath}`,
      );
    }
    getLogger().info(
      `Uploaded file ${imageFilePath} to Magic Hour's storage as ${uploadedImageFilePath}`,
    );

    const createResponse = await this.create(
      {
        ...request,
        assets: {
          ...restAssets,
          backgroundImageFilePath: backgroundImageFilePath
            ? uploadedBackgroundImageFilePath
            : backgroundImageFilePath,
          imageFilePath: uploadedImageFilePath,
        },
      },
      createOpts,
    );

    getLogger().info(
      `Created ImageBackgroundRemoverClient project ${createResponse.id}`,
    );

    const projectsClient = new ImageProjectsClient(this._client, this._opts);

    getLogger().debug(
      `Checking result for ImageBackgroundRemoverClient project ${createResponse.id}`,
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
