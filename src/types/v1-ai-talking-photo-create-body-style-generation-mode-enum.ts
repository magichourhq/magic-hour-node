/**
 * Controls overall motion style.
 * * `pro` -  Realistic, high fidelity, accurate lip sync, slower.
 * * `expressive` - More motion and facial expressiveness; may introduce visual artifacts.
 * * `stable` -  Reduced motion for cleaner output; may result in minimal animation. (Deprecated: passing this value will be treated as `pro`)
 */
export type V1AiTalkingPhotoCreateBodyStyleGenerationModeEnum =
  | "expressive"
  | "pro"
  | "stable";
