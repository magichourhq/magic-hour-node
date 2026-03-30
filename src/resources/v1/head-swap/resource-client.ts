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
import { FilesClient } from "magic-hour/resources/v1/files";
import * as requests from "magic-hour/resources/v1/head-swap/request-types";
import { ImageProjectsClient } from "magic-hour/resources/v1/image-projects";
import * as types from "magic-hour/types";
import { Schemas$V1HeadSwapCreateBody } from "magic-hour/types/v1-head-swap-create-body";
import { Schemas$V1HeadSwapCreateResponse } from "magic-hour/types/v1-head-swap-create-response";

type GenerateRequest = GenerateRequestType<
  requests.CreateRequest,
  {
    /**
     * Image that receives the swapped head. This value is either
     * - a direct URL to the image file
     * - a path to a local file
     *
     * Note: if the path begins with `api-assets`, it will be assumed to already be uploaded to Magic Hour's storage, and will not be uploaded again.
     */
    bodyFilePath: string;
    /**
     * Image of the head to place on the body. This value is either
     * - a direct URL to the image file
     * - a path to a local file
     *
     * Note: if the path begins with `api-assets`, it will be assumed to already be uploaded to Magic Hour's storage, and will not be uploaded again.
     */
    headFilePath: string;
  }
>;

export class HeadSwapClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * Head Swap
   *
   * Swap a head onto a body image
   *
   * This method provides a convenient way to create a request and automatically wait for completion and download outputs.
   *
   * @example
   * ```typescript
   * import { Client } from "magic-hour";
   *
   * const client = new Client({ token: process.env["API_TOKEN"]!! });
   * const res = await client.v1.headSwap.generate(
   *   {
   *     assets: {
   *       bodyFilePath: "/path/to/body.png",
   *       headFilePath: "/path/to/head.png",
   *     },
   *     maxResolution: 1024,
   *     name: "My Head Swap image",
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
    const { bodyFilePath, headFilePath, ...restAssets } = request.assets;

    getLogger().debug(`Uploading file ${bodyFilePath} to Magic Hour's storage`);
    getLogger().debug(`Uploading file ${headFilePath} to Magic Hour's storage`);

    const [uploadedBodyFilePath, uploadedHeadFilePath] = await Promise.all([
      fileClient.uploadFile(bodyFilePath),
      fileClient.uploadFile(headFilePath),
    ]);

    getLogger().info(
      `Uploaded file ${bodyFilePath} to Magic Hour's storage as ${uploadedBodyFilePath}`,
    );
    getLogger().info(
      `Uploaded file ${headFilePath} to Magic Hour's storage as ${uploadedHeadFilePath}`,
    );

    const createResponse = await this.create(
      {
        ...request,
        assets: {
          ...restAssets,
          bodyFilePath: uploadedBodyFilePath,
          headFilePath: uploadedHeadFilePath,
        },
      },
      createOpts,
    );

    getLogger().info(`Created HeadSwapClient project ${createResponse.id}`);

    const projectsClient = new ImageProjectsClient(this._client, this._opts);

    getLogger().debug(
      `Checking result for HeadSwapClient project ${createResponse.id}`,
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
   * Head Swap
   *
   * Swap a head onto a body image. Each image costs 10 credits. Output resolution depends on your subscription; you may set `max_resolution` lower than your plan maximum if desired.
   *
   * POST /v1/head-swap
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1HeadSwapCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/head-swap",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1HeadSwapCreateBody.out.parse(request),
      responseSchema: Schemas$V1HeadSwapCreateResponse.in,
      opts,
    });
  }
}
