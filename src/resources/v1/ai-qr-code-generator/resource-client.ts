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

export class AiQrCodeGeneratorClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
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
