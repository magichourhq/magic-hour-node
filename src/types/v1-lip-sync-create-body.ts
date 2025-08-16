import {
  External$V1LipSyncCreateBodyAssets,
  Schemas$V1LipSyncCreateBodyAssets,
  V1LipSyncCreateBodyAssets,
} from "./v1-lip-sync-create-body-assets";
import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * V1LipSyncCreateBody
 */
export type V1LipSyncCreateBody = {
  /**
   * Provide the assets for lip-sync. For video, The `video_source` field determines whether `video_file_path` or `youtube_url` field is used
   */
  assets: V1LipSyncCreateBodyAssets;
  /**
   * The end time of the input video in seconds. This value is used to trim the input video. The value must be greater than 0.1, and more than the start_seconds.
   */
  endSeconds: number;
  /**
   * Used to determine the dimensions of the output video.
   *
   * * If height is provided, width will also be required. The larger value between width and height will be used to determine the maximum output resolution while maintaining the original aspect ratio.
   * * If both height and width are omitted, the video will be resized according to your subscription's maximum resolution, while preserving aspect ratio.
   *
   * Note: if the video's original resolution is less than the maximum, the video will not be resized.
   *
   * See our [pricing page](https://magichour.ai/pricing) for more details.
   */
  height?: number | undefined;
  /**
   * Defines the maximum FPS (frames per second) for the output video. If the input video's FPS is lower than this limit, the output video will retain the input FPS. This is useful for reducing unnecessary frame usage in scenarios where high FPS is not required.
   */
  maxFpsLimit?: number | undefined;
  /**
   * The name of video. This value is mainly used for your own identification of the video.
   */
  name?: string | undefined;
  /**
   * The start time of the input video in seconds. This value is used to trim the input video. The value must be greater than 0.
   */
  startSeconds: number;
  /**
   * Used to determine the dimensions of the output video.
   *
   * * If width is provided, height will also be required. The larger value between width and height will be used to determine the maximum output resolution while maintaining the original aspect ratio.
   * * If both height and width are omitted, the video will be resized according to your subscription's maximum resolution, while preserving aspect ratio.
   *
   * Note: if the video's original resolution is less than the maximum, the video will not be resized.
   *
   * See our [pricing page](https://magichour.ai/pricing) for more details.
   */
  width?: number | undefined;
};

/**
 * @internal
 * V1LipSyncCreateBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1LipSyncCreateBody = {
  assets: External$V1LipSyncCreateBodyAssets;
  end_seconds: number;
  height?: number | undefined;
  max_fps_limit?: number | undefined;
  name?: string | undefined;
  start_seconds: number;
  width?: number | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1LipSyncCreateBody
 */
const SchemaIn$V1LipSyncCreateBody: z.ZodType<
  V1LipSyncCreateBody, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    assets: Schemas$V1LipSyncCreateBodyAssets.in,
    end_seconds: z.number(),
    height: z.number().int().optional(),
    max_fps_limit: z.number().optional(),
    name: z.string().optional(),
    start_seconds: z.number(),
    width: z.number().int().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      end_seconds: "endSeconds",
      height: "height",
      max_fps_limit: "maxFpsLimit",
      name: "name",
      start_seconds: "startSeconds",
      width: "width",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1LipSyncCreateBody
 */
const SchemaOut$V1LipSyncCreateBody: z.ZodType<
  External$V1LipSyncCreateBody, // output type of this zod object
  z.ZodTypeDef,
  V1LipSyncCreateBody // the object to be transformed
> = z
  .object({
    assets: Schemas$V1LipSyncCreateBodyAssets.out,
    endSeconds: z.number(),
    height: z.number().int().optional(),
    maxFpsLimit: z.number().optional(),
    name: z.string().optional(),
    startSeconds: z.number(),
    width: z.number().int().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      endSeconds: "end_seconds",
      height: "height",
      maxFpsLimit: "max_fps_limit",
      name: "name",
      startSeconds: "start_seconds",
      width: "width",
    });
  });

export const Schemas$V1LipSyncCreateBody = {
  in: SchemaIn$V1LipSyncCreateBody,
  out: SchemaOut$V1LipSyncCreateBody,
};
