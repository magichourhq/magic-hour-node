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
   * The total duration of the output video in seconds.
   *
   * Supported durations depend on the chosen model:
   * * **Default**: 5-60 seconds (either 5 or 10 for 480p).
   * * **Seedance**: 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
   * * **Kling 2.5 Audio**: 5, 10
   * * **Sora 2**: 4, 8, 12, 24, 36, 48, 60
   * * **Veo 3.1 Audio**: 4, 6, 8, 16, 24, 32, 40, 48, 56
   * * **Veo 3.1**: 4, 6, 8, 16, 24, 32, 40, 48, 56
   * * **Kling 1.6**: 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60
   */
  endSeconds: number;
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
   * The AI model to use for video generation.
   * * `default`: Our recommended model for general use (Kling 2.5 Audio). Note: For backward compatibility, if you use default and end_seconds > 10, we'll fall back to Kling 1.6.
   * * `seedance`: Great for fast iteration and start/end frame
   * * `kling-2.5-audio`: Great for motion, action, and camera control
   * * `sora-2`: Great for story-telling, dialogue & creativity
   * * `veo3.1-audio`: Great for dialogue + SFX generated natively
   * * `veo3.1`: Great for realism, polish, & prompt adherence
   * * `kling-1.6`: Great for dependable clips with smooth motion
   */
  model?:
    | (
        | "default"
        | "kling-1.6"
        | "kling-2.5-audio"
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
   * Controls the output video resolution. Defaults to `720p` if not specified.
   *
   * * **Default**: Supports `480p`, `720p`, and `1080p`.
   * * **Seedance**: Supports `480p`, `720p`, `1080p`.
   * * **Kling 2.5 Audio**: Supports `720p`, `1080p`.
   * * **Sora 2**: Supports `720p`.
   * * **Veo 3.1 Audio**: Supports `720p`, `1080p`.
   * * **Veo 3.1**: Supports `720p`, `1080p`.
   * * **Kling 1.6**: Supports `720p`, `1080p`.
   */
  resolution?: ("1080p" | "480p" | "720p") | undefined;
  /**
   * Attributed used to dictate the style of the output
   */
  style?: V1ImageToVideoCreateBodyStyle | undefined;
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
 * V1ImageToVideoCreateBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1ImageToVideoCreateBody = {
  assets: External$V1ImageToVideoCreateBodyAssets;
  end_seconds: number;
  height?: number | null | undefined;
  model?:
    | (
        | "default"
        | "kling-1.6"
        | "kling-2.5-audio"
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
    end_seconds: z.number(),
    height: z.number().int().nullable().optional(),
    model: z
      .enum([
        "default",
        "kling-1.6",
        "kling-2.5-audio",
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
    endSeconds: z.number(),
    height: z.number().int().nullable().optional(),
    model: z
      .enum([
        "default",
        "kling-1.6",
        "kling-2.5-audio",
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
