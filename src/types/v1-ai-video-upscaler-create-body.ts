import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1AiVideoUpscalerCreateBodyAssets,
  Schemas$V1AiVideoUpscalerCreateBodyAssets,
  V1AiVideoUpscalerCreateBodyAssets,
} from "./v1-ai-video-upscaler-create-body-assets";

/**
 * V1AiVideoUpscalerCreateBody
 */
export type V1AiVideoUpscalerCreateBody = {
  /**
   * Source video for the upscale job.
   */
  assets: V1AiVideoUpscalerCreateBodyAssets;
  /**
   * End time of your clip (seconds). Must be greater than start_seconds.
   */
  endSeconds: number;
  /**
   * Give your video a custom name for easy identification.
   */
  name?: string | undefined;
  /**
   * Output resolution. `720p` and `1080p` set the output's short side, `2k` and `4k` its long side; the aspect ratio is kept. Requires a paid plan.
   */
  resolution: "1080p" | "2k" | "4k" | "720p";
  /**
   * Start time of your clip (seconds). Must be ≥ 0.
   */
  startSeconds?: number | undefined;
};

/**
 * @internal
 * V1AiVideoUpscalerCreateBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiVideoUpscalerCreateBody = {
  assets: External$V1AiVideoUpscalerCreateBodyAssets;
  end_seconds: number;
  name?: string | undefined;
  resolution: "1080p" | "2k" | "4k" | "720p";
  start_seconds?: number | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiVideoUpscalerCreateBody
 */
const SchemaIn$V1AiVideoUpscalerCreateBody: z.ZodType<
  V1AiVideoUpscalerCreateBody, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    assets: Schemas$V1AiVideoUpscalerCreateBodyAssets.in,
    end_seconds: z.number(),
    name: z.string().optional(),
    resolution: z.enum(["1080p", "2k", "4k", "720p"]),
    start_seconds: z.number().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      end_seconds: "endSeconds",
      name: "name",
      resolution: "resolution",
      start_seconds: "startSeconds",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiVideoUpscalerCreateBody
 */
const SchemaOut$V1AiVideoUpscalerCreateBody: z.ZodType<
  External$V1AiVideoUpscalerCreateBody, // output type of this zod object
  z.ZodTypeDef,
  V1AiVideoUpscalerCreateBody // the object to be transformed
> = z
  .object({
    assets: Schemas$V1AiVideoUpscalerCreateBodyAssets.out,
    endSeconds: z.number(),
    name: z.string().optional(),
    resolution: z.enum(["1080p", "2k", "4k", "720p"]),
    startSeconds: z.number().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      endSeconds: "end_seconds",
      name: "name",
      resolution: "resolution",
      startSeconds: "start_seconds",
    });
  });

export const Schemas$V1AiVideoUpscalerCreateBody = {
  in: SchemaIn$V1AiVideoUpscalerCreateBody,
  out: SchemaOut$V1AiVideoUpscalerCreateBody,
};
