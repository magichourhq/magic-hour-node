import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1CharacterReplaceCreateBodyAssets,
  Schemas$V1CharacterReplaceCreateBodyAssets,
  V1CharacterReplaceCreateBodyAssets,
} from "./v1-character-replace-create-body-assets";
import {
  External$V1CharacterReplaceCreateBodyStyle,
  Schemas$V1CharacterReplaceCreateBodyStyle,
  V1CharacterReplaceCreateBodyStyle,
} from "./v1-character-replace-create-body-style";

/**
 * V1CharacterReplaceCreateBody
 */
export type V1CharacterReplaceCreateBody = {
  /**
   * Source video and reference character image for the job.
   */
  assets: V1CharacterReplaceCreateBodyAssets;
  /**
   * End time of your clip (seconds). Must be greater than start_seconds.
   */
  endSeconds: number;
  /**
   * Give your video a custom name for easy identification.
   */
  name?: string | undefined;
  /**
   * Output video resolution. Defaults to 480p, the lowest resolution available on your plan.
   */
  resolution?: ("480p" | "720p") | undefined;
  /**
   * Start time of your clip (seconds). Must be ≥ 0.
   */
  startSeconds?: number | undefined;
  /**
   * Optional style controls for replace vs animate mode and subject selection.
   */
  style?: V1CharacterReplaceCreateBodyStyle | undefined;
};

/**
 * @internal
 * V1CharacterReplaceCreateBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1CharacterReplaceCreateBody = {
  assets: External$V1CharacterReplaceCreateBodyAssets;
  end_seconds: number;
  name?: string | undefined;
  resolution?: ("480p" | "720p") | undefined;
  start_seconds?: number | undefined;
  style?: External$V1CharacterReplaceCreateBodyStyle | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1CharacterReplaceCreateBody
 */
const SchemaIn$V1CharacterReplaceCreateBody: z.ZodType<
  V1CharacterReplaceCreateBody, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    assets: Schemas$V1CharacterReplaceCreateBodyAssets.in,
    end_seconds: z.number(),
    name: z.string().optional(),
    resolution: z.enum(["480p", "720p"]).optional(),
    start_seconds: z.number().optional(),
    style: Schemas$V1CharacterReplaceCreateBodyStyle.in.optional(),
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1CharacterReplaceCreateBody
 */
const SchemaOut$V1CharacterReplaceCreateBody: z.ZodType<
  External$V1CharacterReplaceCreateBody, // output type of this zod object
  z.ZodTypeDef,
  V1CharacterReplaceCreateBody // the object to be transformed
> = z
  .object({
    assets: Schemas$V1CharacterReplaceCreateBodyAssets.out,
    endSeconds: z.number(),
    name: z.string().optional(),
    resolution: z.enum(["480p", "720p"]).optional(),
    startSeconds: z.number().optional(),
    style: Schemas$V1CharacterReplaceCreateBodyStyle.out.optional(),
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

export const Schemas$V1CharacterReplaceCreateBody = {
  in: SchemaIn$V1CharacterReplaceCreateBody,
  out: SchemaOut$V1CharacterReplaceCreateBody,
};
