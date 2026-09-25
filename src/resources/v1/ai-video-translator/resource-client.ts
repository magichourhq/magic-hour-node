import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "make-api-request-js";

import * as requests from "magic-hour/resources/v1/ai-video-translator/request-types";
import * as types from "magic-hour/types";
import { Schemas$V1AiVideoTranslatorCreateBody } from "magic-hour/types/v1-ai-video-translator-create-body";
import { Schemas$V1AiVideoTranslatorCreateResponse } from "magic-hour/types/v1-ai-video-translator-create-response";

export class AiVideoTranslatorClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * AI Video Translator
   *
   * **What this API does**
   *
   * Create the same Video Translator you can make in the browser, but programmatically, so you can automate it, run it at scale, or connect it to your own app or workflow.
   *
   * **Good for**
   * - Automation and batch processing
   * - Adding video translator into apps, pipelines, or tools
   *
   * **How it works (3 steps)**
   * 1) Upload your inputs (video, image, or audio) with [Generate Upload URLs](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls) and copy the `file_path`.
   * 2) Send a request to create a video translator job with the basic fields.
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
   * For detailed examples, see the [product page](https://magichour.ai/products/ai-video-translator).
   *
   * POST /v1/ai-video-translator
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1AiVideoTranslatorCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/ai-video-translator",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1AiVideoTranslatorCreateBody.out.parse(request),
      responseSchema: Schemas$V1AiVideoTranslatorCreateResponse.in,
      opts,
    });
  }
}
