import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/ai-qr-code-generator/request-types";
import { Schemas$PostV1AiQrCodeGeneratorBody } from "magic-hour/types/post-v1-ai-qr-code-generator-body";
import { Schemas$PostV1AiQrCodeGeneratorResponse } from "magic-hour/types/post-v1-ai-qr-code-generator-response";

export class AiQrCodeGeneratorClient extends CoreResourceClient {
  constructor(client: CoreClient) {
    super(client);
  }
  /**
   * Create AI QR Code
   *
   * Create an AI QR code. Each QR code costs 20 frames.
   *
   * POST /v1/ai-qr-code-generator
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.PostV1AiQrCodeGeneratorResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/ai-qr-code-generator",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$PostV1AiQrCodeGeneratorBody.out.parse(request),
      responseType: "json",
      responseSchema: Schemas$PostV1AiQrCodeGeneratorResponse.in,
      opts,
    });
  }
}
