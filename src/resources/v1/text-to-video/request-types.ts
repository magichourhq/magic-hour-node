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
   * The total duration of the output video in seconds.
   *
   * The value must be greater than or equal to 5 seconds and less than or equal to 60 seconds.
   *
   * Note: For 480p resolution, the value must be either 5 or 10.
   */
  endSeconds: number;
  /**
   * The name of video. This value is mainly used for your own identification of the video.
   */
  name?: string | undefined;
  /**
   * Determines the orientation of the output video
   */
  orientation: "landscape" | "portrait" | "square";
  /**
   * Controls the output video resolution. Defaults to `720p` if not specified.
   *
   * 480p and 720p are available on Creator, Pro, or Business tiers. However, 1080p require Pro or Business tier.
   *
   * **Options:**
   * - `480p` - Supports only 5 or 10 second videos. Output: 24fps. Cost: 120 credits per 5 seconds.
   * - `720p` - Supports videos between 5-60 seconds. Output: 30fps. Cost: 300 credits per 5 seconds.
   * - `1080p` - Supports videos between 5-60 seconds. Output: 30fps. Cost: 600 credits per 5 seconds.
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
  end_seconds: number;
  name?: string | undefined;
  orientation: "landscape" | "portrait" | "square";
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
    end_seconds: z.number(),
    name: z.string().optional(),
    orientation: z.enum(["landscape", "portrait", "square"]),
    resolution: z.enum(["1080p", "480p", "720p"]).optional(),
    style: Schemas$V1TextToVideoCreateBodyStyle.in,
  })
  .transform((obj) => {
    return zodTransform(obj, {
      end_seconds: "endSeconds",
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
    endSeconds: z.number(),
    name: z.string().optional(),
    orientation: z.enum(["landscape", "portrait", "square"]),
    resolution: z.enum(["1080p", "480p", "720p"]).optional(),
    style: Schemas$V1TextToVideoCreateBodyStyle.out,
  })
  .transform((obj) => {
    return zodTransform(obj, {
      endSeconds: "end_seconds",
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
