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
import {
  GenerateOptions,
  GenerateRequestType,
} from "magic-hour/helpers/generate-type";
import { downloadFiles } from "magic-hour/helpers/download";
import { ImageProjectsClient } from "magic-hour/resources/v1/image-projects";

type GenerateRequest = GenerateRequestType<
  requests.CreateRequest,
  {
    /**
     * This is the image whose face will be edited. This value is either
     * - a direct URL to the image file
     * - a path to a local file
     *
     * Note: if the path begins with `api-assets`, it will be assumed to already be uploaded to Magic Hour's storage, and will not be uploaded again.
     */
    imageFilePath: string;
  }
>;

export class AiFaceEditorClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * AI Face Editor
   *
   * Edit facial features of an image using AI
   *
   * This method provides a convenient way to create a request and automatically wait for completion and download outputs.
   *
   * @example
   * ```typescript
   * import Client from "magic-hour";
   *
   * const client = new Client({ token: process.env["API_TOKEN"]!! });
   * const res = await client.v1.aiFaceEditor.generate(
   *   {
   *     assets: { imageFilePath: "/path/to/1234.png" },
   *     name: "Face Editor image",
   *     style: {
   *       enhanceFace: false,
   *       eyeGazeHorizontal: 0.0,
   *       eyeGazeVertical: 0.0,
   *       eyeOpenRatio: 0.0,
   *       eyebrowDirection: 0.0,
   *       headPitch: 0.0,
   *       headRoll: 0.0,
   *       headYaw: 0.0,
   *       lipOpenRatio: 0.0,
   *       mouthGrim: 0.0,
   *       mouthPositionHorizontal: 0.0,
   *       mouthPositionVertical: 0.0,
   *       mouthPout: 0.0,
   *       mouthPurse: 0.0,
   *       mouthSmile: 0.0,
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
