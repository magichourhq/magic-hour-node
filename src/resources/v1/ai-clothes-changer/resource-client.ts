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
import * as requests from "magic-hour/resources/v1/ai-clothes-changer/request-types";
import { FilesClient } from "magic-hour/resources/v1/files";
import { ImageProjectsClient } from "magic-hour/resources/v1/image-projects";
import { Schemas$V1AiClothesChangerCreateBody } from "magic-hour/types/v1-ai-clothes-changer-create-body";
import { Schemas$V1AiClothesChangerCreateResponse } from "magic-hour/types/v1-ai-clothes-changer-create-response";

type GenerateRequest = GenerateRequestType<
  requests.CreateRequest,
  {
    /**
     * The image of the outfit. This value is either
     * - a direct URL to the image file
     * - a path to a local file
     *
     * Note: if the path begins with `api-assets`, it will be assumed to already be uploaded to Magic Hour's storage, and will not be uploaded again.
     */
    garmentFilePath: string;
    /**
     * The image with the person. This value is either
     * - a direct URL to the image file
     * - a path to a local file
     *
     * Note: if the path begins with `api-assets`, it will be assumed to already be uploaded to Magic Hour's storage, and will not be uploaded again.
     */
    personFilePath: string;
  }
>;

export class AiClothesChangerClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * AI Clothes Changer
   *
   * Change outfits in photos in seconds with just a photo reference
   *
   * This method provides a convenient way to create a request and automatically wait for completion and download outputs.
   *
   * @example
   * ```typescript
   * import { Client } from "magic-hour";
   *
   * const client = new Client({ token: process.env["API_TOKEN"]!! });
   * const res = await client.v1.aiClothesChanger.generate(
   *   {
   *     assets: {
   *       garmentFilePath: "/path/to/outfit.png",
   *       garmentType: "upper_body",
   *       personFilePath: "/path/to/model.png",
   *     },
   *     name: "Clothes Changer image",
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
    const { garmentFilePath, personFilePath, ...restAssets } = request.assets;

    getLogger().debug(
      `Uploading file ${garmentFilePath} to Magic Hour's storage`,
    );
    getLogger().debug(
      `Uploading file ${personFilePath} to Magic Hour's storage`,
    );

    const [uploadedGarmentFilePath, uploadedPersonFilePath] = await Promise.all(
      [
        fileClient.uploadFile(garmentFilePath),
        fileClient.uploadFile(personFilePath),
      ],
    );

    getLogger().info(
      `Uploaded file ${garmentFilePath} to Magic Hour's storage as ${uploadedGarmentFilePath}`,
    );
    getLogger().info(
      `Uploaded file ${personFilePath} to Magic Hour's storage as ${uploadedPersonFilePath}`,
    );

    const createResponse = await this.create(
      {
        ...request,
        assets: {
          ...restAssets,
          garmentFilePath: uploadedGarmentFilePath,
          personFilePath: uploadedPersonFilePath,
        },
      },
      createOpts,
    );

    getLogger().info(
      `Created AiClothesChangerClient project ${createResponse.id}`,
    );

    const projectsClient = new ImageProjectsClient(this._client, this._opts);

    getLogger().debug(
      `Checking result for AiClothesChangerClient project ${createResponse.id}`,
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
   * AI Clothes Changer
   *
   * Change outfits in photos in seconds with just a photo reference. Each photo costs 25 credits.
   *
   * POST /v1/ai-clothes-changer
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1AiClothesChangerCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/ai-clothes-changer",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1AiClothesChangerCreateBody.out.parse(request),
      responseSchema: Schemas$V1AiClothesChangerCreateResponse.in,
      opts,
    });
  }
}
