import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "make-api-request-js";

import {
  GenerateOptions,
  GenerateRequestType,
} from "magic-hour/helpers/generate-type";
import { getLogger } from "magic-hour/logger";
import * as requests from "magic-hour/resources/v1/character-replace/request-types";
import { FilesClient } from "magic-hour/resources/v1/files";
import { VideoProjectsClient } from "magic-hour/resources/v1/video-projects";
import * as types from "magic-hour/types";
import { Schemas$V1CharacterReplaceCreateBody } from "magic-hour/types/v1-character-replace-create-body";
import { Schemas$V1CharacterReplaceCreateResponse } from "magic-hour/types/v1-character-replace-create-response";

type GenerateRequest = GenerateRequestType<
  requests.CreateRequest,
  {
    /**
     * Reference character image used as the replacement or animation target. This value is either
     * - a direct URL to the image file
     * - a path to a local file
     *
     * Note: if the path begins with `api-assets`, it will be assumed to already be uploaded to Magic Hour's storage, and will not be uploaded again.
     */
    imageFilePath: string;
    /**
     * Source video containing the subject to replace or animate. This value is either
     * - a direct URL to the video file
     * - a path to a local file
     *
     * Note: if the path begins with `api-assets`, it will be assumed to already be uploaded to Magic Hour's storage, and will not be uploaded again.
     */
    videoFilePath: string;
  }
>;

export class CharacterReplaceClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * Character Replace
   *
   * Create a Character Replace video
   *
   * This method provides a convenient way to create a request and automatically wait for completion and download outputs.
   *
   * @example
   * ```typescript
   * import { Client } from "magic-hour";
   *
   * const client = new Client({ token: process.env["API_TOKEN"]!! });
   * const res = await client.v1.characterReplace.generate(
   *   {
   *     assets: {
   *       imageFilePath: "/path/to/5678.png",
   *       videoFilePath: "/path/to/1234.mp4",
   *     },
   *     endSeconds: 15.0,
   *     name: "My Character Replace video",
   *     resolution: "720p",
   *     startSeconds: 0.0,
   *     style: { mode: "replace", selectionMode: "auto" },
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
    const { imageFilePath, videoFilePath, ...restAssets } = request.assets;

    getLogger().debug(
      `Uploading file ${imageFilePath} to Magic Hour's storage`,
    );
    getLogger().debug(
      `Uploading file ${videoFilePath} to Magic Hour's storage`,
    );

    const [uploadedImageFilePath, uploadedVideoFilePath] = await Promise.all([
      fileClient.uploadFile(imageFilePath),
      fileClient.uploadFile(videoFilePath),
    ]);

    getLogger().info(
      `Uploaded file ${imageFilePath} to Magic Hour's storage as ${uploadedImageFilePath}`,
    );
    getLogger().info(
      `Uploaded file ${videoFilePath} to Magic Hour's storage as ${uploadedVideoFilePath}`,
    );

    const createResponse = await this.create(
      {
        ...request,
        assets: {
          ...restAssets,
          imageFilePath: uploadedImageFilePath,
          videoFilePath: uploadedVideoFilePath,
        },
      },
      createOpts,
    );

    getLogger().info(
      `Created CharacterReplaceClient project ${createResponse.id}`,
    );

    const projectsClient = new VideoProjectsClient(this._client, this._opts);

    getLogger().debug(
      `Checking result for CharacterReplaceClient project ${createResponse.id}`,
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
   * Character Replace
   *
   * **What this API does**
   *
   * Create the same Character Replace you can make in the browser, but programmatically, so you can automate it, run it at scale, or connect it to your own app or workflow.
   *
   * **Good for**
   * - Automation and batch processing
   * - Adding character replace into apps, pipelines, or tools
   *
   * **How it works (3 steps)**
   * 1) Upload your inputs (video, image, or audio) with [Generate Upload URLs](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls) and copy the `file_path`.
   * 2) Send a request to create a character replace job with the basic fields.
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
   * For detailed examples, see the [product page](https://magichour.ai/products/character-replace).
   *
   * POST /v1/character-replace
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1CharacterReplaceCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/character-replace",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1CharacterReplaceCreateBody.out.parse(request),
      responseSchema: Schemas$V1CharacterReplaceCreateResponse.in,
      opts,
    });
  }
}
