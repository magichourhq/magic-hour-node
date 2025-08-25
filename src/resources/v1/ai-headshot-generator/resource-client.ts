import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/ai-headshot-generator/request-types";
import { Schemas$V1AiHeadshotGeneratorCreateBody } from "magic-hour/types/v1-ai-headshot-generator-create-body";
import { Schemas$V1AiHeadshotGeneratorCreateResponse } from "magic-hour/types/v1-ai-headshot-generator-create-response";
import { FilesClient } from "magic-hour/resources/v1/files";
import {
  GenerateOptions,
  GenerateRequestType,
} from "magic-hour/helpers/generate-type";
import { downloadFiles } from "magic-hour/helpers/download";
import { ImageProjectsClient } from "magic-hour/resources/v1/image-projects";

type GenerateRequest = GenerateRequestType<
  requests.CreateRequest,
  {
    /**
     * The image used to generate the headshot. This value is either
     * - a direct URL to the image file
     * - a path to a local file
     *
     * Note: if the path begins with `api-assets`, it will be assumed to already be uploaded to Magic Hour's storage, and will not be uploaded again.
     */
    imageFilePath: string;
  }
>;

export class AiHeadshotGeneratorClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * AI Headshots
   *
   * Create an AI headshot
   *
   * This method provides a convenient way to create a request and automatically wait for completion and download outputs.
   *
   * @example
   * ```typescript
   * import Client from "magic-hour";
   *
   * const client = new Client({ token: process.env["API_TOKEN"]!! });
   * const res = await client.v1.aiHeadshotGenerator.generate(
   *   {
   *     assets: { imageFilePath: "/path/to/1234.png" },
   *     name: "Ai Headshot image",
   *   },
   *   {
   *     waitForCompletion: true,
   *     downloadOutputs: true,
   *     downloadDirectory: "outputs",
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

    const { imageFilePath, ...restAssets } = request.assets;

    const [uploadedImageFilePath] = await Promise.all([
      fileClient.uploadFile(imageFilePath),
    ]);

    const createResponse = await this.create(
      {
        ...request,
        assets: {
          ...restAssets,
          imageFilePath: uploadedImageFilePath,
        },
      },
      createOpts,
    );

    const projectsClient = new ImageProjectsClient(this._client, this._opts);

    const result = await projectsClient.checkResult(
      { id: createResponse.id },
      {
        waitForCompletion,
        downloadOutputs,
        downloadDirectory,
        ...createOpts,
      },
    );

    if (downloadOutputs) {
      result.downloadedPaths = await downloadFiles(
        result.downloads,
        downloadDirectory,
      );
    }

    return result;
  }

  /**
   * AI Headshots
   *
   * Create an AI headshot. Each headshot costs 50 credits.
   *
   * POST /v1/ai-headshot-generator
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1AiHeadshotGeneratorCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/ai-headshot-generator",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1AiHeadshotGeneratorCreateBody.out.parse(request),
      responseSchema: Schemas$V1AiHeadshotGeneratorCreateResponse.in,
      opts,
    });
  }
}
