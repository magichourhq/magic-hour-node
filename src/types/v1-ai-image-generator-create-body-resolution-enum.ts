/**
 * Maximum resolution for the generated image.
 *
 * **Options:**
 * - `auto` - Automatic resolution (all tiers, default)
 * - `2k` - Up to 2048px (requires Pro or Business tier)
 * - `4k` - Up to 4096px (requires Business tier)
 *
 * Note: Resolution availability depends on the model and your subscription tier. See `model` field for which resolutions each model supports. Defaults to `auto` if not specified.
 */
export type V1AiImageGeneratorCreateBodyResolutionEnum = "2k" | "4k" | "auto";
