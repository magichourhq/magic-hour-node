import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1TextToVideoCreateBodyStyle,
  Schemas$V1TextToVideoCreateBodyStyle,
  V1TextToVideoCreateBodyStyle,
} from "./v1-text-to-video-create-body-style";

/**
 * V1TextToVideoCreateBody
 */
export type V1TextToVideoCreateBody = {
  /**
   * Determines the aspect ratio of the output video.
   * * **seedance**: Supports `9:16`, `16:9`, `1:1`.
   * * **kling-2.5**: Supports `9:16`, `16:9`, `1:1`.
   * * **kling-3.0**: Supports `9:16`, `16:9`, `1:1`.
   * * **sora-2**: Supports `9:16`, `16:9`.
   * * **veo3.1**: Supports `9:16`, `16:9`.
   * * **kling-1.6**: Supports `9:16`, `16:9`, `1:1`.
   */
  aspectRatio?: ("16:9" | "1:1" | "9:16") | undefined;
  /**
   * Whether to include audio in the video. Defaults to `false` if not specified.
   *
   * Audio support varies by model:
   * * **seedance**: Not supported
   * * **kling-2.5**: Always included (cannot be disabled)
   * * **kling-3.0**: Toggle-able (can enable/disable)
   * * **sora-2**: Always included (cannot be disabled)
   * * **veo3.1**: Toggle-able (can enable/disable)
   * * **kling-1.6**: Not supported
   */
  audio?: boolean | undefined;
  /**
   * The total duration of the output video in seconds.
   *
   * Supported durations depend on the chosen model:
   * * **Default**: 5-60 seconds (2-12 seconds for 480p).
   * * **seedance**: 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
   * * **kling-2.5**: 5, 10
   * * **kling-3.0**: 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
   * * **sora-2**: 4, 8, 12, 24, 36, 48, 60
   * * **veo3.1**: 4, 6, 8, 16, 24, 32, 40, 48, 56
   * * **kling-1.6**: 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60
   */
  endSeconds: number;
  /**
   * The AI model to use for video generation.
   * * `default`: Our recommended model for general use (Kling 2.5 Audio). Note: For backward compatibility, if you use default and end_seconds > 10, we'll fall back to Kling 1.6.
   * * `seedance`: Great for fast iteration and start/end frame
   * * `kling-2.5`: Great for motion, action, and camera control
   * * `kling-3.0`: Great for cinematic, multi-scene storytelling with control
   * * `sora-2`: Great for story-telling, dialogue & creativity
   * * `veo3.1`: Great for realism, polish, & prompt adherence
   * * `kling-1.6`: Great for dependable clips with smooth motion
   */
  model?:
    | (
        | "default"
        | "kling-1.6"
        | "kling-2.5"
        | "kling-2.5-audio"
        | "kling-3.0"
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
   * Deprecated. Use `aspect_ratio` instead.
   */
  orientation?: ("landscape" | "portrait" | "square") | undefined;
  /**
   * Controls the output video resolution. Defaults to `720p` if not specified.
   *
   * * **Default**: Supports `480p`, `720p`, and `1080p`.
   * * **seedance**: Supports `480p`, `720p`, `1080p`.
   * * **kling-2.5**: Supports `720p`, `1080p`.
   * * **kling-3.0**: Supports `720p`, `1080p`.
   * * **sora-2**: Supports `720p`.
   * * **veo3.1**: Supports `720p`, `1080p`.
   * * **kling-1.6**: Supports `720p`, `1080p`.
   */
  resolution?: ("1080p" | "480p" | "720p") | undefined;
  style: V1TextToVideoCreateBodyStyle;
};

/**
 * @internal
 * V1TextToVideoCreateBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1TextToVideoCreateBody = {
  aspect_ratio?: ("16:9" | "1:1" | "9:16") | undefined;
  audio?: boolean | undefined;
  end_seconds: number;
  model?:
    | (
        | "default"
        | "kling-1.6"
        | "kling-2.5"
        | "kling-2.5-audio"
        | "kling-3.0"
        | "seedance"
        | "sora-2"
        | "veo3.1"
        | "veo3.1-audio"
      )
    | undefined;
  name?: string | undefined;
  orientation?: ("landscape" | "portrait" | "square") | undefined;
  resolution?: ("1080p" | "480p" | "720p") | undefined;
  style: External$V1TextToVideoCreateBodyStyle;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1TextToVideoCreateBody
 */
const SchemaIn$V1TextToVideoCreateBody: z.ZodType<
  V1TextToVideoCreateBody, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    aspect_ratio: z.enum(["16:9", "1:1", "9:16"]).optional(),
    audio: z.boolean().optional(),
    end_seconds: z.number(),
    model: z
      .enum([
        "default",
        "kling-1.6",
        "kling-2.5",
        "kling-2.5-audio",
        "kling-3.0",
        "seedance",
        "sora-2",
        "veo3.1",
        "veo3.1-audio",
      ])
      .optional(),
    name: z.string().optional(),
    orientation: z.enum(["landscape", "portrait", "square"]).optional(),
    resolution: z.enum(["1080p", "480p", "720p"]).optional(),
    style: Schemas$V1TextToVideoCreateBodyStyle.in,
  })
  .transform((obj) => {
    return zodTransform(obj, {
      aspect_ratio: "aspectRatio",
      audio: "audio",
      end_seconds: "endSeconds",
      model: "model",
      name: "name",
      orientation: "orientation",
      resolution: "resolution",
      style: "style",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1TextToVideoCreateBody
 */
const SchemaOut$V1TextToVideoCreateBody: z.ZodType<
  External$V1TextToVideoCreateBody, // output type of this zod object
  z.ZodTypeDef,
  V1TextToVideoCreateBody // the object to be transformed
> = z
  .object({
    aspectRatio: z.enum(["16:9", "1:1", "9:16"]).optional(),
    audio: z.boolean().optional(),
    endSeconds: z.number(),
    model: z
      .enum([
        "default",
        "kling-1.6",
        "kling-2.5",
        "kling-2.5-audio",
        "kling-3.0",
        "seedance",
        "sora-2",
        "veo3.1",
        "veo3.1-audio",
      ])
      .optional(),
    name: z.string().optional(),
    orientation: z.enum(["landscape", "portrait", "square"]).optional(),
    resolution: z.enum(["1080p", "480p", "720p"]).optional(),
    style: Schemas$V1TextToVideoCreateBodyStyle.out,
  })
  .transform((obj) => {
    return zodTransform(obj, {
      aspectRatio: "aspect_ratio",
      audio: "audio",
      endSeconds: "end_seconds",
      model: "model",
      name: "name",
      orientation: "orientation",
      resolution: "resolution",
      style: "style",
    });
  });

export const Schemas$V1TextToVideoCreateBody = {
  in: SchemaIn$V1TextToVideoCreateBody,
  out: SchemaOut$V1TextToVideoCreateBody,
};
