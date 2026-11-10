/**
 * * `v1` - more detail, closer prompt adherence, and frame-by-frame previews.
 * * `v2` - faster, more consistent, and less noisy.
 * * `v3` - consistent styling guided by a caller-supplied reference image. Requires assets.initial_image_path and positive width/height.
 * * `default` - use the selected art style's default version, including v3.
 */
export type V1VideoToVideoCreateBodyStyleVersionEnum =
  | "default"
  | "v1"
  | "v2"
  | "v3";
