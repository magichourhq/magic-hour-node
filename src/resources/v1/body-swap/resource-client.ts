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
import * as requests from "magic-hour/resources/v1/body-swap/request-types";
import { FilesClient } from "magic-hour/resources/v1/files";
import { ImageProjectsClient } from "magic-hour/resources/v1/image-projects";
import * as types from "magic-hour/types";
import { Schemas$V1BodySwapCreateBody } from "magic-hour/types/v1-body-swap-create-body";
import { Schemas$V1BodySwapCreateResponse } from "magic-hour/types/v1-body-swap-create-response";

type GenerateRequest = GenerateRequestType<
  requests.CreateRequest,
  {
    /**
     * Image of the person to place into the scene. This value is either
     * - a direct URL to the image file
     * - a path to a local file
     *
     * Note: if the path begins with `api-assets`, it will be assumed to already be uploaded to Magic Hour's storage, and will not be uploaded again.
     */
    personFilePath: string;
    /**
     * Target scene image (background). This value is either
     * - a direct URL to the image file
     * - a path to a local file
     *
     * Note: if the path begins with `api-assets`, it will be assumed to already be uploaded to Magic Hour's storage, and will not be uploaded again.
     */
    sceneFilePath: string;
  }
>;

export class BodySwapClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * Body Swap
   *
   * Swap a person into a scene image using Nano Banana 2. Credits depend on `resolution` (from 100 credits at 640px upward).
   *
   * This method provides a convenient way to create a request and automatically wait for completion and download outputs.
   *
   * @example
   * ```typescript
   * import { Client } from "magic-hour";
   *
   * const client = new Client({ token: process.env["API_TOKEN"]!! });
   * const res = await client.v1.bodySwap.generate(
   *   {
   *     assets: {
   *       personFilePath: "/path/to/person.png",
   *       sceneFilePath: "/path/to/scene.png",
   *     },
   *     name: "My Body Swap image",
   *     resolution: "1k",
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
    const { personFilePath, sceneFilePath, ...restAssets } = request.assets;

    getLogger().debug(
      `Uploading file ${personFilePath} to Magic Hour's storage`,
    );
    getLogger().debug(
      `Uploading file ${sceneFilePath} to Magic Hour's storage`,
    );

    const [uploadedPersonFilePath, uploadedSceneFilePath] = await Promise.all([
      fileClient.uploadFile(personFilePath),
      fileClient.uploadFile(sceneFilePath),
    ]);

    getLogger().info(
      `Uploaded file ${personFilePath} to Magic Hour's storage as ${uploadedPersonFilePath}`,
    );
    getLogger().info(
      `Uploaded file ${sceneFilePath} to Magic Hour's storage as ${uploadedSceneFilePath}`,
    );

    const createResponse = await this.create(
      {
        ...request,
        assets: {
          ...restAssets,
          personFilePath: uploadedPersonFilePath,
          sceneFilePath: uploadedSceneFilePath,
        },
      },
      createOpts,
    );

    getLogger().info(`Created BodySwapClient project ${createResponse.id}`);

    const projectsClient = new ImageProjectsClient(this._client, this._opts);

    getLogger().debug(
      `Checking result for BodySwapClient project ${createResponse.id}`,
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
   * Body Swap
   *
   * Swap a person into a scene image using Nano Banana 2. Credits depend on `resolution` (from 100 credits at 640px upward).
   *
   * POST /v1/body-swap
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1BodySwapCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/body-swap",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1BodySwapCreateBody.out.parse(request),
      responseSchema: Schemas$V1BodySwapCreateResponse.in,
      opts,
    });
  }
}
