import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * V1AiVoiceClonerCreateBodyStyle
 */
export type V1AiVoiceClonerCreateBodyStyle = {
  /**
   * Text used to generate speech from the cloned voice. The character limit is 1000 characters.
   */
  prompt: string;
};

/**
 * @internal
 * V1AiVoiceClonerCreateBodyStyle without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiVoiceClonerCreateBodyStyle = {
  prompt: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiVoiceClonerCreateBodyStyle
 */
const SchemaIn$V1AiVoiceClonerCreateBodyStyle: z.ZodType<
  V1AiVoiceClonerCreateBodyStyle, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiVoiceClonerCreateBodyStyle
 */
const SchemaOut$V1AiVoiceClonerCreateBodyStyle: z.ZodType<
  External$V1AiVoiceClonerCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  V1AiVoiceClonerCreateBodyStyle // the object to be transformed
> = z
  .object({
    prompt: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      prompt: "prompt",
    });
  });

export const Schemas$V1AiVoiceClonerCreateBodyStyle = {
  in: SchemaIn$V1AiVoiceClonerCreateBodyStyle,
  out: SchemaOut$V1AiVoiceClonerCreateBodyStyle,
};
