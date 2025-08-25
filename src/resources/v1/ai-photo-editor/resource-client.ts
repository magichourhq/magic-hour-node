import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "magic-hour/core";
import { downloadFiles } from "magic-hour/helpers/download";
import {
  GenerateOptions,
  GenerateRequestType,
} from "magic-hour/helpers/generate-type";
import * as requests from "magic-hour/resources/v1/ai-photo-editor/request-types";
import { FilesClient } from "magic-hour/resources/v1/files";
import { Schemas$V1AiPhotoEditorCreateBody } from "magic-hour/types/v1-ai-photo-editor-create-body";
import { Schemas$V1AiPhotoEditorCreateResponse } from "magic-hour/types/v1-ai-photo-editor-create-response";
import { ImageProjectsClient } from "magic-hour/resources/v1/image-projects";

type GenerateRequest = GenerateRequestType<
  requests.CreateRequest,
  {
    /**
     * The image used to generate the output. This value is either
     * - a direct URL to the image file
     * - a path to a local file
     *
     * Note: if the path begins with `api-assets`, it will be assumed to already be uploaded to Magic Hour's storage, and will not be uploaded again.
     */
    imageFilePath: string;
  }
>;

export class AiPhotoEditorClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * AI Photo Editor
   *
   * > **NOTE**: this API is still in early development stages, and should be avoided
   *
   * This method provides a convenient way to create a request and automatically wait for completion and download outputs.
   *
   * @example
   * ```typescript
   * import Client from "magic-hour";
   *
   * const client = new Client({ token: process.env["API_TOKEN"]!! });
   * const res = await client.v1.aiPhotoEditor.generate(
   *   {
   *     assets: { imageFilePath: "/path/to/1234.png" },
   *     name: "Photo Editor image",
   *     resolution: 768,
   *     style: {
   *       imageDescription: "A photo of a person",
   *       likenessStrength: 5.2,
   *       negativePrompt: "painting, cartoon, sketch",
   *       prompt: "A photo portrait of a person wearing a hat",
   *       promptStrength: 3.75,
   *       steps: 4,
   *       upscaleFactor: 2,
   *       upscaleFidelity: 0.5,
   *     },
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

    const { imageFilePath, ...restAssets } = request.assets;

    const [uploadedImageFilePath] = await Promise.all([
      fileClient.uploadFile(imageFilePath),
    ]);

    const createResponse = await this.create(
      {
        ...request,
        assets: {
          ...restAssets,
          imageFilePath: uploadedImageFilePath,
        },
      },
      createOpts,
    );

    const projectsClient = new ImageProjectsClient(this._client, this._opts);

    const result = await projectsClient.checkResult(
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
   * AI Photo Editor
   *
   * > **NOTE**: this API is still in early development stages, and should be avoided. Please reach out to us if you're interested in this API.
   *
   * Edit photo using AI. Each photo costs 10 credits.
   *
   * POST /v1/ai-photo-editor
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1AiPhotoEditorCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/ai-photo-editor",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1AiPhotoEditorCreateBody.out.parse(request),
      responseSchema: Schemas$V1AiPhotoEditorCreateResponse.in,
      opts,
    });
  }
}
