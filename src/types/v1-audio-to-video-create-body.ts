import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1AudioToVideoCreateBodyAssets,
  Schemas$V1AudioToVideoCreateBodyAssets,
  V1AudioToVideoCreateBodyAssets,
} from "./v1-audio-to-video-create-body-assets";
import {
  External$V1AudioToVideoCreateBodyStyle,
  Schemas$V1AudioToVideoCreateBodyStyle,
  V1AudioToVideoCreateBodyStyle,
} from "./v1-audio-to-video-create-body-style";

/**
 * V1AudioToVideoCreateBody
 */
export type V1AudioToVideoCreateBody = {
  /**
   * Provide the audio file and an optional reference image.
   */
  assets: V1AudioToVideoCreateBodyAssets;
  /**
   * End time of your clip (seconds). Must be greater than start_seconds.
   */
  endSeconds: number;
  /**
   * Give your video a custom name for easy identification.
   */
  name?: string | undefined;
  /**
   * Output video resolution. Defaults to `720p` on paid tiers and `480p` on free tiers.
   */
  resolution?: ("1080p" | "480p" | "720p") | undefined;
  /**
   * Start time of your clip (seconds). Must be ≥ 0.
   */
  startSeconds?: number | undefined;
  /**
   * Attributes used to dictate the style of the output
   */
  style?: V1AudioToVideoCreateBodyStyle | undefined;
};

/**
 * @internal
 * V1AudioToVideoCreateBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AudioToVideoCreateBody = {
  assets: External$V1AudioToVideoCreateBodyAssets;
  end_seconds: number;
  name?: string | undefined;
  resolution?: ("1080p" | "480p" | "720p") | undefined;
  start_seconds?: number | undefined;
  style?: External$V1AudioToVideoCreateBodyStyle | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AudioToVideoCreateBody
 */
const SchemaIn$V1AudioToVideoCreateBody: z.ZodType<
  V1AudioToVideoCreateBody, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    assets: Schemas$V1AudioToVideoCreateBodyAssets.in,
    end_seconds: z.number(),
    name: z.string().optional(),
    resolution: z.enum(["1080p", "480p", "720p"]).optional(),
    start_seconds: z.number().optional(),
    style: Schemas$V1AudioToVideoCreateBodyStyle.in.optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      end_seconds: "endSeconds",
      name: "name",
      resolution: "resolution",
      start_seconds: "startSeconds",
      style: "style",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AudioToVideoCreateBody
 */
const SchemaOut$V1AudioToVideoCreateBody: z.ZodType<
  External$V1AudioToVideoCreateBody, // output type of this zod object
  z.ZodTypeDef,
  V1AudioToVideoCreateBody // the object to be transformed
> = z
  .object({
    assets: Schemas$V1AudioToVideoCreateBodyAssets.out,
    endSeconds: z.number(),
    name: z.string().optional(),
    resolution: z.enum(["1080p", "480p", "720p"]).optional(),
    startSeconds: z.number().optional(),
    style: Schemas$V1AudioToVideoCreateBodyStyle.out.optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      endSeconds: "end_seconds",
      name: "name",
      resolution: "resolution",
      startSeconds: "start_seconds",
      style: "style",
    });
  });

export const Schemas$V1AudioToVideoCreateBody = {
  in: SchemaIn$V1AudioToVideoCreateBody,
  out: SchemaOut$V1AudioToVideoCreateBody,
};
