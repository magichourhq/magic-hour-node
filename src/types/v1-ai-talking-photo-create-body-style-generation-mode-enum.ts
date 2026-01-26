/**
 * Controls overall motion style.
 * * `realistic` - Maintains likeness well, high quality, and reliable.
 * * `prompted` - Slightly lower likeness; allows option to prompt scene.
 *
 * **Deprecated values (maintained for backward compatibility):**
 * * `pro` - Deprecated: use `realistic`
 * * `standard` - Deprecated: use `prompted`
 * * `stable` - Deprecated: use `realistic`
 * * `expressive` - Deprecated: use `prompted`
 */
export type V1AiTalkingPhotoCreateBodyStyleGenerationModeEnum =
  | "expressive"
  | "pro"
  | "prompted"
  | "realistic"
  | "stable"
  | "standard";
