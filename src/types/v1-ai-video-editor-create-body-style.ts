import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * V1AiVideoEditorCreateBodyStyle
 */
export type V1AiVideoEditorCreateBodyStyle = {
  /**
   * The prompt used to edit the video.
   */
  prompt: string;
};

/**
 * @internal
 * V1AiVideoEditorCreateBodyStyle without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiVideoEditorCreateBodyStyle = {
  prompt: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiVideoEditorCreateBodyStyle
 */
const SchemaIn$V1AiVideoEditorCreateBodyStyle: z.ZodType<
  V1AiVideoEditorCreateBodyStyle, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiVideoEditorCreateBodyStyle
 */
const SchemaOut$V1AiVideoEditorCreateBodyStyle: z.ZodType<
  External$V1AiVideoEditorCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  V1AiVideoEditorCreateBodyStyle // the object to be transformed
> = z
  .object({
    prompt: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      prompt: "prompt",
    });
  });

export const Schemas$V1AiVideoEditorCreateBodyStyle = {
  in: SchemaIn$V1AiVideoEditorCreateBodyStyle,
  out: SchemaOut$V1AiVideoEditorCreateBodyStyle,
};
