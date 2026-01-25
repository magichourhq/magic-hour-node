/**
 * The AI model to use for image editing.
 * * `Nano Banana` - Precise, realistic edits with consistent results
 * * `Seedream` - Creative, imaginative images with artistic freedom
 * * `default` - Use the model we recommend, which will change over time. This is recommended unless you need a specific model. This is the default behavior.
 */
export type V1AiImageEditorCreateBodyStyleModelEnum =
  | "Nano Banana"
  | "Seedream"
  | "default";
