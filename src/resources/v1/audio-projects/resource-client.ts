import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "make-api-request-js";

import { types } from "magic-hour";
import { downloadFiles } from "magic-hour/helpers/download";
import { GenerateOptions } from "magic-hour/helpers/generate-type";
import { sleep } from "magic-hour/helpers/sleep";
import { getLogger } from "magic-hour/logger";
import * as requests from "magic-hour/resources/v1/audio-projects/request-types";
import { Schemas$V1AudioProjectsGetResponse } from "magic-hour/types/v1-audio-projects-get-response";

/**
 * Extended response interface that includes downloaded paths
 */
export interface V1AudioProjectsGetResponseWithDownloads
  extends types.V1AudioProjectsGetResponse {
  /**
   * The paths to the downloaded files.
   * This field is only populated if `download_outputs` is True and the audio project is complete.
   */
  downloadedPaths?: string[];
}

export class AudioProjectsClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * Check the result of an audio project with optional waiting and downloading.
   *
   * This method retrieves the status of an audio project and optionally waits for completion
   * and downloads the output files.
   *
   * @param request - Request object containing the audio project ID
   * @param opts - Additional request options
   * @returns The audio project response with optional downloaded file paths included
   */
  async checkResult(
    request: requests.GetRequest,
    opts?: GenerateOptions,
  ): Promise<V1AudioProjectsGetResponseWithDownloads> {
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

    getLogger().debug(
      `Polling audio project ${request.id} every ${pollInterval} seconds`,
    );

    while (!["complete", "error", "canceled"].includes(apiResponse.status)) {
      await sleep(pollInterval * 1000); // Convert seconds to milliseconds
      getLogger().info(
        `Audio project ${request.id} status: ${apiResponse.status}, waiting for ${pollInterval} seconds and checking again`,
      );
      apiResponse = await this.get({ id: request.id }, requestOpts);
    }

    if (apiResponse.status !== "complete") {
      if (apiResponse.status === "error") {
        const message = `Audio project ${request.id} has status ${apiResponse.status}: [${apiResponse.error?.code}] ${apiResponse.error?.message}`;
        getLogger().error(message);
      } else {
        getLogger().info(
          `Audio project ${request.id} has status ${apiResponse.status}. Stopping polling.`,
        );
      }
      return {
        ...apiResponse,
      };
    }

    if (!downloadOutputs) {
      getLogger().info(
        `Download outputs is disabled. Returning audio project ${request.id} with status ${apiResponse.status}`,
      );
      return {
        ...apiResponse,
      };
    }

    getLogger().debug(
      `Downloading outputs for audio project ${request.id} to ${
        downloadDirectory ?? "current directory"
      }`,
    );

    const downloadedPaths = await downloadFiles(
      apiResponse.downloads,
      downloadDirectory,
    );

    getLogger().info(
      `Downloaded outputs for audio project ${request.id} to ${downloadedPaths}`,
    );

    return {
      ...apiResponse,
      downloadedPaths,
    };
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
   * Check the progress of a audio project. The `downloads` field is populated after a successful render.
   *
   * **Statuses**
   * - `queued` — waiting to start
   * - `rendering` — in progress
   * - `complete` — ready; see `downloads`
   * - `error` — a failure occurred (see `error`)
   * - `canceled` — user canceled
   * - `draft` — not used
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
