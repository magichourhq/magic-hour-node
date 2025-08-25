import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/ai-face-editor/request-types";
import { Schemas$V1AiFaceEditorCreateBody } from "magic-hour/types/v1-ai-face-editor-create-body";
import { Schemas$V1AiFaceEditorCreateResponse } from "magic-hour/types/v1-ai-face-editor-create-response";
import { FilesClient } from "magic-hour/resources/v1/files";
import { ImageProjectsClient } from "magic-hour/resources/v1/image-projects";
import {
  GenerateOptions,
  GenerateRequestType,
} from "magic-hour/helpers/generate-type";

type GenerateRequest = GenerateRequestType<
  requests.CreateRequest,
  {
    /** This is the image whose face will be edited. */
    imageFilePath: string;
  }
>;

export class AiFaceEditorClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * AI generate helper with automatic polling and downloading.
   * @example
   * ```ts
   * const result = await client.v1.aiFaceEditor.generate({
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
   * AI Face Editor
   *
   * Edit facial features of an image using AI. Each edit costs 1 frame. The height/width of the output image depends on your subscription. Please refer to our [pricing](/pricing) page for more details
   *
   * POST /v1/ai-face-editor
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1AiFaceEditorCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/ai-face-editor",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1AiFaceEditorCreateBody.out.parse(request),
      responseSchema: Schemas$V1AiFaceEditorCreateResponse.in,
      opts,
    });
  }
}
