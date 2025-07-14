import {
  External$V1TextToVideoCreateBodyStyle,
  Schemas$V1TextToVideoCreateBodyStyle,
  V1TextToVideoCreateBodyStyle,
} from "./v1-text-to-video-create-body-style";
import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * V1TextToVideoCreateBody
 */
export type V1TextToVideoCreateBody = {
  /**
   * The total duration of the output video in seconds.
   */
  endSeconds: number;
  /**
   * The name of video
   */
  name?: string | undefined;
  /**
   * Determines the orientation of the output video
   */
  orientation: "landscape" | "portrait" | "square";
  /**
   * Controls the output video resolution. Defaults to `720p` if not specified.
   *
   * **Options:**
   * - `480p` - Supports only 5 or 10 second videos. Output: 24fps. Cost: 120 credits per 5 seconds.
   * - `720p` - Supports videos between 5-60 seconds. Output: 30fps. Cost: 300 credits per 5 seconds.
   * - `1080p` - Supports videos between 5-60 seconds. Output: 30fps. Cost: 600 credits per 5 seconds. **Requires** `pro` or `business` tier.
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
  end_seconds: number;
  name?: string | undefined;
  orientation: "landscape" | "portrait" | "square";
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1TextToVideoCreateBody
 */
const SchemaOut$V1TextToVideoCreateBody: z.ZodType<
  External$V1TextToVideoCreateBody, // output type of this zod object
  z.ZodTypeDef,
  V1TextToVideoCreateBody // the object to be transformed
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

export const Schemas$V1TextToVideoCreateBody = {
  in: SchemaIn$V1TextToVideoCreateBody,
  out: SchemaOut$V1TextToVideoCreateBody,
};
