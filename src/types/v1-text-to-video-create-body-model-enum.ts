/**
 * The AI model to use for video generation.
 *
 * * `default`: uses our currently recommended model for general use. For paid tiers, defaults to `kling-3.0`. For free tiers, it defaults to `ltx-2.3`.
 * * `ltx-2.3`: Fast iteration with lip-sync & end frame
 * * `wan-2.2`: Fast, strong visuals with effects
 * * `kling-2.5`: Motion, action, and camera control
 * * `kling-3.0`: Cinematic, multi-scene storytelling
 * * `veo3.1-lite`: Fast, affordable, high-quality
 * * `veo3.1`: Realistic visuals and prompt adherence
 * * `seedance`: Fast iteration
 * * `seedance-2.0`: State-of-the-art quality and consistency
 * * `sora-2`: Story-first concepts and creativity
 *
 * If you specify the deprecated model value that includes the `-audio` suffix, this will be the same as included `audio` as `true`.
 */
export type V1TextToVideoCreateBodyModelEnum =
  | "default"
  | "kling-1.6"
  | "kling-2.5"
  | "kling-2.5-audio"
  | "kling-3.0"
  | "ltx-2"
  | "ltx-2.3"
  | "seedance"
  | "seedance-2.0"
  | "sora-2"
  | "veo3.1"
  | "veo3.1-audio"
  | "veo3.1-lite"
  | "wan-2.2";
