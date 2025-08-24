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
import { FilesClient } from "magic-hour/resources/v1/files";
import { ImageProjectsClient } from "magic-hour/resources/v1/image-projects";
import {
  GenerateOptions,
  GenerateRequestType,
} from "magic-hour/helpers/generate-type";

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
     * The image of the person. This value is either
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
   * AI Clothes Changer - Generate with automatic polling and downloading
   *
   * Change outfits in photos in seconds with just a photo reference. Each photo costs 25 credits.
   * This method provides a convenient way to create a clothes changer request and automatically
   * wait for completion and download outputs.
   *
   * @example
   * ```ts
   * const result = await client.v1.aiClothesChanger.generate({
   *   assets: {
   *     garmentFilePath: "path/to/garment.jpg",
   *     garmentType: "upper_body",
   *     personFilePath: "path/to/person.jpg",
   *   },
   *   name: "my-clothes-changer",
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

    const { garmentFilePath, personFilePath, garmentType } = request.assets;

    const [uploadedGarmentFilePath, uploadedPersonFilePath] = await Promise.all(
      [
        fileClient.uploadFile(garmentFilePath),
        fileClient.uploadFile(personFilePath),
      ],
    );

    // Create the initial request
    const createResponse = await this.create(
      {
        ...request,
        assets: {
          garmentType,
          garmentFilePath: uploadedGarmentFilePath,
          personFilePath: uploadedPersonFilePath,
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
