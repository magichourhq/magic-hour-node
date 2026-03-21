/**
 * Maximum resolution for the generated image.
 *
 * **Options:**
 * - `auto` - Automatic resolution (all tiers, default)
 * - `2k` - Up to 2048px (requires Pro or Business tier)
 * - `4k` - Up to 4096px (requires Business tier)
 *
 * Note: Resolution availability depends on your subscription tier. Defaults to `auto` if not specified.
 */
export type V1AiImageEditorCreateBodyResolutionEnum = "2k" | "4k" | "auto";
