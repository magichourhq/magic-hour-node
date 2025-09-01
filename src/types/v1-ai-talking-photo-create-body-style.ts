import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * Attributes used to dictate the style of the output
 */
export type V1AiTalkingPhotoCreateBodyStyle = {
  /**
   * Controls overall motion style.
   * * `pro` -  Realistic, high fidelity, accurate lip sync, slower.
   * * `expressive` - More motion and facial expressiveness; may introduce visual artifacts.
   * * `stable` -  Reduced motion for cleaner output; may result in minimal animation. (Deprecated: passing this value will be treated as `pro`)
   */
  generationMode?: ("expressive" | "pro" | "stable") | undefined;
  /**
   * Note: this value is only applicable when generation_mode is `expressive`. The value can include up to 2 decimal places.
   * * Lower values yield more stability but can suppress mouth movement.
   * * Higher values increase motion and expressiveness, with a higher risk of distortion.
   */
  intensity?: number | undefined;
};

/**
 * @internal
 * V1AiTalkingPhotoCreateBodyStyle without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiTalkingPhotoCreateBodyStyle = {
  generation_mode?: ("expressive" | "pro" | "stable") | undefined;
  intensity?: number | undefined;
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
    generation_mode: z.enum(["expressive", "pro", "stable"]).optional(),
    intensity: z.number().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      generation_mode: "generationMode",
      intensity: "intensity",
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
    generationMode: z.enum(["expressive", "pro", "stable"]).optional(),
    intensity: z.number().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      generationMode: "generation_mode",
      intensity: "intensity",
    });
  });

export const Schemas$V1AiTalkingPhotoCreateBodyStyle = {
  in: SchemaIn$V1AiTalkingPhotoCreateBodyStyle,
  out: SchemaOut$V1AiTalkingPhotoCreateBodyStyle,
};
