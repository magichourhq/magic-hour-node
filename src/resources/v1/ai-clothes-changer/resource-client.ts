import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/ai-clothes-changer/request-types";
import { Schemas$V1AiClothesChangerCreateBody } from "magic-hour/types/v1-ai-clothes-changer-create-body";
import { Schemas$V1AiClothesChangerCreateResponse } from "magic-hour/types/v1-ai-clothes-changer-create-response";
import { ImageProjectsClient } from "magic-hour/resources/v1/image-projects/resource-client";
import { FilesClient } from "../files";

type GenerateOptions = RequestOptions & {
  /**
   * Whether to wait for the generation to complete before returning the result.
   *
   * @default true
   */
  waitForCompletion?: boolean;
  /**
   * Whether to download the generated outputs to local disk.
   *
   * @default true
   */
  downloadOutputs?: boolean;
  /**
   * The directory to save the downloaded outputs.
   *
   * @default undefined
   */
  downloadDirectory?: string | undefined;
};

export class AiClothesChangerClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * AI Clothes Changer - Generate with automatic polling and downloading
   *
   * Change outfits in photos in seconds with just a photo reference. Each photo costs 25 credits.
   * This method provides a convenient way to create a clothes changer request and automatically
   * wait for completion and download outputs.
   *
   * POST /v1/ai-clothes-changer
   */
  async generate(request: requests.CreateRequest, opts: GenerateOptions = {}) {
    const {
      waitForCompletion = true,
      downloadOutputs = true,
      downloadDirectory = undefined,
      ...createOpts
    } = opts;

    const fileClient = new FilesClient(this._client, this._opts);

    const [uploadedGarmentFilePath, uploadedPersonFilePath] = await Promise.all(
      [
        fileClient.uploadFile(request.assets.garmentFilePath),
        fileClient.uploadFile(request.assets.personFilePath),
      ],
    );

    const requestWithUploadedFiles = {
      ...request,
      assets: {
        ...request.assets,
        garmentFilePath: uploadedGarmentFilePath,
        personFilePath: uploadedPersonFilePath,
      },
    };

    // Create the initial request
    const createResponse = await this.create(
      requestWithUploadedFiles,
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
