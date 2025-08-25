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
import * as requests from "magic-hour/resources/v1/image-projects/request-types";
import { Schemas$V1ImageProjectsGetResponse } from "magic-hour/types/v1-image-projects-get-response";

/**
 * Extended response interface that includes downloaded paths
 */
export interface V1ImageProjectsGetResponseWithDownloads
  extends types.V1ImageProjectsGetResponse {
  /**
   * The paths to the downloaded files.
   * This field is only populated if `download_outputs` is True and the image project is complete.
   */
  downloadedPaths?: string[];
}

export class ImageProjectsClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * Check the result of an image project with optional waiting and downloading.
   *
   * This method retrieves the status of an image project and optionally waits for completion
   * and downloads the output files.
   *
   * @param request - Request object containing the image project ID
   * @param opts - Additional request options
   * @returns The image project response with optional downloaded file paths included
   */
  async checkResult(
    request: requests.GetRequest,
    opts?: GenerateOptions,
  ): Promise<V1ImageProjectsGetResponseWithDownloads> {
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
      const message = `Image project ${request.id} has status ${apiResponse.status}: ${apiResponse.error}`;
      if (apiResponse.status === "error") {
        this._client.logger.error(message);
      } else {
        this._client.logger.info(message);
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
   * Delete image
   *
   * Permanently delete the rendered image(s). This action is not reversible, please be sure before deleting.
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
      opts,
    });
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
}
