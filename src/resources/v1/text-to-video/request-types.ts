import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1TextToVideoCreateBodyStyle,
  Schemas$V1TextToVideoCreateBodyStyle,
  V1TextToVideoCreateBodyStyle,
} from "magic-hour/types/v1-text-to-video-create-body-style";

/**
 * CreateRequest
 */
export type CreateRequest = {
  /**
   * Determines the aspect ratio of the output video.
   * * **Seedance**: Supports `9:16`, `16:9`, `1:1`.
   * * **Kling 2.5 Audio**: Supports `9:16`, `16:9`, `1:1`.
   * * **Sora 2**: Supports `9:16`, `16:9`.
   * * **Veo 3.1 Audio**: Supports `9:16`, `16:9`.
   * * **Veo 3.1**: Supports `9:16`, `16:9`.
   * * **Kling 1.6**: Supports `9:16`, `16:9`, `1:1`.
   */
  aspectRatio?: ("16:9" | "1:1" | "9:16") | undefined;
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
   * Deprecated. Use `aspect_ratio` instead.
   */
  orientation?: ("landscape" | "portrait" | "square") | undefined;
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
  style: V1TextToVideoCreateBodyStyle;
};

/**
 * @internal
 * CreateRequest without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$CreateRequest = {
  aspect_ratio?: ("16:9" | "1:1" | "9:16") | undefined;
  end_seconds: number;
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
  orientation?: ("landscape" | "portrait" | "square") | undefined;
  resolution?: ("1080p" | "480p" | "720p") | undefined;
  style: External$V1TextToVideoCreateBodyStyle;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object CreateRequest
 */
const SchemaIn$CreateRequest: z.ZodType<
  CreateRequest, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    aspect_ratio: z.enum(["16:9", "1:1", "9:16"]).optional(),
    end_seconds: z.number(),
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
    orientation: z.enum(["landscape", "portrait", "square"]).optional(),
    resolution: z.enum(["1080p", "480p", "720p"]).optional(),
    style: Schemas$V1TextToVideoCreateBodyStyle.in,
  })
  .transform((obj) => {
    return zodTransform(obj, {
      aspect_ratio: "aspectRatio",
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$CreateRequest
 */
const SchemaOut$CreateRequest: z.ZodType<
  External$CreateRequest, // output type of this zod object
  z.ZodTypeDef,
  CreateRequest // the object to be transformed
> = z
  .object({
    aspectRatio: z.enum(["16:9", "1:1", "9:16"]).optional(),
    endSeconds: z.number(),
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
    orientation: z.enum(["landscape", "portrait", "square"]).optional(),
    resolution: z.enum(["1080p", "480p", "720p"]).optional(),
    style: Schemas$V1TextToVideoCreateBodyStyle.out,
  })
  .transform((obj) => {
    return zodTransform(obj, {
      aspectRatio: "aspect_ratio",
      endSeconds: "end_seconds",
      model: "model",
      name: "name",
      orientation: "orientation",
      resolution: "resolution",
      style: "style",
    });
  });

export const Schemas$CreateRequest = {
  in: SchemaIn$CreateRequest,
  out: SchemaOut$CreateRequest,
};
