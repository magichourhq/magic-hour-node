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
import { downloadFiles } from "magic-hour/helpers/download";

type GenerateRequest = GenerateRequestType<
  requests.CreateRequest,
  {
    /** The image used as the new background for the image_file_path. This value is either
     * - a direct URL to the image file
     * - a path to a local file
     *
     * Note: if the path begins with `api-assets`, it will be assumed to already be uploaded to Magic Hour's storage, and will not be uploaded again. */
    backgroundImageFilePath: string;
    /** The image to remove the background. This value is either
     * - a direct URL to the image file
     * - a path to a local file
     *
     * Note: if the path begins with `api-assets`, it will be assumed to already be uploaded to Magic Hour's storage, and will not be uploaded again. */
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
   * Remove background from image - Generate with automatic polling and downloading
   *
   * - This method provides a convenient way to create a request and automatically wait for completion and download outputs.
   *
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

    if (downloadOutputs) {
      result.downloadedPaths = await downloadFiles(
        result.downloads,
        downloadDirectory,
      );
    }

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
