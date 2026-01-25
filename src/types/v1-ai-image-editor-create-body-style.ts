import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * V1AiImageEditorCreateBodyStyle
 */
export type V1AiImageEditorCreateBodyStyle = {
  /**
   * The AI model to use for image editing.
   * * `Nano Banana` - Precise, realistic edits with consistent results
   * * `Seedream` - Creative, imaginative images with artistic freedom
   * * `default` - Use the model we recommend, which will change over time. This is recommended unless you need a specific model. This is the default behavior.
   */
  model?: ("Nano Banana" | "Seedream" | "default") | undefined;
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
  model?: ("Nano Banana" | "Seedream" | "default") | undefined;
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
    model: z.enum(["Nano Banana", "Seedream", "default"]).optional(),
    prompt: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      model: "model",
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
    model: z.enum(["Nano Banana", "Seedream", "default"]).optional(),
    prompt: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      model: "model",
      prompt: "prompt",
    });
  });

export const Schemas$V1AiImageEditorCreateBodyStyle = {
  in: SchemaIn$V1AiImageEditorCreateBodyStyle,
  out: SchemaOut$V1AiImageEditorCreateBodyStyle,
};
