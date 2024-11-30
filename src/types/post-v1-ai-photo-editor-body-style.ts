/**
 * Generated by Sideko (sideko.dev)
 **/

/**
 * PostV1AiPhotoEditorBodyStyle
 */
export type PostV1AiPhotoEditorBodyStyle = {
  /**
   * Use this to describe what your input image is. This helps maintain aspects of the image you don't want to change.
   */
  image_description: string;
  /**
   * Determines the input image's influence. Higher values align the output more with the initial image.
   */
  likeness_strength: number;
  /**
   * What you want to avoid seeing in the final output; has a minor effect.
   */
  negative_prompt?: string;
  /**
   * What you want your final output to look like. We recommend starting with the image description and making minor edits for best results.
   */
  prompt: string;
  /**
   * Determines the prompt's influence. Higher values align the output more with the prompt.
   */
  prompt_strength: number;
};