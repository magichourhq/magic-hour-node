import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/video-projects/request-types";
import { Schemas$V1VideoProjectsGetResponse } from "magic-hour/types/v1-video-projects-get-response";

export class VideoProjectsClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }
  /**
   * Delete video
   *
   * Permanently delete the rendered video. This action is not reversible, please be sure before deleting.
   *
   * DELETE /v1/video-projects/{id}
   */
  delete(
    request: requests.DeleteRequest,
    opts?: RequestOptions,
  ): ApiPromise<null> {
    return this._client.makeRequest({
      method: "delete",
      path: `/v1/video-projects/${request.id}`,
      auth: ["bearerAuth"],
      responseRaw: true,
      opts,
    });
  }
  /**
   * Get video details
   *
   * Get the details of a video project. The `downloads` field will be empty unless the video was successfully rendered.
   *
   * The video can be one of the following status
   * - `draft` - not currently used
   * - `queued` - the job is queued and waiting for a GPU
   * - `rendering` - the generation is in progress
   * - `complete` - the video is successful created
   * - `error` - an error occurred during rendering
   * - `canceled` - video render is canceled by the user
   *
   *
   * GET /v1/video-projects/{id}
   */
  get(
    request: requests.GetRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1VideoProjectsGetResponse> {
    return this._client.makeRequest({
      method: "get",
      path: `/v1/video-projects/${request.id}`,
      auth: ["bearerAuth"],
      responseSchema: Schemas$V1VideoProjectsGetResponse.in,
      opts,
    });
  }
}
