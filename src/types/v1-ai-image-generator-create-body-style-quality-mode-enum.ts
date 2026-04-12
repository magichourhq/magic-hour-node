/**
 * DEPRECATED: Use `model` field instead for explicit model selection.
 *
 * Legacy quality mode mapping:
 * - `standard` → `z-image-turbo` model
 * - `pro` → `seedream-v4` model
 *
 * If model is specified, it will take precedence over the legacy quality_mode field.
 */
export type V1AiImageGeneratorCreateBodyStyleQualityModeEnum =
  | "pro"
  | "standard";
