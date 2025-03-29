import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/image-projects/request-types";
import { Schemas$V1ImageProjectsGetResponse } from "magic-hour/types/v1-image-projects-get-response";

export class ImageProjectsClient extends CoreResourceClient {
  constructor(client: CoreClient) {
    super(client);
  }
  /**
   * Get image details
   *
   * Get the details of a image project. The `downloads` field will be empty unless the image was successfully rendered.
   *
   * The image can be one of the following status
   * - `draft` - not currently used
   * - `queued` - the job is queued and waiting for a GPU
   * - `rendering` - the generation is in progress
   * - `complete` - the image is successful created
   * - `error` - an error occurred during rendering
   * - `canceled` - image render is canceled by the user
   *
   *
   * GET /v1/image-projects/{id}
   */
  get(
    request: requests.GetRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1ImageProjectsGetResponse> {
    return this._client.makeRequest({
      method: "get",
      path: `/v1/image-projects/${request.id}`,
      auth: ["bearerAuth"],
      responseSchema: Schemas$V1ImageProjectsGetResponse.in,
      opts,
    });
  }
  /**
   * Delete image
   *
   * Permanently delete the rendered image. This action is not reversible, please be sure before deleting.
   *
   * DELETE /v1/image-projects/{id}
   */
  delete(
    request: requests.DeleteRequest,
    opts?: RequestOptions,
  ): ApiPromise<null> {
    return this._client.makeRequest({
      method: "delete",
      path: `/v1/image-projects/${request.id}`,
      auth: ["bearerAuth"],
      responseRaw: true,
      opts,
    });
  }
}
