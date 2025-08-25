import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/ai-talking-photo/request-types";
import { Schemas$V1AiTalkingPhotoCreateBody } from "magic-hour/types/v1-ai-talking-photo-create-body";
import { Schemas$V1AiTalkingPhotoCreateResponse } from "magic-hour/types/v1-ai-talking-photo-create-response";
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
    audioFilePath: string;
    /** File input */
    imageFilePath: string;
  }
>;

export class AiTalkingPhotoClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * AI generate helper with automatic polling and downloading.
   * @example
   * ```ts
   * const result = await client.v1.aiTalkingPhoto.generate({
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

    const { audioFilePath, imageFilePath, ...restAssets } = request.assets;

    const [uploadedAudioFilePath, uploadedImageFilePath] = await Promise.all([
      fileClient.uploadFile(audioFilePath),
      fileClient.uploadFile(imageFilePath),
    ]);

    // Create the initial request
    const createResponse = await this.create(
      {
        ...request,
        assets: {
          ...restAssets,
          audioFilePath: uploadedAudioFilePath,
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
   * AI Talking Photo
   *
   * Create a talking photo from an image and audio or text input.
   *
   * POST /v1/ai-talking-photo
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1AiTalkingPhotoCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/ai-talking-photo",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1AiTalkingPhotoCreateBody.out.parse(request),
      responseSchema: Schemas$V1AiTalkingPhotoCreateResponse.in,
      opts,
    });
  }
}
