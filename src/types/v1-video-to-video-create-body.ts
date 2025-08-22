import * as z from "zod";

import { zodTransform } from "magic-hour/core";

import {
  External$V1VideoToVideoCreateBodyAssets,
  Schemas$V1VideoToVideoCreateBodyAssets,
  V1VideoToVideoCreateBodyAssets,
} from "./v1-video-to-video-create-body-assets";
import {
  External$V1VideoToVideoCreateBodyStyle,
  Schemas$V1VideoToVideoCreateBodyStyle,
  V1VideoToVideoCreateBodyStyle,
} from "./v1-video-to-video-create-body-style";

/**
 * V1VideoToVideoCreateBody
 */
export type V1VideoToVideoCreateBody = {
  /**
   * Provide the assets for video-to-video. For video, The `video_source` field determines whether `video_file_path` or `youtube_url` field is used
   */
  assets: V1VideoToVideoCreateBodyAssets;
  /**
   * The end time of the input video in seconds. This value is used to trim the input video. The value must be greater than 0.1, and more than the start_seconds.
   */
  endSeconds: number;
  /**
   * Determines whether the resulting video will have the same frame per second as the original video, or half.
   * * `FULL` - the result video will have the same FPS as the input video
   * * `HALF` - the result video will have half the FPS as the input video
   */
  fpsResolution?: ("FULL" | "HALF") | undefined;
  /**
   * `height` is deprecated and no longer influences the output video's resolution.
   *
   * Output resolution is determined by the **minimum** of:
   * - The resolution of the input video
   * - The maximum resolution allowed by your subscription tier. See our [pricing page](https://magichour.ai/pricing) for more details.
   *
   * This field is retained only for backward compatibility and will be removed in a future release.
   */
  height?: number | null | undefined;
  /**
   * The name of video. This value is mainly used for your own identification of the video.
   */
  name?: string | undefined;
  /**
   * The start time of the input video in seconds. This value is used to trim the input video. The value must be greater than 0.
   */
  startSeconds: number;
  style: V1VideoToVideoCreateBodyStyle;
  /**
   * `width` is deprecated and no longer influences the output video's resolution.
   *
   * Output resolution is determined by the **minimum** of:
   * - The resolution of the input video
   * - The maximum resolution allowed by your subscription tier. See our [pricing page](https://magichour.ai/pricing) for more details.
   *
   * This field is retained only for backward compatibility and will be removed in a future release.
   */
  width?: number | null | undefined;
};

/**
 * @internal
 * V1VideoToVideoCreateBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1VideoToVideoCreateBody = {
  assets: External$V1VideoToVideoCreateBodyAssets;
  end_seconds: number;
  fps_resolution?: ("FULL" | "HALF") | undefined;
  height?: number | null | undefined;
  name?: string | undefined;
  start_seconds: number;
  style: External$V1VideoToVideoCreateBodyStyle;
  width?: number | null | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1VideoToVideoCreateBody
 */
const SchemaIn$V1VideoToVideoCreateBody: z.ZodType<
  V1VideoToVideoCreateBody, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    assets: Schemas$V1VideoToVideoCreateBodyAssets.in,
    end_seconds: z.number(),
    fps_resolution: z.enum(["FULL", "HALF"]).optional(),
    height: z.number().int().nullable().optional(),
    name: z.string().optional(),
    start_seconds: z.number(),
    style: Schemas$V1VideoToVideoCreateBodyStyle.in,
    width: z.number().int().nullable().optional(),
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1VideoToVideoCreateBody
 */
const SchemaOut$V1VideoToVideoCreateBody: z.ZodType<
  External$V1VideoToVideoCreateBody, // output type of this zod object
  z.ZodTypeDef,
  V1VideoToVideoCreateBody // the object to be transformed
> = z
  .object({
    assets: Schemas$V1VideoToVideoCreateBodyAssets.out,
    endSeconds: z.number(),
    fpsResolution: z.enum(["FULL", "HALF"]).optional(),
    height: z.number().int().nullable().optional(),
    name: z.string().optional(),
    startSeconds: z.number(),
    style: Schemas$V1VideoToVideoCreateBodyStyle.out,
    width: z.number().int().nullable().optional(),
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

export const Schemas$V1VideoToVideoCreateBody = {
  in: SchemaIn$V1VideoToVideoCreateBody,
  out: SchemaOut$V1VideoToVideoCreateBody,
};
