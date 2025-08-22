import * as z from "zod";

import { zodTransform } from "magic-hour/core";

/**
 * V1AiImageEditorCreateBodyStyle
 */
export type V1AiImageEditorCreateBodyStyle = {
  /**
   * The prompt used to edit the image.
   */
  prompt: string;
};

/**
 * @internal
 * V1AiImageEditorCreateBodyStyle without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiImageEditorCreateBodyStyle = {
  prompt: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiImageEditorCreateBodyStyle
 */
const SchemaIn$V1AiImageEditorCreateBodyStyle: z.ZodType<
  V1AiImageEditorCreateBodyStyle, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiImageEditorCreateBodyStyle
 */
const SchemaOut$V1AiImageEditorCreateBodyStyle: z.ZodType<
  External$V1AiImageEditorCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  V1AiImageEditorCreateBodyStyle // the object to be transformed
> = z
  .object({
    prompt: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      prompt: "prompt",
    });
  });

export const Schemas$V1AiImageEditorCreateBodyStyle = {
  in: SchemaIn$V1AiImageEditorCreateBodyStyle,
  out: SchemaOut$V1AiImageEditorCreateBodyStyle,
};
