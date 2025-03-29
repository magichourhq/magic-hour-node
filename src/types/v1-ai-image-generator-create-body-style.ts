import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * V1AiImageGeneratorCreateBodyStyle
 */
export type V1AiImageGeneratorCreateBodyStyle = {
  /**
   * The prompt used for the image.
   */
  prompt: string;
};

/**
 * @internal
 * V1AiImageGeneratorCreateBodyStyle without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiImageGeneratorCreateBodyStyle = {
  prompt: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiImageGeneratorCreateBodyStyle
 */
const SchemaIn$V1AiImageGeneratorCreateBodyStyle: z.ZodType<
  V1AiImageGeneratorCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    prompt: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      prompt: "prompt",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiImageGeneratorCreateBodyStyle
 */
const SchemaOut$V1AiImageGeneratorCreateBodyStyle: z.ZodType<
  External$V1AiImageGeneratorCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  V1AiImageGeneratorCreateBodyStyle // the object to be transformed
> = z
  .object({
    prompt: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      prompt: "prompt",
    });
  });

export const Schemas$V1AiImageGeneratorCreateBodyStyle = {
  in: SchemaIn$V1AiImageGeneratorCreateBodyStyle,
  out: SchemaOut$V1AiImageGeneratorCreateBodyStyle,
};
