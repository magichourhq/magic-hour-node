/**
 * The aspect ratio of the output image(s). If not specified, defaults to `auto`. Ignored for `krea-2` and `flux-2-klein` when an input image is provided; the output keeps the source image's aspect ratio.
 */
export type V1AiImageEditorCreateBodyAspectRatioEnum =
  | "16:9"
  | "1:1"
  | "2:3"
  | "3:2"
  | "4:3"
  | "4:5"
  | "9:16"
  | "auto";
