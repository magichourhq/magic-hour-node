import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1AiVideoUpscalerCreateBodyAssets,
  Schemas$V1AiVideoUpscalerCreateBodyAssets,
  V1AiVideoUpscalerCreateBodyAssets,
} from "magic-hour/types/v1-ai-video-upscaler-create-body-assets";

/**
 * CreateRequest
 */
export type CreateRequest = {
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
 * CreateRequest without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$CreateRequest = {
  assets: External$V1AiVideoUpscalerCreateBodyAssets;
  end_seconds: number;
  name?: string | undefined;
  resolution: "1080p" | "2k" | "4k" | "720p";
  start_seconds?: number | undefined;
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$CreateRequest
 */
const SchemaOut$CreateRequest: z.ZodType<
  External$CreateRequest, // output type of this zod object
  z.ZodTypeDef,
  CreateRequest // the object to be transformed
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

export const Schemas$CreateRequest = {
  in: SchemaIn$CreateRequest,
  out: SchemaOut$CreateRequest,
};
