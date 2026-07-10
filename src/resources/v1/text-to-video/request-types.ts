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
   *
   * * **`ltx-2.3`**: Supports 9:16, 16:9, 1:1.
   * * **`wan-2.2`**: Supports 9:16, 16:9, 1:1.
   * * **`kling-2.5`**: Supports 9:16, 16:9, 1:1.
   * * **`kling-3.0`**: Supports 9:16, 16:9, 1:1.
   * * **`veo3.1-lite`**: Supports 9:16, 16:9.
   * * **`veo3.1`**: Supports 9:16, 16:9.
   * * **`seedance-1.5`**: Supports 9:16, 16:9, 1:1.
   * * **`seedance-2.0-mini`**: Supports 9:16, 16:9, 1:1.
   * * **`seedance-2.0`**: Supports 9:16, 16:9, 1:1.
   * * **`sora-2`**: Supports 9:16, 16:9.
   *
   */
  aspectRatio?: ("16:9" | "1:1" | "9:16") | undefined;
  /**
   * Whether to include audio in the video. Defaults to `false` if not specified.
   *
   * Audio support varies by model:
   * * **`ltx-2.3`**: Toggle-able: no additional credits for audio
   * * **`wan-2.2`**: Not supported
   * * **`kling-2.5`**: Toggle-able: no additional credits for audio
   * * **`kling-3.0`**: Toggle-able: audio adds extra credits when enabled
   * * **`veo3.1-lite`**: Toggle-able: audio adds extra credits when enabled
   * * **`veo3.1`**: Toggle-able: audio adds extra credits when enabled
   * * **`seedance-1.5`**: Toggle-able: audio adds extra credits when enabled
   * * **`seedance-2.0-mini`**: Toggle-able: no additional credits for audio
   * * **`seedance-2.0`**: Toggle-able: no additional credits for audio
   * * **`sora-2`**: Toggle-able: no additional credits for audio
   *
   */
  audio?: boolean | undefined;
  /**
   * The total duration of the output video in seconds. Supported durations depend on the chosen model:
   *
   * * **`ltx-2.3`**: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30
   * * **`wan-2.2`**: 3, 4, 5, 6, 7, 8, 9, 10, 15
   * * **`kling-2.5`**: 5, 10
   * * **`kling-3.0`**: 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
   * * **`veo3.1-lite`**: 8, 16, 24, 32, 40, 48, 56
   * * **`veo3.1`**: 4, 6, 8, 16, 24, 32, 40, 48, 56
   * * **`seedance-1.5`**: 4, 5, 6, 7, 8, 9, 10, 11, 12
   * * **`seedance-2.0-mini`**: 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
   * * **`seedance-2.0`**: 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
   * * **`sora-2`**: 4, 8, 12, 24, 36, 48, 60
   *
   */
  endSeconds: number;
  /**
   * The AI model to use for video generation.
   *
   * * `default`: uses our currently recommended model for general use. For paid tiers, defaults to `kling-3.0`. For free tiers, it defaults to `ltx-2.3`.
   * * `ltx-2.3`: Fastest output. Best for rapid iteration.
   * * `wan-2.2`: Strong physics, camera moves, and motion.
   * * `kling-2.5`: Great for action, motion blur, and camera moves.
   * * `kling-3.0`: Best overall quality for cinematic storytelling.
   * * `veo3.1-lite`: Veo quality at a more accessible cost.
   * * `veo3.1`: Google's model. Highest realism and detail.
   * * `seedance-1.5`: Smooth, consistent motion with precision.
   * * `seedance-2.0-mini`: Fast, consistent video with strong motion quality
   * * `seedance-2.0`: Top quality with reference-to-video control.
   * * `sora-2`: Open AI's model. Great for creativity and viral clips.
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
        | "ltx-2.3"
        | "seedance"
        | "seedance-1.5"
        | "seedance-2.0"
        | "seedance-2.0-mini"
        | "sora-2"
        | "veo3.1"
        | "veo3.1-audio"
        | "veo3.1-lite"
        | "wan-2.2"
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
   * Controls the output video resolution. Defaults to `720p` on paid tiers and `480p` on free tiers.
   *
   * * **`ltx-2.3`**: Supports 480p, 720p, 1080p.
   * * **`wan-2.2`**: Supports 480p, 720p, 1080p.
   * * **`kling-2.5`**: Supports 720p, 1080p.
   * * **`kling-3.0`**: Supports 720p, 1080p, 4k.
   * * **`veo3.1-lite`**: Supports 720p, 1080p.
   * * **`veo3.1`**: Supports 720p, 1080p.
   * * **`seedance-1.5`**: Supports 480p, 720p, 1080p.
   * * **`seedance-2.0-mini`**: Supports 480p, 720p.
   * * **`seedance-2.0`**: Supports 480p, 720p.
   * * **`sora-2`**: Supports 720p.
   *
   */
  resolution?: ("1080p" | "480p" | "4k" | "720p") | undefined;
  style: V1TextToVideoCreateBodyStyle;
};

/**
 * @internal
 * CreateRequest without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$CreateRequest = {
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
        | "ltx-2"
        | "ltx-2.3"
        | "seedance"
        | "seedance-1.5"
        | "seedance-2.0"
        | "seedance-2.0-mini"
        | "sora-2"
        | "veo3.1"
        | "veo3.1-audio"
        | "veo3.1-lite"
        | "wan-2.2"
      )
    | undefined;
  name?: string | undefined;
  orientation?: ("landscape" | "portrait" | "square") | undefined;
  resolution?: ("1080p" | "480p" | "4k" | "720p") | undefined;
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
    audio: z.boolean().optional(),
    end_seconds: z.number(),
    model: z
      .enum([
        "default",
        "kling-1.6",
        "kling-2.5",
        "kling-2.5-audio",
        "kling-3.0",
        "ltx-2",
        "ltx-2.3",
        "seedance",
        "seedance-1.5",
        "seedance-2.0",
        "seedance-2.0-mini",
        "sora-2",
        "veo3.1",
        "veo3.1-audio",
        "veo3.1-lite",
        "wan-2.2",
      ])
      .optional(),
    name: z.string().optional(),
    orientation: z.enum(["landscape", "portrait", "square"]).optional(),
    resolution: z.enum(["1080p", "480p", "4k", "720p"]).optional(),
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$CreateRequest
 */
const SchemaOut$CreateRequest: z.ZodType<
  External$CreateRequest, // output type of this zod object
  z.ZodTypeDef,
  CreateRequest // the object to be transformed
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
        "ltx-2",
        "ltx-2.3",
        "seedance",
        "seedance-1.5",
        "seedance-2.0",
        "seedance-2.0-mini",
        "sora-2",
        "veo3.1",
        "veo3.1-audio",
        "veo3.1-lite",
        "wan-2.2",
      ])
      .optional(),
    name: z.string().optional(),
    orientation: z.enum(["landscape", "portrait", "square"]).optional(),
    resolution: z.enum(["1080p", "480p", "4k", "720p"]).optional(),
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

export const Schemas$CreateRequest = {
  in: SchemaIn$CreateRequest,
  out: SchemaOut$CreateRequest,
};
