import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/ai-image-editor/request-types";
import { Schemas$V1AiImageEditorCreateBody } from "magic-hour/types/v1-ai-image-editor-create-body";
import { Schemas$V1AiImageEditorCreateResponse } from "magic-hour/types/v1-ai-image-editor-create-response";
import { FilesClient } from "magic-hour/resources/v1/files";
import { ImageProjectsClient } from "magic-hour/resources/v1/image-projects";
import {
  GenerateOptions,
  GenerateRequestType,
} from "magic-hour/helpers/generate-type";

type GenerateRequest = GenerateRequestType<
  requests.CreateRequest,
  {
    /** The image used in the edit. This value is either
     * - a direct URL to the image file
     * - a path to a local file
     *
     * Note: if the path begins with `api-assets`, it will be assumed to already be uploaded to Magic Hour's storage, and will not be uploaded again. */
    imageFilePath: string;
  }
>;

export class AiImageEditorClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * AI generate helper with automatic polling and downloading.
   * @example
   * ```ts
   * const result = await client.v1.aiImageEditor.generate({
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

    const { imageFilePath, ...restAssets } = request.assets;

    const [uploadedImageFilePath] = await Promise.all([
      fileClient.uploadFile(imageFilePath),
    ]);

    // Create the initial request
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
   * AI Image Editor
   *
   * Edit images with AI. Each edit costs 50 credits.
   *
   * POST /v1/ai-image-editor
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1AiImageEditorCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/ai-image-editor",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1AiImageEditorCreateBody.out.parse(request),
      responseSchema: Schemas$V1AiImageEditorCreateResponse.in,
      opts,
    });
  }
}
