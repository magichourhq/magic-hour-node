import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * Attributes used to dictate the style of the output
 */
export type V1AiTalkingPhotoCreateBodyStyle = {
  /**
   * Controls overall motion style.
   * * `realistic` - Maintains likeness well, high quality, and reliable.
   * * `prompted` - Slightly lower likeness; allows option to prompt scene.
   *
   * **Deprecated values (maintained for backward compatibility):**
   * * `pro` - Deprecated: use `realistic`
   * * `standard` - Deprecated: use `prompted`
   * * `stable` - Deprecated: use `realistic`
   * * `expressive` - Deprecated: use `prompted`
   */
  generationMode?:
    | ("expressive" | "pro" | "prompted" | "realistic" | "stable" | "standard")
    | undefined;
  /**
   * Note: this value is only applicable when generation_mode is `expressive`. The value can include up to 2 decimal places.
   * * Lower values yield more stability but can suppress mouth movement.
   * * Higher values increase motion and expressiveness, with a higher risk of distortion.
   */
  intensity?: number | undefined;
  /**
   * A text prompt to guide the generation. Only applicable when generation_mode is `prompted`.
   * This field is ignored for other modes.
   */
  prompt?: string | undefined;
};

/**
 * @internal
 * V1AiTalkingPhotoCreateBodyStyle without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiTalkingPhotoCreateBodyStyle = {
  generation_mode?:
    | ("expressive" | "pro" | "prompted" | "realistic" | "stable" | "standard")
    | undefined;
  intensity?: number | undefined;
  prompt?: string | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiTalkingPhotoCreateBodyStyle
 */
const SchemaIn$V1AiTalkingPhotoCreateBodyStyle: z.ZodType<
  V1AiTalkingPhotoCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    generation_mode: z
      .enum([
        "expressive",
        "pro",
        "prompted",
        "realistic",
        "stable",
        "standard",
      ])
      .optional(),
    intensity: z.number().optional(),
    prompt: z.string().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      generation_mode: "generationMode",
      intensity: "intensity",
      prompt: "prompt",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiTalkingPhotoCreateBodyStyle
 */
const SchemaOut$V1AiTalkingPhotoCreateBodyStyle: z.ZodType<
  External$V1AiTalkingPhotoCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  V1AiTalkingPhotoCreateBodyStyle // the object to be transformed
> = z
  .object({
    generationMode: z
      .enum([
        "expressive",
        "pro",
        "prompted",
        "realistic",
        "stable",
        "standard",
      ])
      .optional(),
    intensity: z.number().optional(),
    prompt: z.string().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      generationMode: "generation_mode",
      intensity: "intensity",
      prompt: "prompt",
    });
  });

export const Schemas$V1AiTalkingPhotoCreateBodyStyle = {
  in: SchemaIn$V1AiTalkingPhotoCreateBodyStyle,
  out: SchemaOut$V1AiTalkingPhotoCreateBodyStyle,
};
