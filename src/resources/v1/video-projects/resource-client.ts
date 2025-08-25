import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "magic-hour/core";
import { downloadFiles } from "magic-hour/helpers/download";
import { GenerateOptions } from "magic-hour/helpers/generate-type";
import { sleep } from "magic-hour/helpers/sleep";
import { getLogger } from "magic-hour/logger";
import * as requests from "magic-hour/resources/v1/video-projects/request-types";
import { Schemas$V1VideoProjectsGetResponse } from "magic-hour/types/v1-video-projects-get-response";

/**
 * Extended response interface that includes downloaded paths
 */
export interface V1VideoProjectsGetResponseWithDownloads
  extends types.V1VideoProjectsGetResponse {
  /**
   * The paths to the downloaded files.
   * This field is only populated if `download_outputs` is True and the video project is complete.
   */
  downloadedPaths?: string[];
}

export class VideoProjectsClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * Check the result of a video project with optional waiting and downloading.
   *
   * This method retrieves the status of a video project and optionally waits for completion
   * and downloads the output files.
   *
   * @param request - Request object containing the video project ID
   * @param opts - Additional request options
   * @returns The video project response with optional downloaded file paths included
   */
  async checkResult(
    request: requests.GetRequest,
    opts?: GenerateOptions,
  ): Promise<V1VideoProjectsGetResponseWithDownloads> {
    const {
      waitForCompletion = true,
      downloadOutputs = true,
      downloadDirectory = undefined,
      ...requestOpts
    } = opts || {};

    let apiResponse = await this.get({ id: request.id }, requestOpts);

    if (!waitForCompletion) {
      return {
        ...apiResponse,
      };
    }

    const pollInterval = parseFloat(
      process.env["MAGIC_HOUR_POLL_INTERVAL"] || "0.5",
    );

    while (!["complete", "error", "canceled"].includes(apiResponse.status)) {
      await sleep(pollInterval * 1000); // Convert seconds to milliseconds
      apiResponse = await this.get({ id: request.id }, requestOpts);
    }

    if (apiResponse.status !== "complete") {
      const message = `Video project ${request.id} has status ${
        apiResponse.status
      }: ${JSON.stringify(apiResponse.error)}`;
      if (apiResponse.status === "error") {
        getLogger().error(message);
      } else {
        getLogger().info(message);
      }
      return {
        ...apiResponse,
      };
    }

    if (!downloadOutputs) {
      return {
        ...apiResponse,
      };
    }

    const downloadedPaths = await downloadFiles(
      apiResponse.downloads,
      downloadDirectory,
    );

    return {
      ...apiResponse,
      downloadedPaths,
    };
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
