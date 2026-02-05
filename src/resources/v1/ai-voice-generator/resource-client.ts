import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "make-api-request-js";

import {
  GenerateOptions,
  GenerateRequestType,
} from "magic-hour/helpers/generate-type";
import { getLogger } from "magic-hour/logger";
import * as requests from "magic-hour/resources/v1/ai-voice-generator/request-types";
import { ImageProjectsClient } from "magic-hour/resources/v1/image-projects";
import * as types from "magic-hour/types";
import { Schemas$V1AiVoiceGeneratorCreateBody } from "magic-hour/types/v1-ai-voice-generator-create-body";
import { Schemas$V1AiVoiceGeneratorCreateResponse } from "magic-hour/types/v1-ai-voice-generator-create-response";

type GenerateRequest = GenerateRequestType<requests.CreateRequest, {}>;

export class AiVoiceGeneratorClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * AI Voice Generator
   *
   * Generate speech from text
   *
   * This method provides a convenient way to create a request and automatically wait for completion and download outputs.
   *
   * @example
   * ```typescript
   * import { Client } from "magic-hour";
   *
   * const client = new Client({ token: process.env["API_TOKEN"]!! });
   * const res = await client.v1.aiVoiceGenerator.generate(
   *   {
   *     name: "Voice Generator audio",
   *     style: { prompt: "Hello, how are you?", voiceName: "Elon Musk" },
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

    const createResponse = await this.create(request, createOpts);

    getLogger().info(
      `Created AiVoiceGeneratorClient project ${createResponse.id}`,
    );

    const projectsClient = new ImageProjectsClient(this._client, this._opts);

    getLogger().debug(
      `Checking result for AiVoiceGeneratorClient project ${createResponse.id}`,
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
   * AI Voice Generator
   *
   * Generate speech from text. Each character costs 0.05 credits. The cost is rounded up to the nearest whole number.
   *
   * POST /v1/ai-voice-generator
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1AiVoiceGeneratorCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/ai-voice-generator",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1AiVoiceGeneratorCreateBody.out.parse(request),
      responseSchema: Schemas$V1AiVoiceGeneratorCreateResponse.in,
      opts,
    });
  }
}
