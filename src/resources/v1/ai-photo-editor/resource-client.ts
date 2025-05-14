import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/ai-photo-editor/request-types";
import { Schemas$V1AiPhotoEditorCreateBody } from "magic-hour/types/v1-ai-photo-editor-create-body";
import { Schemas$V1AiPhotoEditorCreateResponse } from "magic-hour/types/v1-ai-photo-editor-create-response";

export class AiPhotoEditorClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }
  /**
   * AI Photo Editor
   *
   * > **NOTE**: this API is still in early development stages, and should be avoided. Please reach out to us if you're interested in this API.
   *
   * Edit photo using AI. Each photo costs 10 credits.
   *
   * POST /v1/ai-photo-editor
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1AiPhotoEditorCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/ai-photo-editor",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1AiPhotoEditorCreateBody.out.parse(request),
      responseSchema: Schemas$V1AiPhotoEditorCreateResponse.in,
      opts,
    });
  }
}
