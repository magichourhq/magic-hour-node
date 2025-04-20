import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/ai-face-editor/request-types";
import { Schemas$V1AiFaceEditorCreateBody } from "magic-hour/types/v1-ai-face-editor-create-body";
import { Schemas$V1AiFaceEditorCreateResponse } from "magic-hour/types/v1-ai-face-editor-create-response";

export class AiFaceEditorClient extends CoreResourceClient {
  constructor(client: CoreClient) {
    super(client);
  }
  /**
   * AI Face Editor
   *
   * Edit facial features of an image using AI. Each edit costs 1 frame. The height/width of the output image depends on your subscription. Please refer to our [pricing](/pricing) page for more details
   *
   * POST /v1/ai-face-editor
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1AiFaceEditorCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/ai-face-editor",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1AiFaceEditorCreateBody.out.parse(request),
      responseSchema: Schemas$V1AiFaceEditorCreateResponse.in,
      opts,
    });
  }
}
