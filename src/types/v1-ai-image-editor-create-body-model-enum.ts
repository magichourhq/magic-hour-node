/**
 * The AI model to use for image editing. Each model has different capabilities and costs.
 *
 * **Models:**
 * - `default` - Use the model we recommend, which will change over time. This is recommended unless you need a specific model. This is the default behavior.
 * - `qwen-edit` - from 10 credits/image
 *   - Supported resolutions: 640px, 1k, 2k
 *   - Available for tiers: free, creator, pro, business
 *   - Max additional input images: 2
 * - `nano-banana` - from 50 credits/image
 *   - Supported resolutions: 640px, 1k
 *   - Available for tiers: free, creator, pro, business
 *   - Max additional input images: 9
 * - `nano-banana-2` - from 100 credits/image
 *   - Supported resolutions: 640px, 1k, 2k, 4k
 *   - Available for tiers: free, creator, pro, business
 *   - Max additional input images: 9
 * - `seedream-v4` - from 40 credits/image
 *   - Supported resolutions: 640px, 1k, 2k, 4k
 *   - Available for tiers: free, creator, pro, business
 *   - Max additional input images: 9
 * - `nano-banana-pro` - from 150 credits/image
 *   - Supported resolutions: 1k, 2k, 4k
 *   - Available for tiers: creator, pro, business
 *   - Max additional input images: 9
 * - `seedream-v4.5` - from 50 credits/image
 *   - Supported resolutions: 640px, 1k, 2k, 4k
 *   - Available for tiers: creator, pro, business
 *   - Max additional input images: 9
 *
 */
export type V1AiImageEditorCreateBodyModelEnum =
  | "default"
  | "nano-banana"
  | "nano-banana-2"
  | "nano-banana-pro"
  | "qwen-edit"
  | "seedream-v4"
  | "seedream-v4.5";
