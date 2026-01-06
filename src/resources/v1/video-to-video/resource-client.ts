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
import { VideoProjectsClient } from "magic-hour/resources/v1/video-projects";
import * as requests from "magic-hour/resources/v1/video-to-video/request-types";
import { Schemas$V1VideoToVideoCreateBody } from "magic-hour/types/v1-video-to-video-create-body";
import { Schemas$V1VideoToVideoCreateResponse } from "magic-hour/types/v1-video-to-video-create-response";

type GenerateRequest = GenerateRequestType<
  requests.CreateRequest,
  {
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

export class VideoToVideoClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * Video-to-Video
   *
   * Create a Video To Video video
   *
   * This method provides a convenient way to create a request and automatically wait for completion and download outputs.
   *
   * @example
   * ```typescript
   * import Client from "magic-hour";
   *
   * const client = new Client({ token: process.env["API_TOKEN"]!! });
   * const res = await client.v1.videoToVideo.generate(
   *   {
   *     assets: { videoFilePath: "/path/to/1234.mp4", videoSource: "file" },
   *     endSeconds: 15.0,
   *     fpsResolution: "HALF",
   *     name: "Video To Video video",
   *     startSeconds: 0.0,
   *     style: {
   *       artStyle: "3D Render",
   *       model: "default",
   *       prompt: "string",
   *       promptType: "default",
   *       version: "default",
   *     },
   *   },
   *   {
   *     waitForCompletion: true,
   *     downloadOutputs: true,
   *     downloadDirectory: "outputs",
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
    const { videoFilePath, ...restAssets } = request.assets;

    if (videoFilePath) {
      getLogger().debug(
        `Uploading file ${videoFilePath} to Magic Hour's storage`,
      );
    }

    const [uploadedVideoFilePath] = await Promise.all([
      videoFilePath
        ? fileClient.uploadFile(videoFilePath)
        : Promise.resolve(videoFilePath),
    ]);

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
          videoFilePath: videoFilePath ? uploadedVideoFilePath : videoFilePath,
        },
      },
      createOpts,
    );

    getLogger().info(`Created VideoToVideoClient project ${createResponse.id}`);

    const projectsClient = new VideoProjectsClient(this._client, this._opts);

    getLogger().debug(
      `Checking result for VideoToVideoClient project ${createResponse.id}`,
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
   * Video-to-Video
   *
   * **What this API does**
   *
   * Create the same Video To Video you can make in the browser, but programmatically, so you can automate it, run it at scale, or connect it to your own app or workflow.
   *
   * **Good for**
   * - Automation and batch processing
   * - Adding video to video into apps, pipelines, or tools
   *
   * **How it works (3 steps)**
   * 1) Upload your inputs (video, image, or audio) with [Generate Upload URLs](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls) and copy the `file_path`.
   * 2) Send a request to create a video to video job with the basic fields.
   * 3) Check the job status until it's `complete`, then download the result from `downloads`.
   *
   * **Key options**
   * - Inputs: usually a file, sometimes a YouTube link, depending on project type
   * - Resolution: free users are limited to 512px; higher plans unlock HD and larger sizes
   * - Extra fields: e.g. `face_swap_mode`, `start_seconds`/`end_seconds`, or a text prompt
   *
   * **Cost**
   * Credits are only charged for the frames that actually render. You'll see an estimate when the job is queued, and the final total after it's done.
   *
   * For detailed examples, see the [product page](https://magichour.ai/products/video-to-video).
   *
   * POST /v1/video-to-video
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1VideoToVideoCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/video-to-video",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1VideoToVideoCreateBody.out.parse(request),
      responseSchema: Schemas$V1VideoToVideoCreateResponse.in,
      opts,
    });
  }
}
