import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/animation/request-types";
import { Schemas$V1AnimationCreateBody } from "magic-hour/types/v1-animation-create-body";
import { Schemas$V1AnimationCreateResponse } from "magic-hour/types/v1-animation-create-response";
import { FilesClient } from "magic-hour/resources/v1/files";
import { ImageProjectsClient } from "magic-hour/resources/v1/image-projects";
import {
  GenerateOptions,
  GenerateRequestType,
} from "magic-hour/helpers/generate-type";

type GenerateRequest = GenerateRequestType<
  requests.CreateRequest,
  {
    /** The path of the input audio. This value is either
     * - a direct URL to the image file
     * - a path to a local file
     *
     * Note: if the path begins with `api-assets`, it will be assumed to already be uploaded to Magic Hour's storage, and will not be uploaded again. */
    audioFilePath: string;
    /** An initial image to use a the first frame of the video. This value is either
     * - a direct URL to the image file
     * - a path to a local file
     *
     * Note: if the path begins with `api-assets`, it will be assumed to already be uploaded to Magic Hour's storage, and will not be uploaded again. */
    imageFilePath: string;
  }
>;

export class AnimationClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * AI generate helper with automatic polling and downloading.
   * @example
   * ```ts
   * const result = await client.v1.animation.generate({
   *   assets: {
   *
   *   },
   * });
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

    const { audioFilePath, imageFilePath, ...restAssets } = request.assets;

    const [uploadedAudioFilePath, uploadedImageFilePath] = await Promise.all([
      fileClient.uploadFile(audioFilePath),
      fileClient.uploadFile(imageFilePath),
    ]);

    // Create the initial request
    const createResponse = await this.create(
      {
        ...request,
        assets: {
          ...restAssets,
          audioFilePath: uploadedAudioFilePath,
          imageFilePath: uploadedImageFilePath,
        },
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

    return result;
  }

  /**
   * Animation
   *
   * Create a Animation video. The estimated frame cost is calculated based on the `fps` and `end_seconds` input.
   *
   * POST /v1/animation
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1AnimationCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/animation",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1AnimationCreateBody.out.parse(request),
      responseSchema: Schemas$V1AnimationCreateResponse.in,
      opts,
    });
  }
}
