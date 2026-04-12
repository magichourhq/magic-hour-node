/**
 * Maximum resolution (longest edge) for the output image.
 *
 * **Options:**
 * - `640px` — up to 640px
 * - `1k` — up to 1024px
 * - `2k` — up to 2048px
 * - `4k` — up to 4096px
 * - `auto` — **Deprecated.** Mapped server-side from your subscription tier to the best matching resolution the model supports
 *
 * **Per-model support:**
 * - `flux-schnell` - 640px, 1k, 2k
 * - `z-image-turbo` - 640px, 1k, 2k
 * - `seedream-v4` - 640px, 1k, 2k, 4k
 * - `nano-banana` - 640px, 1k
 * - `nano-banana-2` - 640px, 1k, 2k, 4k
 * - `nano-banana-pro` - 1k, 2k, 4k
 *
 * Note: Resolution availability depends on the model and your subscription tier.
 */
export type V1AiImageGeneratorCreateBodyResolutionEnum =
  | "1k"
  | "2k"
  | "4k"
  | "640px"
  | "auto";
