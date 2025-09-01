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
import * as requests from "magic-hour/resources/v1/ai-qr-code-generator/request-types";
import { ImageProjectsClient } from "magic-hour/resources/v1/image-projects";
import { Schemas$V1AiQrCodeGeneratorCreateBody } from "magic-hour/types/v1-ai-qr-code-generator-create-body";
import { Schemas$V1AiQrCodeGeneratorCreateResponse } from "magic-hour/types/v1-ai-qr-code-generator-create-response";

type GenerateRequest = GenerateRequestType<requests.CreateRequest, {}>;

export class AiQrCodeGeneratorClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * AI QR Code
   *
   * Create an AI QR code
   *
   * This method provides a convenient way to create a request and automatically wait for completion and download outputs.
   *
   * @example
   * ```typescript
   * import Client from "magic-hour";
   *
   * const client = new Client({ token: process.env["API_TOKEN"]!! });
   * const res = await client.v1.aiQrCodeGenerator.generate(
   *   {
   *     content: "https://magichour.ai",
   *     name: "Qr Code image",
   *     style: { artStyle: "Watercolor" },
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
      `Created AiQrCodeGeneratorClient project ${createResponse.id}`,
    );

    const projectsClient = new ImageProjectsClient(this._client, this._opts);

    getLogger().debug(
      `Checking result for AiQrCodeGeneratorClient project ${createResponse.id}`,
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
   * AI QR Code
   *
   * Create an AI QR code. Each QR code costs 20 credits.
   *
   * POST /v1/ai-qr-code-generator
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1AiQrCodeGeneratorCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/ai-qr-code-generator",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1AiQrCodeGeneratorCreateBody.out.parse(request),
      responseSchema: Schemas$V1AiQrCodeGeneratorCreateResponse.in,
      opts,
    });
  }
}
