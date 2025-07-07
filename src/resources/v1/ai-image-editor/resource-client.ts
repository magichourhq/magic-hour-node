import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/ai-image-editor/request-types";
import { Schemas$V1AiImageEditorCreateBody } from "magic-hour/types/v1-ai-image-editor-create-body";
import { Schemas$V1AiImageEditorCreateResponse } from "magic-hour/types/v1-ai-image-editor-create-response";

export class AiImageEditorClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }
  /**
   * AI Image Editor
   *
   * Edit images with AI. Each edit costs 50 credits.
   *
   * POST /v1/ai-image-editor
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1AiImageEditorCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/ai-image-editor",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1AiImageEditorCreateBody.out.parse(request),
      responseSchema: Schemas$V1AiImageEditorCreateResponse.in,
      opts,
    });
  }
}
