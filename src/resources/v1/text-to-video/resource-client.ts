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
import * as requests from "magic-hour/resources/v1/text-to-video/request-types";
import { VideoProjectsClient } from "magic-hour/resources/v1/video-projects";
import { Schemas$V1TextToVideoCreateBody } from "magic-hour/types/v1-text-to-video-create-body";
import { Schemas$V1TextToVideoCreateResponse } from "magic-hour/types/v1-text-to-video-create-response";

type GenerateRequest = GenerateRequestType<requests.CreateRequest, {}>;

export class TextToVideoClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * Text-to-Video
   *
   * Create a Text To Video video
   *
   * This method provides a convenient way to create a request and automatically wait for completion and download outputs.
   *
   * @example
   * ```typescript
   * import Client from "magic-hour";
   *
   * const client = new Client({ token: process.env["API_TOKEN"]!! });
   * const res = await client.v1.textToVideo.generate(
   *   {
   *     endSeconds: 5.0,
   *     name: "Text To Video video",
   *     orientation: "landscape",
   *     resolution: "720p",
   *     style: { prompt: "a dog running" },
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

    const createResponse = await this.create(request, createOpts);

    getLogger().info(`Created TextToVideoClient project ${createResponse.id}`);

    const projectsClient = new VideoProjectsClient(this._client, this._opts);

    getLogger().debug(
      `Checking result for TextToVideoClient project ${createResponse.id}`,
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
   * Text-to-Video
   *
   * **What this API does**
   *
   * Create the same Text To Video you can make in the browser, but programmatically, so you can automate it, run it at scale, or connect it to your own app or workflow.
   *
   * **Good for**
   * - Automation and batch processing
   * - Adding text to video into apps, pipelines, or tools
   *
   * **How it works (3 steps)**
   * 1) Upload your inputs (video, image, or audio) with [Generate Upload URLs](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls) and copy the `file_path`.
   * 2) Send a request to create a text to video job with the basic fields.
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
   * For detailed examples, see the [product page](https://magichour.ai/products/text-to-video).
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
