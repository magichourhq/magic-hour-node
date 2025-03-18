import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * PostV1AiHeadshotGeneratorBodyStyle
 */
export type PostV1AiHeadshotGeneratorBodyStyle = {
  /**
   * A prompt to guide the final image.
   */
  prompt?: string | undefined;
};

/**
 * @internal
 * PostV1AiHeadshotGeneratorBodyStyle without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1AiHeadshotGeneratorBodyStyle = {
  prompt?: string | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1AiHeadshotGeneratorBodyStyle
 */
const SchemaIn$PostV1AiHeadshotGeneratorBodyStyle: z.ZodType<
  PostV1AiHeadshotGeneratorBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    prompt: z.string().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      prompt: "prompt",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1AiHeadshotGeneratorBodyStyle
 */
const SchemaOut$PostV1AiHeadshotGeneratorBodyStyle: z.ZodType<
  External$PostV1AiHeadshotGeneratorBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  PostV1AiHeadshotGeneratorBodyStyle // the object to be transformed
> = z
  .object({
    prompt: z.string().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      prompt: "prompt",
    });
  });

export const Schemas$PostV1AiHeadshotGeneratorBodyStyle = {
  in: SchemaIn$PostV1AiHeadshotGeneratorBodyStyle,
  out: SchemaOut$PostV1AiHeadshotGeneratorBodyStyle,
};
