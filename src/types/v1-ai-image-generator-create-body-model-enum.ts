/**
 * The AI model to use for image generation. Each model has different capabilities and costs.
 *
 * **Models:**
 * - `default` - Use the model we recommend, which will change over time. This is recommended unless you need a specific model. This is the default behavior.
 * - `flux-schnell` - 5 credits/image
 *   - Supported resolutions: auto
 *   - Available for tiers: free, creator, pro, business
 *   - Image count allowed: 1, 2, 3, 4
 * - `z-image-turbo` - 5 credits/image
 *   - Supported resolutions: auto, 2k
 *   - Available for tiers: free, creator, pro, business
 *   - Image count allowed: 1, 2, 3, 4
 * - `seedream` - 30 credits/image
 *   - Supported resolutions: auto, 2k, 4k
 *   - Available for tiers: free, creator, pro, business
 *   - Image count allowed: 1, 2, 3, 4
 * - `nano-banana-pro` - 150 credits/image
 *   - Supported resolutions: auto
 *   - Available for tiers: creator, pro, business
 *   - Image count allowed: 1, 4, 9, 16
 *
 */
export type V1AiImageGeneratorCreateBodyModelEnum =
  | "default"
  | "flux-schnell"
  | "nano-banana-pro"
  | "seedream"
  | "z-image-turbo";
