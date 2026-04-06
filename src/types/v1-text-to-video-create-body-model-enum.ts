/**
 * The AI model to use for video generation.
 *
 * * `default`: uses our currently recommended model for general use. For paid tiers, defaults to `kling-3.0`. For free tiers, it defaults to `ltx-2`.
 * * `ltx-2`: Fast iteration with audio and lip-sync
 * * `wan-2.2`: Fast, strong visuals with effects
 * * `seedance`: Fast iteration and start/end frames
 * * `seedance-2.0`: State-of-the-art quality and consistency
 * * `kling-2.5`: Motion, action, and camera control
 * * `kling-3.0`: Cinematic, multi-scene storytelling
 * * `sora-2`: Story-first concepts and creativity
 * * `veo3.1`: Realistic visuals and prompt adherence
 * * `veo3.1-lite`: Good for fast, affordable, high-quality daily generation.
 *
 * Legacy models:
 * * `kling-1.6`: Reliable baseline with smooth motion
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
  | "seedance"
  | "seedance-2.0"
  | "sora-2"
  | "veo3.1"
  | "veo3.1-audio"
  | "veo3.1-lite"
  | "wan-2.2";
