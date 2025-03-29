import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * V1AiPhotoEditorCreateBodyStyle
 */
export type V1AiPhotoEditorCreateBodyStyle = {
  /**
   * Use this to describe what your input image is. This helps maintain aspects of the image you don't want to change.
   */
  imageDescription: string;
  /**
   * Determines the input image's influence. Higher values align the output more with the initial image.
   */
  likenessStrength: number;
  /**
   * What you want to avoid seeing in the final output; has a minor effect.
   */
  negativePrompt?: string | undefined;
  /**
   * What you want your final output to look like. We recommend starting with the image description and making minor edits for best results.
   */
  prompt: string;
  /**
   * Determines the prompt's influence. Higher values align the output more with the prompt.
   */
  promptStrength: number;
  /**
   * Number of iterations used to generate the output. Higher values improve quality and increase the strength of the prompt but increase processing time.
   */
  steps?: number | undefined;
};

/**
 * @internal
 * V1AiPhotoEditorCreateBodyStyle without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiPhotoEditorCreateBodyStyle = {
  image_description: string;
  likeness_strength: number;
  negative_prompt?: string | undefined;
  prompt: string;
  prompt_strength: number;
  steps?: number | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiPhotoEditorCreateBodyStyle
 */
const SchemaIn$V1AiPhotoEditorCreateBodyStyle: z.ZodType<
  V1AiPhotoEditorCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    image_description: z.string(),
    likeness_strength: z.number(),
    negative_prompt: z.string().optional(),
    prompt: z.string(),
    prompt_strength: z.number(),
    steps: z.number().int().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      image_description: "imageDescription",
      likeness_strength: "likenessStrength",
      negative_prompt: "negativePrompt",
      prompt: "prompt",
      prompt_strength: "promptStrength",
      steps: "steps",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiPhotoEditorCreateBodyStyle
 */
const SchemaOut$V1AiPhotoEditorCreateBodyStyle: z.ZodType<
  External$V1AiPhotoEditorCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  V1AiPhotoEditorCreateBodyStyle // the object to be transformed
> = z
  .object({
    imageDescription: z.string(),
    likenessStrength: z.number(),
    negativePrompt: z.string().optional(),
    prompt: z.string(),
    promptStrength: z.number(),
    steps: z.number().int().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      imageDescription: "image_description",
      likenessStrength: "likeness_strength",
      negativePrompt: "negative_prompt",
      prompt: "prompt",
      promptStrength: "prompt_strength",
      steps: "steps",
    });
  });

export const Schemas$V1AiPhotoEditorCreateBodyStyle = {
  in: SchemaIn$V1AiPhotoEditorCreateBodyStyle,
  out: SchemaOut$V1AiPhotoEditorCreateBodyStyle,
};
