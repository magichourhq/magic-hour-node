import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * V1AiGifGeneratorCreateBodyStyle
 */
export type V1AiGifGeneratorCreateBodyStyle = {
  /**
   * The prompt used for the GIF.
   */
  prompt: string;
};

/**
 * @internal
 * V1AiGifGeneratorCreateBodyStyle without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiGifGeneratorCreateBodyStyle = {
  prompt: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiGifGeneratorCreateBodyStyle
 */
const SchemaIn$V1AiGifGeneratorCreateBodyStyle: z.ZodType<
  V1AiGifGeneratorCreateBodyStyle, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiGifGeneratorCreateBodyStyle
 */
const SchemaOut$V1AiGifGeneratorCreateBodyStyle: z.ZodType<
  External$V1AiGifGeneratorCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  V1AiGifGeneratorCreateBodyStyle // the object to be transformed
> = z
  .object({
    prompt: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      prompt: "prompt",
    });
  });

export const Schemas$V1AiGifGeneratorCreateBodyStyle = {
  in: SchemaIn$V1AiGifGeneratorCreateBodyStyle,
  out: SchemaOut$V1AiGifGeneratorCreateBodyStyle,
};
