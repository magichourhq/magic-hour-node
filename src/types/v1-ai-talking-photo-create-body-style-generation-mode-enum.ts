/**
 * Controls overall motion style.
 * * `pro` -  Higher fidelity, realistic detail, accurate lip sync, and faster generation.
 * * `standard` -  More expressive motion, but lower visual fidelity.
 *
 * * `expressive` - More motion and facial expressiveness; may introduce visual artifacts. (Deprecated: passing this value will be treated as `standard`)
 * * `stable` -  Reduced motion for cleaner output; may result in minimal animation. (Deprecated: passing this value will be treated as `pro`)
 */
export type V1AiTalkingPhotoCreateBodyStyleGenerationModeEnum =
  | "expressive"
  | "pro"
  | "stable"
  | "standard";
