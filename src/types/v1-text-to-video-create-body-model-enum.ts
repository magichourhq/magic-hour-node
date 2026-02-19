/**
 * The AI model to use for video generation.
 *
 * * `default`: uses our currently recommended model for general use. For paid tiers, defaults to `kling-2.5`. For free tiers, it defaults to `ltx-2`.
 * * `ltx-2`: Great for fast iteration with audio, lip-sync, and expressive faces
 * * `seedance`: Great for fast iteration and start/end frame
 * * `kling-2.5`: Great for motion, action, and camera control
 * * `kling-3.0`: Great for cinematic, multi-scene storytelling with control
 * * `sora-2`: Great for story-telling, dialogue & creativity
 * * `veo3.1`: Great for realism, polish, & prompt adherence
 *
 * Legacy models:
 * * `kling-1.6`: Great for dependable clips with smooth motion
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
  | "sora-2"
  | "veo3.1"
  | "veo3.1-audio";
