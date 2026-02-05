import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "make-api-request-js";

import { types } from "magic-hour";
import {
  GenerateOptions,
  GenerateRequestType,
} from "magic-hour/helpers/generate-type";
import { getLogger } from "magic-hour/logger";
import * as requests from "magic-hour/resources/v1/ai-voice-cloner/request-types";
import { FilesClient } from "magic-hour/resources/v1/files";
import { ImageProjectsClient } from "magic-hour/resources/v1/image-projects";
import { Schemas$V1AiVoiceClonerCreateBody } from "magic-hour/types/v1-ai-voice-cloner-create-body";
import { Schemas$V1AiVoiceClonerCreateResponse } from "magic-hour/types/v1-ai-voice-cloner-create-response";

type GenerateRequest = GenerateRequestType<
  requests.CreateRequest,
  {
    /**
     * The audio used to clone the voice. This value is either
     * - a direct URL to the audio file
     * - a path to a local file
     *
     * Note: if the path begins with `api-assets`, it will be assumed to already be uploaded to Magic Hour's storage, and will not be uploaded again.
     */
    audioFilePath: string;
  }
>;

export class AiVoiceClonerClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * AI Voice Cloner
   *
   * Clone a voice from an audio sample and generate speech.
   *
   * This method provides a convenient way to create a request and automatically wait for completion and download outputs.
   *
   * @example
   * ```typescript
   * import { Client } from "magic-hour";
   *
   * const client = new Client({ token: process.env["API_TOKEN"]!! });
   * const res = await client.v1.aiVoiceCloner.generate(
   *   {
   *     assets: { audioFilePath: "/path/to/audio.mp3" },
   *     name: "Voice Cloner audio",
   *     style: { prompt: "Hello, how are you?" },
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
    const { audioFilePath, ...restAssets } = request.assets;

    getLogger().debug(
      `Uploading file ${audioFilePath} to Magic Hour's storage`,
    );

    const uploadedAudioFilePath = await fileClient.uploadFile(audioFilePath);

    getLogger().info(
      `Uploaded file ${audioFilePath} to Magic Hour's storage as ${uploadedAudioFilePath}`,
    );

    const createResponse = await this.create(
      {
        ...request,
        assets: {
          ...restAssets,
          audioFilePath: uploadedAudioFilePath,
        },
      },
      createOpts,
    );

    getLogger().info(
      `Created AiVoiceClonerClient project ${createResponse.id}`,
    );

    const projectsClient = new ImageProjectsClient(this._client, this._opts);

    getLogger().debug(
      `Checking result for AiVoiceClonerClient project ${createResponse.id}`,
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
   * AI Voice Cloner
   *
   * Clone a voice from an audio sample and generate speech.
   * * Each character costs 0.05 credits.
   * * The cost is rounded up to the nearest whole number
   *
   * POST /v1/ai-voice-cloner
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1AiVoiceClonerCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/ai-voice-cloner",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1AiVoiceClonerCreateBody.out.parse(request),
      responseSchema: Schemas$V1AiVoiceClonerCreateResponse.in,
      opts,
    });
  }
}
