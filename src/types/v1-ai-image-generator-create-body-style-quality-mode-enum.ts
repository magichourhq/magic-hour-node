/**
 * Controls the quality of the generated image. Defaults to 'standard' if not specified.
 *
 * **Options:**
 * - `standard` - Standard quality generation. Cost: 5 credits per image.
 * - `pro` - Pro quality generation with enhanced details and quality. Cost: 30 credits per image.
 *
 * Note: Pro mode is available for users on Creator, Pro, or Business tier.
 */
export type V1AiImageGeneratorCreateBodyStyleQualityModeEnum =
  | "pro"
  | "standard";
