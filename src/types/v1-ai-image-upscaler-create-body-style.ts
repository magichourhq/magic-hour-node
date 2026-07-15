import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * Style settings for the upscale. Use `mode` (`"preserve"`, `"balanced"`, or `"creative"`). Defaults to `"balanced"`.
 */
export type V1AiImageUpscalerCreateBodyStyle = {
  /**
   * Deprecated: use `mode` instead. `"Resemblance"` maps to `"preserve"`. `"Balanced"` and `"Creative"` map to the same-named modes.
   */
  enhancement?: ("Balanced" | "Creative" | "Resemblance") | undefined;
  /**
   * The upscaling mode. `"preserve"` uses the fast pro pipeline (1× credit multiplier). `"balanced"` and `"creative"` use the creative pipeline (2× credit multiplier). `"pro"` is deprecated and maps to `"preserve"`. Defaults to `"balanced"`.
   */
  mode?: ("balanced" | "creative" | "preserve" | "pro") | undefined;
  /**
   * A prompt to guide the final image. Only used when mode is `creative`.
   */
  prompt?: string | undefined;
};

/**
 * @internal
 * V1AiImageUpscalerCreateBodyStyle without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiImageUpscalerCreateBodyStyle = {
  enhancement?: ("Balanced" | "Creative" | "Resemblance") | undefined;
  mode?: ("balanced" | "creative" | "preserve" | "pro") | undefined;
  prompt?: string | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiImageUpscalerCreateBodyStyle
 */
const SchemaIn$V1AiImageUpscalerCreateBodyStyle: z.ZodType<
  V1AiImageUpscalerCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    enhancement: z.enum(["Balanced", "Creative", "Resemblance"]).optional(),
    mode: z.enum(["balanced", "creative", "preserve", "pro"]).optional(),
    prompt: z.string().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      enhancement: "enhancement",
      mode: "mode",
      prompt: "prompt",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiImageUpscalerCreateBodyStyle
 */
const SchemaOut$V1AiImageUpscalerCreateBodyStyle: z.ZodType<
  External$V1AiImageUpscalerCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  V1AiImageUpscalerCreateBodyStyle // the object to be transformed
> = z
  .object({
    enhancement: z.enum(["Balanced", "Creative", "Resemblance"]).optional(),
    mode: z.enum(["balanced", "creative", "preserve", "pro"]).optional(),
    prompt: z.string().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      enhancement: "enhancement",
      mode: "mode",
      prompt: "prompt",
    });
  });

export const Schemas$V1AiImageUpscalerCreateBodyStyle = {
  in: SchemaIn$V1AiImageUpscalerCreateBodyStyle,
  out: SchemaOut$V1AiImageUpscalerCreateBodyStyle,
};
