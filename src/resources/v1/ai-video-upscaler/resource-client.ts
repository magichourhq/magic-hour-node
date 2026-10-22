import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "make-api-request-js";

import * as requests from "magic-hour/resources/v1/ai-video-upscaler/request-types";
import * as types from "magic-hour/types";
import { Schemas$V1AiVideoUpscalerCreateBody } from "magic-hour/types/v1-ai-video-upscaler-create-body";
import { Schemas$V1AiVideoUpscalerCreateResponse } from "magic-hour/types/v1-ai-video-upscaler-create-response";

export class AiVideoUpscalerClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * AI Video Upscaler
   *
   * **What this API does**
   *
   * Create the same Video Upscaler you can make in the browser, but programmatically, so you can automate it, run it at scale, or connect it to your own app or workflow.
   *
   * **Good for**
   * - Automation and batch processing
   * - Adding video upscaler into apps, pipelines, or tools
   *
   * **How it works (3 steps)**
   * 1) Upload your inputs (video, image, or audio) with [Generate Upload URLs](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls) and copy the `file_path`.
   * 2) Send a request to create a video upscaler job with the basic fields.
   * 3) Check the job status until it's `complete`, then download the result from `downloads`.
   *
   * **Key options**
   * - Inputs: usually a file, sometimes a YouTube link, depending on project type
   * - Resolution: output size and plan requirements vary by workflow and model. Some workflows derive output size from the input video.
   * - Extra fields: e.g. `face_swap_mode`, `start_seconds`/`end_seconds`, or a text prompt
   *
   * **Cost**
   * Credits are charged when the job is queued (`credits_charged` in the response). Tools billed per frame charge an estimate and settle to the frames that actually render once the job finishes; tools billed per second charge the final amount upfront. Failed jobs are refunded.
   *
   * For detailed examples, see the [product page](https://magichour.ai/products/video-upscaler).
   *
   * POST /v1/ai-video-upscaler
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1AiVideoUpscalerCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/ai-video-upscaler",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1AiVideoUpscalerCreateBody.out.parse(request),
      responseSchema: Schemas$V1AiVideoUpscalerCreateResponse.in,
      opts,
    });
  }
}
