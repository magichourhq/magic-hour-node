import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/ai-qr-code-generator/request-types";
import { Schemas$V1AiQrCodeGeneratorCreateBody } from "magic-hour/types/v1-ai-qr-code-generator-create-body";
import { Schemas$V1AiQrCodeGeneratorCreateResponse } from "magic-hour/types/v1-ai-qr-code-generator-create-response";
import { FilesClient } from "magic-hour/resources/v1/files";
import { ImageProjectsClient } from "magic-hour/resources/v1/image-projects";
import {
  GenerateOptions,
  GenerateRequestType,
} from "magic-hour/helpers/generate-type";

type GenerateRequest = GenerateRequestType<requests.CreateRequest, {}>;

export class AiQrCodeGeneratorClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * AI QR Code
   *
   * Create an AI QR code - Generate with automatic polling and downloading
   *
   * - This method provides a convenient way to create a request and automatically wait for completion and download outputs.
   *
   */
  async generate(request: GenerateRequest, opts: GenerateOptions = {}) {
    const {
      waitForCompletion = true,
      downloadOutputs = true,
      downloadDirectory = undefined,
      ...createOpts
    } = opts;

    // Create the initial request
    const createResponse = await this.create(
      {
        ...request,
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
