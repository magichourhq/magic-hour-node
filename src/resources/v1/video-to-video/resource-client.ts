import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/video-to-video/request-types";
import { Schemas$V1VideoToVideoCreateBody } from "magic-hour/types/v1-video-to-video-create-body";
import { Schemas$V1VideoToVideoCreateResponse } from "magic-hour/types/v1-video-to-video-create-response";
import { FilesClient } from "magic-hour/resources/v1/files";
import {
  GenerateOptions,
  GenerateRequestType,
} from "magic-hour/helpers/generate-type";
import { downloadFiles } from "magic-hour/helpers/download";
import { VideoProjectsClient } from "magic-hour/resources/v1/video-projects";

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
    videoFilePath: string;
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

    const [uploadedVideoFilePath] = await Promise.all([
      fileClient.uploadFile(videoFilePath),
    ]);

    const createResponse = await this.create(
      {
        ...request,
        assets: {
          ...restAssets,
          videoFilePath: uploadedVideoFilePath,
        },
      },
      createOpts,
    );

    const projectsClient = new VideoProjectsClient(this._client, this._opts);

    const result = await projectsClient.checkResult(
      { id: createResponse.id },
      {
        waitForCompletion,
        downloadOutputs,
        downloadDirectory,
        ...createOpts,
      },
    );

    if (downloadOutputs) {
      result.downloadedPaths = await downloadFiles(
        result.downloads,
        downloadDirectory,
      );
    }

    return result;
  }

  /**
   * Video-to-Video
   *
   * Create a Video To Video video. The estimated frame cost is calculated using 30 FPS. This amount is deducted from your account balance when a video is queued. Once the video is complete, the cost will be updated based on the actual number of frames rendered.
   *
   * Get more information about this mode at our [product page](https://magichour.ai/products/video-to-video).
   *
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
