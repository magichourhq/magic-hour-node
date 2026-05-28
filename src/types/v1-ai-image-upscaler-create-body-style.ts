import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * Style settings for the upscale. Use `mode` to select between `"pro"` (faster, no enhancement required) and `"creative"` (defaults to `"Balanced"` enhancement). Defaults to `"creative"`.
 */
export type V1AiImageUpscalerCreateBodyStyle = {
  enhancement?: ("Balanced" | "Creative" | "Resemblance") | undefined;
  /**
   * The upscaling mode. `"pro"` is faster and does not require `enhancement`. `"creative"` requires `enhancement`. Defaults to `"creative"`.
   */
  mode?: ("creative" | "pro") | undefined;
  /**
   * A prompt to guide the final image. This value is ignored if `enhancement` is not Creative
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
  mode?: ("creative" | "pro") | undefined;
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
    mode: z.enum(["creative", "pro"]).optional(),
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
    mode: z.enum(["creative", "pro"]).optional(),
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
