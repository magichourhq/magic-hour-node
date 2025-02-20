import { types } from "magic-hour";
import {
  ApiPromise,
  CoreClient,
  CoreResourceClient,
  RequestOptions,
} from "magic-hour/core";
import * as requests from "magic-hour/resources/v1/files/upload-urls/request-types";
import { Schemas$PostV1FilesUploadUrlsBody } from "magic-hour/types/post-v1-files-upload-urls-body";
import { Schemas$PostV1FilesUploadUrlsResponse } from "magic-hour/types/post-v1-files-upload-urls-response";

export class UploadUrlsClient extends CoreResourceClient {
  constructor(client: CoreClient) {
    super(client);
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
   * After receiving the upload url, you can upload the file by sending a PUT request with the header `'Content-Type: application/octet-stream'`.
   *
   * For example using curl
   *
   * ```
   * curl -X PUT -H 'Content-Type: application/octet-stream' \
   *   --data '@/path/to/file/video.mp4' \
   *   https://videos.magichour.ai/api-assets/id/video.mp4?auth-value=1234567890
   * ```
   *
   *
   * POST /v1/files/upload-urls
   */
  create(
    request: requests.CreateRequest,
    opts?: RequestOptions,
  ): ApiPromise<types.PostV1FilesUploadUrlsResponse> {
    return this._client.makeRequest({
      method: "post",
      path: "/v1/files/upload-urls",
      auth: ["bearerAuth"],
      contentType: "application/json",
      body: Schemas$PostV1FilesUploadUrlsBody.out.parse(request),
      responseSchema: Schemas$PostV1FilesUploadUrlsResponse.in,
      opts,
    });
  }
}
