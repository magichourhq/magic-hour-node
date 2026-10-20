import { zodRequiredAny, zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1AiUgcAdCreateBodyAssets,
  Schemas$V1AiUgcAdCreateBodyAssets,
  V1AiUgcAdCreateBodyAssets,
} from "./v1-ai-ugc-ad-create-body-assets";

/**
 * V1AiUgcAdCreateBody
 */
export type V1AiUgcAdCreateBody = {
  assets: V1AiUgcAdCreateBodyAssets;
  /**
   * Video duration in seconds. Supported values by model:
   * * kling-3.0: 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 seconds.
   * * ltx-2.5: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60 seconds.
   * * veo3.1: 4, 6, 8, 15, 22, 29, 36, 43, 50, 57, 64, 71, 78, 85, 92, 99, 106, 113, 120, 127, 134, 141 seconds.
   * Free plans are limited to 5 seconds unless a credit pack has been purchased.
   */
  endSeconds: number;
  /**
   * Defaults to kling-3.0 on paid plans and ltx-2.5 on free plans.
   */
  model?: ("kling-3.0" | "ltx-2.5" | "veo3.1") | undefined;
  /**
   * Defaults to 720p on paid plans and 480p on free plans. Unsupported model/resolution combinations and resolutions unavailable for your plan are rejected.
   */
  resolution?: ("1080p" | "480p" | "720p") | undefined;
  /**
   * The words the actor should speak. Character limits apply after trimming:
   * * kling-3.0: 2500 characters.
   * * ltx-2.5: 1804 characters.
   * * veo3.1: 2500 characters.
   * LTX's dialogue wrapper counts toward its model prompt limit.
   */
  script: string;

  // Index types must also accommodate all defined properties if present (typescript limitation)
  // In reality all additional properties should only have type `any`
  // (there might be some duplication here)
  [additionalProperty: string]:
    | V1AiUgcAdCreateBodyAssets
    | number
    | (("kling-3.0" | "ltx-2.5" | "veo3.1") | undefined)
    | (("1080p" | "480p" | "720p") | undefined)
    | string
    | any
    | null
    | undefined;
};

/**
 * @internal
 * V1AiUgcAdCreateBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiUgcAdCreateBody = {
  assets: External$V1AiUgcAdCreateBodyAssets;
  end_seconds: number;
  model?: ("kling-3.0" | "ltx-2.5" | "veo3.1") | undefined;
  resolution?: ("1080p" | "480p" | "720p") | undefined;
  script: string;

  [additionalProperty: string]:
    | External$V1AiUgcAdCreateBodyAssets
    | number
    | (("kling-3.0" | "ltx-2.5" | "veo3.1") | undefined)
    | (("1080p" | "480p" | "720p") | undefined)
    | string
    | External$V1AiUgcAdCreateBody
    | null
    | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiUgcAdCreateBody
 */
const SchemaIn$V1AiUgcAdCreateBody: z.ZodType<
  V1AiUgcAdCreateBody, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    assets: Schemas$V1AiUgcAdCreateBodyAssets.in,
    end_seconds: z.number(),
    model: z.enum(["kling-3.0", "ltx-2.5", "veo3.1"]).optional(),
    resolution: z.enum(["1080p", "480p", "720p"]).optional(),
    script: z.string(),
  })
  .catchall(zodRequiredAny)
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      end_seconds: "endSeconds",
      model: "model",
      resolution: "resolution",
      script: "script",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiUgcAdCreateBody
 */
const SchemaOut$V1AiUgcAdCreateBody: z.ZodType<
  External$V1AiUgcAdCreateBody, // output type of this zod object
  z.ZodTypeDef,
  V1AiUgcAdCreateBody // the object to be transformed
> = z
  .object({
    assets: Schemas$V1AiUgcAdCreateBodyAssets.out,
    endSeconds: z.number(),
    model: z.enum(["kling-3.0", "ltx-2.5", "veo3.1"]).optional(),
    resolution: z.enum(["1080p", "480p", "720p"]).optional(),
    script: z.string(),
  })
  .catchall(zodRequiredAny)
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      endSeconds: "end_seconds",
      model: "model",
      resolution: "resolution",
      script: "script",
    });
  });

export const Schemas$V1AiUgcAdCreateBody = {
  in: SchemaIn$V1AiUgcAdCreateBody,
  out: SchemaOut$V1AiUgcAdCreateBody,
};
