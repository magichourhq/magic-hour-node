import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/ai-photo-editor/request-types";
import { Schemas$V1AiPhotoEditorCreateBody } from "magic-hour/types/v1-ai-photo-editor-create-body";
import { Schemas$V1AiPhotoEditorCreateResponse } from "magic-hour/types/v1-ai-photo-editor-create-response";
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
    imageFilePath: string;
  }
>;

export class AiPhotoEditorClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * AI generate helper with automatic polling and downloading.
   * @example
   * ```ts
   * const result = await client.v1.aiPhotoEditor.generate({
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
