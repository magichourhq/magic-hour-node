import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "magic-hour/core";
import {
  GenerateOptions,
  GenerateRequestType,
} from "magic-hour/helpers/generate-type";
import { getLogger } from "magic-hour/logger";
import * as requests from "magic-hour/resources/v1/auto-subtitle-generator/request-types";
import { FilesClient } from "magic-hour/resources/v1/files";
import { VideoProjectsClient } from "magic-hour/resources/v1/video-projects";
import { Schemas$V1AutoSubtitleGeneratorCreateBody } from "magic-hour/types/v1-auto-subtitle-generator-create-body";
import { Schemas$V1AutoSubtitleGeneratorCreateResponse } from "magic-hour/types/v1-auto-subtitle-generator-create-response";

type GenerateRequest = GenerateRequestType<
  requests.CreateRequest,
  {
    /**
     * This is the video used to add subtitles. This value is either
     * - a direct URL to the image file
     * - a path to a local file
     *
     * Note: if the path begins with `api-assets`, it will be assumed to already be uploaded to Magic Hour's storage, and will not be uploaded again.
     */
    videoFilePath: string;
  }
>;

export class AutoSubtitleGeneratorClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * Auto Subtitle Generator
   *
   * Automatically generate subtitles for your video in multiple languages
   *
   * This method provides a convenient way to create a request and automatically wait for completion and download outputs.
   *
   * @example
   * ```typescript
   * import Client from "magic-hour";
   *
   * const client = new Client({ token: process.env["API_TOKEN"]!! });
   * const res = await client.v1.autoSubtitleGenerator.generate(
   *   {
   *     assets: { videoFilePath: "/path/to/1234.mp4" },
   *     endSeconds: 15.0,
   *     name: "Auto Subtitle video",
   *     startSeconds: 0.0,
   *     style: {},
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
    const { videoFilePath, ...restAssets } = request.assets;

    getLogger().debug(
      `Uploading file ${videoFilePath} to Magic Hour's storage`,
    );

    const [uploadedVideoFilePath] = await Promise.all([
      fileClient.uploadFile(videoFilePath),
    ]);

    getLogger().info(
      `Uploaded file ${videoFilePath} to Magic Hour's storage as ${uploadedVideoFilePath}`,
    );

    const createResponse = await this.create(
      {
        ...request,
        assets: {
          ...restAssets,
          videoFilePath: uploadedVideoFilePath,
        },
      },
      createOpts,
    );

    getLogger().info(
      `Created AutoSubtitleGeneratorClient project ${createResponse.id}`,
    );

    const projectsClient = new VideoProjectsClient(this._client, this._opts);

    getLogger().debug(
      `Checking result for AutoSubtitleGeneratorClient project ${createResponse.id}`,
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
   * Auto Subtitle Generator
   *
   * Automatically generate subtitles for your video in multiple languages.
   *
   * POST /v1/auto-subtitle-generator
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1AutoSubtitleGeneratorCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/auto-subtitle-generator",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1AutoSubtitleGeneratorCreateBody.out.parse(request),
      responseSchema: Schemas$V1AutoSubtitleGeneratorCreateResponse.in,
      opts,
    });
  }
}
