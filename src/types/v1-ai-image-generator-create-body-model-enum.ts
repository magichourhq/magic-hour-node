/**
 * The AI model to use for image generation. Each model has different capabilities and costs.
 *
 * **Models:**
 * - `default` - Use the model we recommend, which will change over time. This is recommended unless you need a specific model. This is the default behavior.
 * - `flux-schnell` - from 5 credits/image
 *   - Supported resolutions: 640px, 1k, 2k
 *   - Available for tiers: free, creator, pro, business
 *   - Image count allowed: 1, 2, 3, 4
 * - `z-image-turbo` - from 5 credits/image
 *   - Supported resolutions: 640px, 1k, 2k
 *   - Available for tiers: free, creator, pro, business
 *   - Image count allowed: 1, 2, 3, 4
 * - `seedream-v4` - from 40 credits/image
 *   - Supported resolutions: 640px, 1k, 2k, 4k
 *   - Available for tiers: free, creator, pro, business
 *   - Image count allowed: 1, 2, 3, 4
 * - `nano-banana` - from 50 credits/image
 *   - Supported resolutions: 640px, 1k
 *   - Available for tiers: free, creator, pro, business
 *   - Image count allowed: 1, 2, 3, 4
 * - `nano-banana-2` - from 100 credits/image
 *   - Supported resolutions: 640px, 1k, 2k, 4k
 *   - Available for tiers: free, creator, pro, business
 *   - Image count allowed: 1, 2, 3, 4
 * - `nano-banana-pro` - from 150 credits/image
 *   - Supported resolutions: 1k, 2k, 4k
 *   - Available for tiers: creator, pro, business
 *   - Image count allowed: 1, 4, 9, 16
 *
 * **Deprecated Enum Values:**
 * - `seedream` - Use `seedream-v4` instead.
 *
 */
export type V1AiImageGeneratorCreateBodyModelEnum =
  | "default"
  | "flux-schnell"
  | "nano-banana"
  | "nano-banana-2"
  | "nano-banana-pro"
  | "seedream"
  | "seedream-v4"
  | "z-image-turbo";
