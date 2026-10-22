import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "make-api-request-js";

import { GenerateOptions } from "magic-hour/helpers/generate-type";
import { getLogger } from "magic-hour/logger";
import * as requests from "magic-hour/resources/v1/ai-music-generator/request-types";
import { AudioProjectsClient } from "magic-hour/resources/v1/audio-projects";
import * as types from "magic-hour/types";
import { Schemas$V1AiMusicGeneratorCreateBody } from "magic-hour/types/v1-ai-music-generator-create-body";
import { Schemas$V1AiMusicGeneratorCreateResponse } from "magic-hour/types/v1-ai-music-generator-create-response";

export class AiMusicGeneratorClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * Generate music with automatic polling and downloads.
   *
   * Accepts the same request fields as create(). By default, waits for completion
   * and downloads outputs. Use opts to disable waiting or downloading, or set
   * the download directory.
   *
   * @example
   * ```typescript
   * const result = await client.v1.aiMusicGenerator.generate({
   *   duration: 120,
   *   style: { prompt: "Dreamy synthwave with warm bass" },
   * });
   * ```
   */
  async generate(request: requests.CreateRequest, opts: GenerateOptions = {}) {
    const {
      waitForCompletion = true,
      downloadOutputs = true,
      downloadDirectory = undefined,
      ...createOpts
    } = opts;

    const createResponse = await this.create(request, createOpts);
    getLogger().info(`Created ai-music-generator project ${createResponse.id}`);

    const projectsClient = new AudioProjectsClient(this._client, this._opts);
    return projectsClient.checkResult(
      { id: createResponse.id },
      {
        waitForCompletion,
        downloadOutputs,
        downloadDirectory,
        ...createOpts,
      },
    );
  }

  /**
   * AI Music Generator
   *
   * Generate music from a description, with optional custom lyrics or instrumental-only output. Costs 1 credits per requested second. Returns a project ID; poll GET /v1/audio-projects/{id} for status and downloads.
   *
   * POST /v1/ai-music-generator
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1AiMusicGeneratorCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/ai-music-generator",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1AiMusicGeneratorCreateBody.out.parse(request),
      responseSchema: Schemas$V1AiMusicGeneratorCreateResponse.in,
      opts,
    });
  }
}
