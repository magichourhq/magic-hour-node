import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * PostV1AiImageGeneratorBodyStyle
 */
export type PostV1AiImageGeneratorBodyStyle = {
  /**
   * The prompt used for the image.
   */
  prompt: string;
};

/**
 * @internal
 * PostV1AiImageGeneratorBodyStyle without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1AiImageGeneratorBodyStyle = {
  prompt: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1AiImageGeneratorBodyStyle
 */
const SchemaIn$PostV1AiImageGeneratorBodyStyle: z.ZodType<
  PostV1AiImageGeneratorBodyStyle, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1AiImageGeneratorBodyStyle
 */
const SchemaOut$PostV1AiImageGeneratorBodyStyle: z.ZodType<
  External$PostV1AiImageGeneratorBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  PostV1AiImageGeneratorBodyStyle // the object to be transformed
> = z
  .object({
    prompt: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      prompt: "prompt",
    });
  });

export const Schemas$PostV1AiImageGeneratorBodyStyle = {
  in: SchemaIn$PostV1AiImageGeneratorBodyStyle,
  out: SchemaOut$PostV1AiImageGeneratorBodyStyle,
};
