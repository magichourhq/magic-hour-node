import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/ai-photo-editor/request-types";
import { Schemas$PostV1AiPhotoEditorBody } from "magic-hour/types/post-v1-ai-photo-editor-body";
import { Schemas$PostV1AiPhotoEditorResponse } from "magic-hour/types/post-v1-ai-photo-editor-response";

export class AiPhotoEditorClient extends CoreResourceClient {
  constructor(client: CoreClient) {
    super(client);
  }
  /**
   * AI Photo Editor
   *
   * > **NOTE**: this API is still in early development stages, and should be avoided. Please reach out to us if you're interested in this API.
   *
   * Edit photo using AI. Each photo costs 10 frames.
   *
   * POST /v1/ai-photo-editor
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.PostV1AiPhotoEditorResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/ai-photo-editor",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$PostV1AiPhotoEditorBody.out.parse(request),
      responseSchema: Schemas$PostV1AiPhotoEditorResponse.in,
      opts,
    });
  }
}
