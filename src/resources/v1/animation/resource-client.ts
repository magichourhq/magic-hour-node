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
import * as requests from "magic-hour/resources/v1/animation/request-types";
import { FilesClient } from "magic-hour/resources/v1/files";
import { VideoProjectsClient } from "magic-hour/resources/v1/video-projects";
import { Schemas$V1AnimationCreateBody } from "magic-hour/types/v1-animation-create-body";
import { Schemas$V1AnimationCreateResponse } from "magic-hour/types/v1-animation-create-response";

type GenerateRequest = GenerateRequestType<
  requests.CreateRequest,
  {
    /**
     * The path of the input audio. This value is either
     * - a direct URL to the image file
     * - a path to a local file
     *
     * Note: if the path begins with `api-assets`, it will be assumed to already be uploaded to Magic Hour's storage, and will not be uploaded again.
     */
    audioFilePath?: string | undefined;
    /**
     * An initial image to use a the first frame of the video. This value is either
     * - a direct URL to the image file
     * - a path to a local file
     *
     * Note: if the path begins with `api-assets`, it will be assumed to already be uploaded to Magic Hour's storage, and will not be uploaded again.
     */
    imageFilePath?: string | undefined;
  }
>;

export class AnimationClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * Animation
   *
   * Create a Animation video
   *
   * This method provides a convenient way to create a request and automatically wait for completion and download outputs.
   *
   * @example
   * ```typescript
   * import { Client } from "magic-hour";
   *
   * const client = new Client({ token: process.env["API_TOKEN"]!! });
   * const res = await client.v1.animation.generate(
   *   {
   *     assets: {
   *       audioFilePath: "/path/to/1234.mp3",
   *       audioSource: "file",
   *       imageFilePath: "/path/to/1234.png",
   *     },
   *     endSeconds: 15.0,
   *     fps: 12.0,
   *     height: 960,
   *     name: "Animation video",
   *     style: {
   *       artStyle: "Painterly Illustration",
   *       cameraEffect: "Simple Zoom In",
   *       prompt: "Cyberpunk city",
   *       promptType: "custom",
   *       transitionSpeed: 5,
   *     },
   *     width: 512,
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
    const { audioFilePath, imageFilePath, ...restAssets } = request.assets;

    if (audioFilePath) {
      getLogger().debug(
        `Uploading file ${audioFilePath} to Magic Hour's storage`,
      );
    }
    if (imageFilePath) {
      getLogger().debug(
        `Uploading file ${imageFilePath} to Magic Hour's storage`,
      );
    }

    const [uploadedAudioFilePath, uploadedImageFilePath] = await Promise.all([
      audioFilePath
        ? fileClient.uploadFile(audioFilePath)
        : Promise.resolve(audioFilePath),
      imageFilePath
        ? fileClient.uploadFile(imageFilePath)
        : Promise.resolve(imageFilePath),
    ]);

    if (audioFilePath) {
      getLogger().info(
        `Uploaded file ${audioFilePath} to Magic Hour's storage as ${uploadedAudioFilePath}`,
      );
    }
    if (imageFilePath) {
      getLogger().info(
        `Uploaded file ${imageFilePath} to Magic Hour's storage as ${uploadedImageFilePath}`,
      );
    }

    const createResponse = await this.create(
      {
        ...request,
        assets: {
          ...restAssets,
          audioFilePath: audioFilePath ? uploadedAudioFilePath : audioFilePath,
          imageFilePath: imageFilePath ? uploadedImageFilePath : imageFilePath,
        },
      },
      createOpts,
    );

    getLogger().info(`Created AnimationClient project ${createResponse.id}`);

    const projectsClient = new VideoProjectsClient(this._client, this._opts);

    getLogger().debug(
      `Checking result for AnimationClient project ${createResponse.id}`,
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
