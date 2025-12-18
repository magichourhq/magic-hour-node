import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "make-api-request-js";

import { types } from "magic-hour";
import * as requests from "magic-hour/resources/v1/files/upload-urls/request-types";
import { Schemas$V1FilesUploadUrlsCreateBody } from "magic-hour/types/v1-files-upload-urls-create-body";
import { Schemas$V1FilesUploadUrlsCreateResponse } from "magic-hour/types/v1-files-upload-urls-create-response";

export class UploadUrlsClient extends CoreResourceClient {
  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
  }

  /**
   * Generate asset upload urls
   *
   * Generates a list of pre-signed upload URLs for the assets required. This API is only necessary if you want to upload to Magic Hour's storage. Refer to the [Input Files Guide](/integration/input-files) for more details.
   *
   * The response array will match the order of items in the request body.
   *
   * **Valid file extensions per asset type**:
   * - video: mp4, m4v, mov, webm
   * - audio: mp3, wav, aac, flac, webm
   * - image: png, jpg, jpeg, heic, webp, avif, jp2, tiff, bmp
   * - gif: gif, webp, webm
   *
   * > Note: `gif` is only supported for face swap API `video_file_path` field.
   *
   * Once you receive an upload URL, send a `PUT` request to upload the file directly.
   *
   * Example:
   *
   * ```
   * curl -X PUT --data '@/path/to/file/video.mp4' \
   *   https://videos.magichour.ai/api-assets/id/video.mp4?<auth params from the API response>
   * ```
   *
   *
   * POST /v1/files/upload-urls
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.V1FilesUploadUrlsCreateResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/files/upload-urls",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$V1FilesUploadUrlsCreateBody.out.parse(request),
      responseSchema: Schemas$V1FilesUploadUrlsCreateResponse.in,
      opts,
    });
  }
}
