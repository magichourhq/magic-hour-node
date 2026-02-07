import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "make-api-request-js";

import { types } from "magic-hour";
import {
  GenerateOptions,
  GenerateRequestType,
} from "magic-hour/helpers/generate-type";
import { getLogger } from "magic-hour/logger";
import { FilesClient } from "magic-hour/resources/v1/files";
import * as requests from "magic-hour/resources/v1/lip-sync/request-types";
import { VideoProjectsClient } from "magic-hour/resources/v1/video-projects";
import { Schemas$V1LipSyncCreateBody } from "magic-hour/types/v1-lip-sync-create-body";
import { Schemas$V1LipSyncCreateResponse } from "magic-hour/types/v1-lip-sync-create-response";

type GenerateRequest = GenerateRequestType<
  requests.CreateRequest,
  {
    /**
     * The path of the audio file. This value is either
     * - a direct URL to the image file
     * - a path to a local file
     *
     * Note: if the path begins with `api-assets`, it will be assumed to already be uploaded to Magic Hour's storage, and will not be uploaded again.
     */
    audioFilePath: string;
    /**
     * Required if `video_source` is `file`. This value is either
     * - a direct URL to the image file
     * - a path to a local file
     *
     * Note: if the path begins with `api-assets`, it will be assumed to already be uploaded to Magic Hour's storage, and will not be uploaded again.
     */
    videoFilePath?: string | undefined;
  }
>;

export class LipSyncClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * Lip Sync
   *
   * Create a Lip Sync video
   *
   * This method provides a convenient way to create a request and automatically wait for completion and download outputs.
   *
   * @example
   * ```typescript
   * import { Client } from "magic-hour";
   *
   * const client = new Client({ token: process.env["API_TOKEN"]!! });
   * const res = await client.v1.lipSync.generate(
   *   {
   *     assets: {
   *       audioFilePath: "/path/to/1234.mp3",
   *       videoFilePath: "/path/to/1234.mp4",
   *       videoSource: "file",
   *     },
   *     endSeconds: 15.0,
   *     maxFpsLimit: 12.0,
   *     name: "Lip Sync video",
   *     startSeconds: 0.0,
   *   },
   *   {
   *     waitForCompletion: true,
   *     downloadOutputs: true,
   *     downloadDirectory: ".",
   *   },
   * );
   * ```
   */
  async generate(request: GenerateRequest, opts: GenerateOptions = {}) {
    const {
      waitForCompletion = true,
      downloadOutputs = true,
      downloadDirectory = undefined,
      ...createOpts
    } = opts;

    const fileClient = new FilesClient(this._client, this._opts);
    const { audioFilePath, videoFilePath, ...restAssets } = request.assets;

    getLogger().debug(
      `Uploading file ${audioFilePath} to Magic Hour's storage`,
    );
    if (videoFilePath) {
      getLogger().debug(
        `Uploading file ${videoFilePath} to Magic Hour's storage`,
      );
    }

    const [uploadedAudioFilePath, uploadedVideoFilePath] = await Promise.all([
      fileClient.uploadFile(audioFilePath),
      videoFilePath
        ? fileClient.uploadFile(videoFilePath)
        : Promise.resolve(videoFilePath),
    ]);

    getLogger().info(
      `Uploaded file ${audioFilePath} to Magic Hour's storage as ${uploadedAudioFilePath}`,
    );
    if (videoFilePath) {
      getLogger().info(
        `Uploaded file ${videoFilePath} to Magic Hour's storage as ${uploadedVideoFilePath}`,
      );
    }

    const createResponse = await this.create(
      {
        ...request,
        assets: {
          ...restAssets,
          audioFilePath: uploadedAudioFilePath,
          videoFilePath: videoFilePath ? uploadedVideoFilePath : videoFilePath,
        },
      },
      createOpts,
    );

    getLogger().info(`Created LipSyncClient project ${createResponse.id}`);

    const projectsClient = new VideoProjectsClient(this._client, this._opts);

    getLogger().debug(
      `Checking result for LipSyncClient project ${createResponse.id}`,
    );

    const result = await projectsClient.checkResult(
      { id: createResponse.id },
      {
        waitForCompletion,
        downloadOutputs,
        downloadDirectory,
        ...createOpts,
      },
    );

    return result;
  }

  /**
   * Lip Sync
   *
   * **What this API does**
   *
   * Create the same Lip Sync you can make in the browser, but programmatically, so you can automate it, run it at scale, or connect it to your own app or workflow.
   *
   * **Good for**
   * - Automation and batch processing
   * - Adding lip sync into apps, pipelines, or tools
   *
   * **How it works (3 steps)**
   * 1) Upload your inputs (video, image, or audio) with [Generate Upload URLs](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls) and copy the `file_path`.
   * 2) Send a request to create a lip sync job with the basic fields.
   * 3) Check the job status until it's `complete`, then download the result from `downloads`.
   *
   * **Key options**
   * - Inputs: usually a file, sometimes a YouTube link, depending on project type
   * - Resolution: free users are limited to 576px; higher plans unlock HD and larger sizes
   * - Extra fields: e.g. `face_swap_mode`, `start_seconds`/`end_seconds`, or a text prompt
   *
   * **Cost**
   * Credits are only charged for the frames that actually render. You'll see an estimate when the job is queued, and the final total after it's done.
   *
   * For detailed examples, see the [product page](https://magichour.ai/products/lip-sync).
   *
   * POST /v1/lip-sync
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1LipSyncCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/lip-sync",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1LipSyncCreateBody.out.parse(request),
      responseSchema: Schemas$V1LipSyncCreateResponse.in,
      opts,
    });
  }
}
