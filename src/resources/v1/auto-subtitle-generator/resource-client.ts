import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/auto-subtitle-generator/request-types";
import { Schemas$V1AutoSubtitleGeneratorCreateBody } from "magic-hour/types/v1-auto-subtitle-generator-create-body";
import { Schemas$V1AutoSubtitleGeneratorCreateResponse } from "magic-hour/types/v1-auto-subtitle-generator-create-response";
import { FilesClient } from "magic-hour/resources/v1/files";
import { ImageProjectsClient } from "magic-hour/resources/v1/image-projects";
import {
  GenerateOptions,
  GenerateRequestType,
} from "magic-hour/helpers/generate-type";

type GenerateRequest = GenerateRequestType<
  requests.CreateRequest,
  {
    /** This is the video used to add subtitles. This value is either
     * - a direct URL to the image file
     * - a path to a local file
     *
     * Note: if the path begins with `api-assets`, it will be assumed to already be uploaded to Magic Hour's storage, and will not be uploaded again. */
    videoFilePath: string;
  }
>;

export class AutoSubtitleGeneratorClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * AI generate helper with automatic polling and downloading.
   * @example
   * ```ts
   * const result = await client.v1.autoSubtitleGenerator.generate({
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

    const { videoFilePath, ...restAssets } = request.assets;

    const [uploadedVideoFilePath] = await Promise.all([
      fileClient.uploadFile(videoFilePath),
    ]);

    // Create the initial request
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
