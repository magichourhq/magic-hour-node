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
import * as requests from "magic-hour/resources/v1/ai-talking-photo/request-types";
import { FilesClient } from "magic-hour/resources/v1/files";
import { Schemas$V1AiTalkingPhotoCreateBody } from "magic-hour/types/v1-ai-talking-photo-create-body";
import { Schemas$V1AiTalkingPhotoCreateResponse } from "magic-hour/types/v1-ai-talking-photo-create-response";
import { VideoProjectsClient } from "magic-hour/resources/v1/video-projects";

type GenerateRequest = GenerateRequestType<
  requests.CreateRequest,
  {
    /**
     * The audio file to sync with the image. This value is either
     * - a direct URL to the image file
     * - a path to a local file
     *
     * Note: if the path begins with `api-assets`, it will be assumed to already be uploaded to Magic Hour's storage, and will not be uploaded again.
     */
    audioFilePath: string;
    /**
     * The source image to animate. This value is either
     * - a direct URL to the image file
     * - a path to a local file
     *
     * Note: if the path begins with `api-assets`, it will be assumed to already be uploaded to Magic Hour's storage, and will not be uploaded again.
     */
    imageFilePath: string;
  }
>;

export class AiTalkingPhotoClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * AI Talking Photo
   *
   * Create a talking photo from an image and audio or text input
   *
   * This method provides a convenient way to create a request and automatically wait for completion and download outputs.
   *
   * @example
   * ```typescript
   * import Client from "magic-hour";
   *
   * const client = new Client({ token: process.env["API_TOKEN"]!! });
   * const res = await client.v1.aiTalkingPhoto.generate(
   *   {
   *     assets: {
   *       audioFilePath: "/path/to/1234.mp3",
   *       imageFilePath: "/path/to/1234.png",
   *     },
   *     endSeconds: 15.0,
   *     name: "Talking Photo image",
   *     startSeconds: 0.0,
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

    const { audioFilePath, imageFilePath, ...restAssets } = request.assets;

    const [uploadedAudioFilePath, uploadedImageFilePath] = await Promise.all([
      fileClient.uploadFile(audioFilePath),
      fileClient.uploadFile(imageFilePath),
    ]);

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

    const projectsClient = new VideoProjectsClient(this._client, this._opts);

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
