import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/text-to-video/request-types";
import { Schemas$V1TextToVideoCreateBody } from "magic-hour/types/v1-text-to-video-create-body";
import { Schemas$V1TextToVideoCreateResponse } from "magic-hour/types/v1-text-to-video-create-response";
import { FilesClient } from "magic-hour/resources/v1/files";
import { ImageProjectsClient } from "magic-hour/resources/v1/image-projects";
import {
  GenerateOptions,
  GenerateRequestType,
} from "magic-hour/helpers/generate-type";
import { downloadFiles } from "magic-hour/helpers/download";

type GenerateRequest = GenerateRequestType<requests.CreateRequest, {}>;

export class TextToVideoClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * Text-to-Video
   *
   * Create a Text To Video video - Generate with automatic polling and downloading
   *
   * - This method provides a convenient way to create a request and automatically wait for completion and download outputs.
   *
   */
  async generate(request: GenerateRequest, opts: GenerateOptions = {}) {
    const {
      waitForCompletion = true,
      downloadOutputs = true,
      downloadDirectory = undefined,
      ...createOpts
    } = opts;

    // Create the initial request
    const createResponse = await this.create(
      {
        ...request,
      },
      createOpts,
    );

    // Create image projects client to check result
    const imageProjectsClient = new ImageProjectsClient(
      this._client,
      this._opts,
    );

    const result = await imageProjectsClient.checkResult(
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
   * Text-to-Video
   *
   * Create a Text To Video video. The estimated frame cost is calculated using 30 FPS. This amount is deducted from your account balance when a video is queued. Once the video is complete, the cost will be updated based on the actual number of frames rendered.
   *
   * Get more information about this mode at our [product page](https://magichour.ai/products/text-to-video).
   *
   *
   * POST /v1/text-to-video
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1TextToVideoCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/text-to-video",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1TextToVideoCreateBody.out.parse(request),
      responseSchema: Schemas$V1TextToVideoCreateResponse.in,
      opts,
    });
  }
}
