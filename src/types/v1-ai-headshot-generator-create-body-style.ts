import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * V1AiHeadshotGeneratorCreateBodyStyle
 */
export type V1AiHeadshotGeneratorCreateBodyStyle = {
  /**
   * Prompt used to guide the style of your headshot. We recommend omitting the prompt unless you want to customize your headshot. You can visit [AI headshot generator](https://magichour.ai/create/ai-headshot-generator) to view an example of a good prompt used for our 'Professional' style.
   */
  prompt?: string | undefined;
};

/**
 * @internal
 * V1AiHeadshotGeneratorCreateBodyStyle without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiHeadshotGeneratorCreateBodyStyle = {
  prompt?: string | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiHeadshotGeneratorCreateBodyStyle
 */
const SchemaIn$V1AiHeadshotGeneratorCreateBodyStyle: z.ZodType<
  V1AiHeadshotGeneratorCreateBodyStyle, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiHeadshotGeneratorCreateBodyStyle
 */
const SchemaOut$V1AiHeadshotGeneratorCreateBodyStyle: z.ZodType<
  External$V1AiHeadshotGeneratorCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  V1AiHeadshotGeneratorCreateBodyStyle // the object to be transformed
> = z
  .object({
    prompt: z.string().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      prompt: "prompt",
    });
  });

export const Schemas$V1AiHeadshotGeneratorCreateBodyStyle = {
  in: SchemaIn$V1AiHeadshotGeneratorCreateBodyStyle,
  out: SchemaOut$V1AiHeadshotGeneratorCreateBodyStyle,
};
