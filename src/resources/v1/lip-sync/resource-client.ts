import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/lip-sync/request-types";
import { Schemas$V1LipSyncCreateBody } from "magic-hour/types/v1-lip-sync-create-body";
import { Schemas$V1LipSyncCreateResponse } from "magic-hour/types/v1-lip-sync-create-response";
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
    /** The path of the audio file. This value is either
     * - a direct URL to the image file
     * - a path to a local file
     *
     * Note: if the path begins with `api-assets`, it will be assumed to already be uploaded to Magic Hour's storage, and will not be uploaded again. */
    audioFilePath: string;
    /** Required if `video_source` is `file`. This value is either
     * - a direct URL to the image file
     * - a path to a local file
     *
     * Note: if the path begins with `api-assets`, it will be assumed to already be uploaded to Magic Hour's storage, and will not be uploaded again. */
    videoFilePath: string;
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

    const [uploadedAudioFilePath, uploadedVideoFilePath] = await Promise.all([
      fileClient.uploadFile(audioFilePath),
      fileClient.uploadFile(videoFilePath),
    ]);

    // Create the initial request
    const createResponse = await this.create(
      {
        ...request,
        assets: {
          ...restAssets,
          audioFilePath: uploadedAudioFilePath,
          videoFilePath: uploadedVideoFilePath,
        },
      },
      createOpts,
    );

    // Create projects client to check result
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
   * Lip Sync
   *
   * Create a Lip Sync video. The estimated frame cost is calculated using 30 FPS. This amount is deducted from your account balance when a video is queued. Once the video is complete, the cost will be updated based on the actual number of frames rendered.
   *
   * Get more information about this mode at our [product page](https://magichour.ai/products/lip-sync).
   *
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
