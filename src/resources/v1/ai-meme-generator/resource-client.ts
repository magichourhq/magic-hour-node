import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/ai-meme-generator/request-types";
import { Schemas$V1AiMemeGeneratorCreateBody } from "magic-hour/types/v1-ai-meme-generator-create-body";
import { Schemas$V1AiMemeGeneratorCreateResponse } from "magic-hour/types/v1-ai-meme-generator-create-response";
import { FilesClient } from "magic-hour/resources/v1/files";
import {
  GenerateOptions,
  GenerateRequestType,
} from "magic-hour/helpers/generate-type";
import { downloadFiles } from "magic-hour/helpers/download";
import { ImageProjectsClient } from "magic-hour/resources/v1/image-projects";

type GenerateRequest = GenerateRequestType<requests.CreateRequest, {}>;

export class AiMemeGeneratorClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * AI Meme Generator
   *
   * Create an AI generated meme
   *
   * This method provides a convenient way to create a request and automatically wait for completion and download outputs.
   *
   * @example
   * ```typescript
   * import Client from "magic-hour";
   *
   * const client = new Client({ token: process.env["API_TOKEN"]!! });
   * const res = await client.v1.aiMemeGenerator.generate(
   *   {
   *     name: "My Funny Meme",
   *     style: {
   *       searchWeb: false,
   *       template: "Drake Hotline Bling",
   *       topic: "When the code finally works",
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
   * AI Meme Generator
   *
   * Create an AI generated meme. Each meme costs 10 credits.
   *
   * POST /v1/ai-meme-generator
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1AiMemeGeneratorCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/ai-meme-generator",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1AiMemeGeneratorCreateBody.out.parse(request),
      responseSchema: Schemas$V1AiMemeGeneratorCreateResponse.in,
      opts,
    });
  }
}
