import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * PostV1AiImageUpscalerBodyStyle
 */
export type PostV1AiImageUpscalerBodyStyle = {
  enhancement: "Balanced" | "Creative" | "Resemblance";
  /**
   * A prompt to guide the final image. This value is ignored if `enhancement` is not Creative
   */
  prompt?: string | undefined;
};

/**
 * @internal
 * PostV1AiImageUpscalerBodyStyle without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1AiImageUpscalerBodyStyle = {
  enhancement: "Balanced" | "Creative" | "Resemblance";
  prompt?: string | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1AiImageUpscalerBodyStyle
 */
const SchemaIn$PostV1AiImageUpscalerBodyStyle: z.ZodType<
  PostV1AiImageUpscalerBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    enhancement: z.enum(["Balanced", "Creative", "Resemblance"]),
    prompt: z.string().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      enhancement: "enhancement",
      prompt: "prompt",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1AiImageUpscalerBodyStyle
 */
const SchemaOut$PostV1AiImageUpscalerBodyStyle: z.ZodType<
  External$PostV1AiImageUpscalerBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  PostV1AiImageUpscalerBodyStyle // the object to be transformed
> = z
  .object({
    enhancement: z.enum(["Balanced", "Creative", "Resemblance"]),
    prompt: z.string().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      enhancement: "enhancement",
      prompt: "prompt",
    });
  });

export const Schemas$PostV1AiImageUpscalerBodyStyle = {
  in: SchemaIn$PostV1AiImageUpscalerBodyStyle,
  out: SchemaOut$PostV1AiImageUpscalerBodyStyle,
};
