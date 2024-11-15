/**
 * Generated by Sideko (sideko.dev)
 **/

import { types } from "magic-hour";

export type PostV1VideoToVideoBody = {
  /**
   * Provide the assets for video-to-video. For video, The &#x60;video_source&#x60; field determines whether &#x60;video_file_path&#x60; or &#x60;youtube_url&#x60; field is used
   */
  assets: types.PostV1VideoToVideoBodyAssets;
  /**
   * The end time of the input video in seconds
   */
  end_seconds: number;
  /**
   * Determines whether the resulting video will have the same frame per second as the original video, or half.
   * * &#x60;FULL&#x60; - the result video will have the same FPS as the input video
   * * &#x60;HALF&#x60; - the result video will have half the FPS as the input video
   */
  fps_resolution?: types.PostV1VideoToVideoBodyFpsResolutionEnum;
  /**
   * The height of the final output video. Must be divisible by 64. The maximum height depends on your subscription. Please refer to our [pricing page](https://magichour.ai/pricing) for more details
   */
  height: number;
  /**
   * The name of video
   */
  name?: string | null;
  /**
   * The start time of the input video in seconds
   */
  start_seconds: number;
  style: types.PostV1VideoToVideoBodyStyle;
  /**
   * The width of the final output video. Must be divisible by 64. The maximum width depends on your subscription. Please refer to our [pricing page](https://magichour.ai/pricing) for more details
   */
  width: number;
};
