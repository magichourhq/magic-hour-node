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
import * as requests from "magic-hour/resources/v1/ai-gif-generator/request-types";
import { Schemas$V1AiGifGeneratorCreateBody } from "magic-hour/types/v1-ai-gif-generator-create-body";
import { Schemas$V1AiGifGeneratorCreateResponse } from "magic-hour/types/v1-ai-gif-generator-create-response";
import { FilesClient } from "magic-hour/resources/v1/files";
import { ImageProjectsClient } from "magic-hour/resources/v1/image-projects";

type GenerateRequest = GenerateRequestType<requests.CreateRequest, {}>;

export class AiGifGeneratorClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * AI GIFs
   *
   * Create an AI GIF
   *
   * This method provides a convenient way to create a request and automatically wait for completion and download outputs.
   *
   * @example
   * ```typescript
   * import Client from "magic-hour";
   *
   * const client = new Client({ token: process.env["API_TOKEN"]!! });
   * const res = await client.v1.aiGifGenerator.generate(
   *   {
   *     name: "Ai Gif gif",
   *     style: { prompt: "Cute dancing cat, pixel art" },
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

    const createResponse = await this.create(
      {
        ...request,
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
   * AI GIFs
   *
   * Create an AI GIF. Each GIF costs 50 credits.
   *
   * POST /v1/ai-gif-generator
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1AiGifGeneratorCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/ai-gif-generator",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1AiGifGeneratorCreateBody.out.parse(request),
      responseSchema: Schemas$V1AiGifGeneratorCreateResponse.in,
      opts,
    });
  }
}
