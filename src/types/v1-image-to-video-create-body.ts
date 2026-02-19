import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1ImageToVideoCreateBodyAssets,
  Schemas$V1ImageToVideoCreateBodyAssets,
  V1ImageToVideoCreateBodyAssets,
} from "./v1-image-to-video-create-body-assets";
import {
  External$V1ImageToVideoCreateBodyStyle,
  Schemas$V1ImageToVideoCreateBodyStyle,
  V1ImageToVideoCreateBodyStyle,
} from "./v1-image-to-video-create-body-style";

/**
 * V1ImageToVideoCreateBody
 */
export type V1ImageToVideoCreateBody = {
  /**
   * Provide the assets for image-to-video. Sora 2 only supports images with an aspect ratio of `9:16` or `16:9`.
   */
  assets: V1ImageToVideoCreateBodyAssets;
  /**
   * Whether to include audio in the video. Defaults to `false` if not specified.
   *
   * Audio support varies by model:
   * * **`ltx-2`**: Automatically included with no extra credits
   * * **`seedance`**: Not supported
   * * **`kling-2.5`**: Automatically included with no extra credits
   * * **`kling-3.0`**: Toggle-able (can enable/disable)
   * * **`sora-2`**: Automatically included with no extra credits
   * * **`veo3.1`**: Toggle-able (can enable/disable)
   *
   * * **`kling-1.6`**: Not supported
   */
  audio?: boolean | undefined;
  /**
   * The total duration of the output video in seconds. Supported durations depend on the chosen model:
   *
   * * **`ltx-2`**: 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30
   * * **`seedance`**: 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
   * * **`kling-2.5`**: 5, 10
   * * **`kling-3.0`**: 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
   * * **`sora-2`**: 4, 8, 12, 24, 36, 48, 60
   * * **`veo3.1`**: 4, 6, 8, 16, 24, 32, 40, 48, 56
   *
   * Legacy models:
   * * **`kling-1.6`**: 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60
   */
  endSeconds: number;
  /**
   * `height` is deprecated and no longer influences the output video's resolution.
   *
   * This field is retained only for backward compatibility and will be removed in a future release.
   */
  height?: number | null | undefined;
  /**
   * The AI model to use for video generation.
   *
   * * `default`: uses our currently recommended model for general use. For paid tiers, defaults to `kling-2.5`. For free tiers, it defaults to `ltx-2`.
   * * `ltx-2`: Great for fast iteration with audio, lip-sync, and expressive faces
   * * `seedance`: Great for fast iteration and start/end frame
   * * `kling-2.5`: Great for motion, action, and camera control
   * * `kling-3.0`: Great for cinematic, multi-scene storytelling with control
   * * `sora-2`: Great for story-telling, dialogue & creativity
   * * `veo3.1`: Great for realism, polish, & prompt adherence
   *
   * Legacy models:
   * * `kling-1.6`: Great for dependable clips with smooth motion
   *
   * If you specify the deprecated model value that includes the `-audio` suffix, this will be the same as included `audio` as `true`.
   */
  model?:
    | (
        | "default"
        | "kling-1.6"
        | "kling-2.5"
        | "kling-2.5-audio"
        | "kling-3.0"
        | "ltx-2"
        | "seedance"
        | "sora-2"
        | "veo3.1"
        | "veo3.1-audio"
      )
    | undefined;
  /**
   * Give your video a custom name for easy identification.
   */
  name?: string | undefined;
  /**
   * Controls the output video resolution. Defaults to `720p` on paid tiers and `480p` on free tiers.
   *
   * * **`ltx-2`**: Supports 480p, 720p, 1080p.
   * * **`seedance`**: Supports 480p, 720p, 1080p.
   * * **`kling-2.5`**: Supports 720p, 1080p.
   * * **`kling-3.0`**: Supports 720p, 1080p.
   * * **`sora-2`**: Supports 720p.
   * * **`veo3.1`**: Supports 720p, 1080p.
   *
   * * **`kling-1.6`**: Supports 720p, 1080p.
   */
  resolution?: ("1080p" | "480p" | "720p") | undefined;
  /**
   * Attributed used to dictate the style of the output
   */
  style?: V1ImageToVideoCreateBodyStyle | undefined;
  /**
   * `width` is deprecated and no longer influences the output video's resolution.
   *
   * This field is retained only for backward compatibility and will be removed in a future release.
   */
  width?: number | null | undefined;
};

/**
 * @internal
 * V1ImageToVideoCreateBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1ImageToVideoCreateBody = {
  assets: External$V1ImageToVideoCreateBodyAssets;
  audio?: boolean | undefined;
  end_seconds: number;
  height?: number | null | undefined;
  model?:
    | (
        | "default"
        | "kling-1.6"
        | "kling-2.5"
        | "kling-2.5-audio"
        | "kling-3.0"
        | "ltx-2"
        | "seedance"
        | "sora-2"
        | "veo3.1"
        | "veo3.1-audio"
      )
    | undefined;
  name?: string | undefined;
  resolution?: ("1080p" | "480p" | "720p") | undefined;
  style?: External$V1ImageToVideoCreateBodyStyle | undefined;
  width?: number | null | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1ImageToVideoCreateBody
 */
const SchemaIn$V1ImageToVideoCreateBody: z.ZodType<
  V1ImageToVideoCreateBody, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    assets: Schemas$V1ImageToVideoCreateBodyAssets.in,
    audio: z.boolean().optional(),
    end_seconds: z.number(),
    height: z.number().int().nullable().optional(),
    model: z
      .enum([
        "default",
        "kling-1.6",
        "kling-2.5",
        "kling-2.5-audio",
        "kling-3.0",
        "ltx-2",
        "seedance",
        "sora-2",
        "veo3.1",
        "veo3.1-audio",
      ])
      .optional(),
    name: z.string().optional(),
    resolution: z.enum(["1080p", "480p", "720p"]).optional(),
    style: Schemas$V1ImageToVideoCreateBodyStyle.in.optional(),
    width: z.number().int().nullable().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      audio: "audio",
      end_seconds: "endSeconds",
      height: "height",
      model: "model",
      name: "name",
      resolution: "resolution",
      style: "style",
      width: "width",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1ImageToVideoCreateBody
 */
const SchemaOut$V1ImageToVideoCreateBody: z.ZodType<
  External$V1ImageToVideoCreateBody, // output type of this zod object
  z.ZodTypeDef,
  V1ImageToVideoCreateBody // the object to be transformed
> = z
  .object({
    assets: Schemas$V1ImageToVideoCreateBodyAssets.out,
    audio: z.boolean().optional(),
    endSeconds: z.number(),
    height: z.number().int().nullable().optional(),
    model: z
      .enum([
        "default",
        "kling-1.6",
        "kling-2.5",
        "kling-2.5-audio",
        "kling-3.0",
        "ltx-2",
        "seedance",
        "sora-2",
        "veo3.1",
        "veo3.1-audio",
      ])
      .optional(),
    name: z.string().optional(),
    resolution: z.enum(["1080p", "480p", "720p"]).optional(),
    style: Schemas$V1ImageToVideoCreateBodyStyle.out.optional(),
    width: z.number().int().nullable().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      audio: "audio",
      endSeconds: "end_seconds",
      height: "height",
      model: "model",
      name: "name",
      resolution: "resolution",
      style: "style",
      width: "width",
    });
  });

export const Schemas$V1ImageToVideoCreateBody = {
  in: SchemaIn$V1ImageToVideoCreateBody,
  out: SchemaOut$V1ImageToVideoCreateBody,
};
