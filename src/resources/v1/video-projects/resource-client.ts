import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/video-projects/request-types";
import { Schemas$GetV1VideoProjectsIdResponse } from "magic-hour/types/get-v1-video-projects-id-response";

export class VideoProjectsClient extends CoreResourceClient {
  constructor(client: CoreClient) {
    super(client);
  }
  /**
   * Get video details
   *
   * Get the details of a video project. The `download` field will be `null` unless the video was successfully rendered.
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
  ): ApiPromise<types.GetV1VideoProjectsIdResponse> {
    return this._client.makeRequest({
      method: "get",
      path: `/v1/video-projects/${request.id}`,
      auth: ["bearerAuth"],
      responseType: "json",
      responseSchema: Schemas$GetV1VideoProjectsIdResponse.in,
      opts,
    });
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
      responseType: "json",
      opts,
    });
  }
}
