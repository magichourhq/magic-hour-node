import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
  ResourceClientOptions,
} from "magic-hour/core";
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
   * Create a list of urls used to upload the assets needed to generate a video. Each video type has their own requirements on what assets are required. Please refer to the specific mode API for more details. The response array will be in the same order as the request body.
   *
   * Below is the list of valid extensions for each asset type:
   *
   * - video: mp4, m4v, mov, webm
   * - audio: mp3, mpeg, wav, aac, aiff, flac
   * - image: png, jpg, jpeg, webp, avif, jp2, tiff, bmp
   *
   * Note: `.gif` is supported for face swap API `video_file_path` field.
   *
   * After receiving the upload url, you can upload the file by sending a PUT request.
   *
   * For example using curl
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
