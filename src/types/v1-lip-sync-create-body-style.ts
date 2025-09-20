import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * Attributes used to dictate the style of the output
 */
export type V1LipSyncCreateBodyStyle = {
  /**
   * A specific version of our lip sync system, optimized for different needs.
   * * `lite` -  Fast and affordable lip sync - best for simple videos. Costs 1 credit per frame of video.
   * * `standard` -  Natural, accurate lip sync - best for most creators. Costs 1 credit per frame of video.
   * * `pro` -  Premium fidelity with enhanced detail - best for professionals. Costs 2 credits per frame of video.
   *
   * Note: `standard` and `pro` are only available for users on Creator, Pro, and Business tiers.
   *
   */
  generationMode?: ("lite" | "pro" | "standard") | undefined;
};

/**
 * @internal
 * V1LipSyncCreateBodyStyle without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1LipSyncCreateBodyStyle = {
  generation_mode?: ("lite" | "pro" | "standard") | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1LipSyncCreateBodyStyle
 */
const SchemaIn$V1LipSyncCreateBodyStyle: z.ZodType<
  V1LipSyncCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    generation_mode: z.enum(["lite", "pro", "standard"]).optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      generation_mode: "generationMode",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1LipSyncCreateBodyStyle
 */
const SchemaOut$V1LipSyncCreateBodyStyle: z.ZodType<
  External$V1LipSyncCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  V1LipSyncCreateBodyStyle // the object to be transformed
> = z
  .object({
    generationMode: z.enum(["lite", "pro", "standard"]).optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      generationMode: "generation_mode",
    });
  });

export const Schemas$V1LipSyncCreateBodyStyle = {
  in: SchemaIn$V1LipSyncCreateBodyStyle,
  out: SchemaOut$V1LipSyncCreateBodyStyle,
};
