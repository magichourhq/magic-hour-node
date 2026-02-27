/**
 * The AI model to use for image editing. Each model has different capabilities and costs.
 *
 * **Models:**
 * - `default` - Use the model we recommend, which will change over time. This is recommended unless you need a specific model. This is the default behavior.
 * - `qwen-edit` - 10 credits/image
 *   - Available for tiers: free, creator, pro, business
 *   - Image count allowed: 1
 *   - Max additional input images: 2
 * - `nano-banana` - 50 credits/image
 *   - Available for tiers: free, creator, pro, business
 *   - Image count allowed: 1
 *   - Max additional input images: 9
 * - `nano-banana-2` - 100 credits/image
 *   - Available for tiers: free, creator, pro, business
 *   - Image count allowed: 1
 *   - Max additional input images: 9
 * - `seedream-v4` - 50 credits/image
 *   - Available for tiers: free, creator, pro, business
 *   - Image count allowed: 1
 *   - Max additional input images: 9
 * - `nano-banana-pro` - 150 credits/image
 *   - Available for tiers: creator, pro, business
 *   - Image count allowed: 1, 4, 9, 16
 *   - Max additional input images: 9
 * - `seedream-v4.5` - 100 credits/image
 *   - Available for tiers: creator, pro, business
 *   - Image count allowed: 1
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
