import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/ai-qr-code-generator/request-types";
import { Schemas$PostV1AiQrCodeGeneratorBody } from "magic-hour/types/post-v1-ai-qr-code-generator-body";
import { Schemas$V1AiQrCodeGeneratorcreateResponse } from "magic-hour/types/v1-ai-qr-code-generatorcreate-response";

export class AiQrCodeGeneratorClient extends CoreResourceClient {
  constructor(client: CoreClient) {
    super(client);
  }
  /**
   * AI QR Code
   *
   * Create an AI QR code. Each QR code costs 20 frames.
   *
   * POST /v1/ai-qr-code-generator
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1AiQrCodeGeneratorcreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/ai-qr-code-generator",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$PostV1AiQrCodeGeneratorBody.out.parse(request),
      responseSchema: Schemas$V1AiQrCodeGeneratorcreateResponse.in,
      opts,
    });
  }
}
