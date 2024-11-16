/**
 * Generated by Sideko (sideko.dev)
 **/

import { types } from "magic-hour";

export type PostV1FaceSwapBody = {
  /**
   * Provide the assets for face swap. For video, The &#x60;video_source&#x60; field determines whether &#x60;video_file_path&#x60; or &#x60;youtube_url&#x60; field is used
   */
  assets: types.PostV1FaceSwapBodyAssets;
  /**
   * The end time of the input video in seconds
   */
  end_seconds: number;
  /**
   * The height of the final output video. The maximum height depends on your subscription. Please refer to our [pricing page](https://magichour.ai/pricing) for more details
   */
  height: number;
  /**
   * The name of video
   */
  name?: string;
  /**
   * The start time of the input video in seconds
   */
  start_seconds: number;
  /**
   * The width of the final output video. The maximum width depends on your subscription. Please refer to our [pricing page](https://magichour.ai/pricing) for more details
   */
  width: number;
};
