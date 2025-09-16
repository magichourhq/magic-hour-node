import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "make-api-request-js";

import * as requests from "magic-hour/resources/v1/audio-projects/request-types";
import * as types from "magic-hour/types";
import { Schemas$V1AudioProjectsGetResponse } from "magic-hour/types/v1-audio-projects-get-response";

export class AudioProjectsClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * Delete audio
   *
   * Permanently delete the rendered audio file(s). This action is not reversible, please be sure before deleting.
   *
   * DELETE /v1/audio-projects/{id}
   */
  delete(
    request: requests.DeleteRequest,
    opts?: RequestOptions,
  ): ApiPromise<null> {
    return this._client.makeRequest({
      method: "delete",
      path: `/v1/audio-projects/${request.id}`,
      auth: ["bearerAuth"],
      opts,
    });
  }

  /**
   * Get audio details
   *
   * Get the details of a audio project. The `downloads` field will be empty unless the audio was successfully rendered.
   *
   * The audio can be one of the following status
   * - `draft` - not currently used
   * - `queued` - the job is queued and waiting for a GPU
   * - `rendering` - the generation is in progress
   * - `complete` - the audio is successful created
   * - `error` - an error occurred during rendering
   * - `canceled` - audio render is canceled by the user
   *
   *
   * GET /v1/audio-projects/{id}
   */
  get(
    request: requests.GetRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1AudioProjectsGetResponse> {
    return this._client.makeRequest({
      method: "get",
      path: `/v1/audio-projects/${request.id}`,
      auth: ["bearerAuth"],
      responseSchema: Schemas$V1AudioProjectsGetResponse.in,
      opts,
    });
  }
}
