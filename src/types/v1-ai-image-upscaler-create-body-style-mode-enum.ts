/**
 * The upscaling mode. `"preserve"` uses the fast pro pipeline (1× credit multiplier). `"balanced"` and `"creative"` use the creative pipeline (2× credit multiplier). `"pro"` is deprecated and maps to `"preserve"`. Defaults to `"balanced"`.
 */
export type V1AiImageUpscalerCreateBodyStyleModeEnum =
  | "balanced"
  | "creative"
  | "preserve"
  | "pro";
