/**
 * The AI model to use for video generation.
 * * `default`: Our recommended model for general use (Kling 2.5 Audio). Note: For backward compatibility, if you use default and end_seconds > 10, we'll fall back to Kling 1.6.
 * * `seedance`: Great for fast iteration and start/end frame
 * * `kling-2.5`: Great for motion, action, and camera control
 * * `kling-3.0`: Great for cinematic, multi-scene storytelling with control
 * * `sora-2`: Great for story-telling, dialogue & creativity
 * * `veo3.1`: Great for realism, polish, & prompt adherence
 * * `kling-1.6`: Great for dependable clips with smooth motion
 */
export type V1ImageToVideoCreateBodyModelEnum =
  | "default"
  | "kling-1.6"
  | "kling-2.5"
  | "kling-2.5-audio"
  | "kling-3.0"
  | "seedance"
  | "sora-2"
  | "veo3.1"
  | "veo3.1-audio";
