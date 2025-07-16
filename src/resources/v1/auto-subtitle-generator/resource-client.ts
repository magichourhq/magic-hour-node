import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/auto-subtitle-generator/request-types";
import { Schemas$V1AutoSubtitleGeneratorCreateBody } from "magic-hour/types/v1-auto-subtitle-generator-create-body";
import { Schemas$V1AutoSubtitleGeneratorCreateResponse } from "magic-hour/types/v1-auto-subtitle-generator-create-response";

export class AutoSubtitleGeneratorClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }
  /**
   * Auto Subtitle Generator
   *
   * Automatically generate subtitles for your video in multiple languages.
   *
   * POST /v1/auto-subtitle-generator
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1AutoSubtitleGeneratorCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/auto-subtitle-generator",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1AutoSubtitleGeneratorCreateBody.out.parse(request),
      responseSchema: Schemas$V1AutoSubtitleGeneratorCreateResponse.in,
      opts,
    });
  }
}
