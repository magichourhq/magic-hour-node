/**
 * Generated by Sideko (sideko.dev)
 **/

import { types } from "magic-hour";

export type PostV1ImageToVideoBody = {
  /**
   * Provide the assets for image-to-video.
   */
  assets: types.PostV1ImageToVideoBodyAssets;
  /**
   * The total duration of the output video in seconds.
   */
  end_seconds: number;
  /**
   * The height of the input video. This value will help determine the final orientation of the output video. The output video resolution may not match the input.
   */
  height: number;
  /**
   * The name of video
   */
  name?: string | null;
  style: types.PostV1ImageToVideoBodyStyle;
  /**
   * The width of the input video. This value will help determine the final orientation of the output video. The output video resolution may not match the input.
   */
  width: number;
};
