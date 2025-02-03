import {
  External$PostV1VideoToVideoBodyAssets,
  PostV1VideoToVideoBodyAssets,
  Schemas$PostV1VideoToVideoBodyAssets,
} from "./post-v1-video-to-video-body-assets";
import {
  External$PostV1VideoToVideoBodyStyle,
  PostV1VideoToVideoBodyStyle,
  Schemas$PostV1VideoToVideoBodyStyle,
} from "./post-v1-video-to-video-body-style";
import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * PostV1VideoToVideoBody
 */
export type PostV1VideoToVideoBody = {
  /**
   * Provide the assets for video-to-video. For video, The `video_source` field determines whether `video_file_path` or `youtube_url` field is used
   */
  assets: PostV1VideoToVideoBodyAssets;
  /**
   * The end time of the input video in seconds
   */
  endSeconds: number;
  /**
   * Determines whether the resulting video will have the same frame per second as the original video, or half.
   * * `FULL` - the result video will have the same FPS as the input video
   * * `HALF` - the result video will have half the FPS as the input video
   */
  fpsResolution?: ("FULL" | "HALF") | undefined;
  /**
   * The height of the final output video. Must be divisible by 64. The maximum height depends on your subscription. Please refer to our [pricing page](https://magichour.ai/pricing) for more details
   */
  height: number;
  /**
   * The name of video
   */
  name?: string | undefined;
  /**
   * The start time of the input video in seconds
   */
  startSeconds: number;
  style: PostV1VideoToVideoBodyStyle;
  /**
   * The width of the final output video. Must be divisible by 64. The maximum width depends on your subscription. Please refer to our [pricing page](https://magichour.ai/pricing) for more details
   */
  width: number;
};

/**
 * @internal
 * PostV1VideoToVideoBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1VideoToVideoBody = {
  assets: External$PostV1VideoToVideoBodyAssets;
  end_seconds: number;
  fps_resolution?: ("FULL" | "HALF") | undefined;
  height: number;
  name?: string | undefined;
  start_seconds: number;
  style: External$PostV1VideoToVideoBodyStyle;
  width: number;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1VideoToVideoBody
 */
const SchemaIn$PostV1VideoToVideoBody: z.ZodType<
  PostV1VideoToVideoBody, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    assets: Schemas$PostV1VideoToVideoBodyAssets.in,
    end_seconds: z.number(),
    fps_resolution: z.enum(["FULL", "HALF"]).optional(),
    height: z.number().int(),
    name: z.string().optional(),
    start_seconds: z.number(),
    style: Schemas$PostV1VideoToVideoBodyStyle.in,
    width: z.number().int(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      end_seconds: "endSeconds",
      fps_resolution: "fpsResolution",
      height: "height",
      name: "name",
      start_seconds: "startSeconds",
      style: "style",
      width: "width",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1VideoToVideoBody
 */
const SchemaOut$PostV1VideoToVideoBody: z.ZodType<
  External$PostV1VideoToVideoBody, // output type of this zod object
  z.ZodTypeDef,
  PostV1VideoToVideoBody // the object to be transformed
> = z
  .object({
    assets: Schemas$PostV1VideoToVideoBodyAssets.out,
    endSeconds: z.number(),
    fpsResolution: z.enum(["FULL", "HALF"]).optional(),
    height: z.number().int(),
    name: z.string().optional(),
    startSeconds: z.number(),
    style: Schemas$PostV1VideoToVideoBodyStyle.out,
    width: z.number().int(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      endSeconds: "end_seconds",
      fpsResolution: "fps_resolution",
      height: "height",
      name: "name",
      startSeconds: "start_seconds",
      style: "style",
      width: "width",
    });
  });

export const Schemas$PostV1VideoToVideoBody = {
  in: SchemaIn$PostV1VideoToVideoBody,
  out: SchemaOut$PostV1VideoToVideoBody,
};
