/**
 * The AI model to use for video generation.
 *
 * * `default`: uses our currently recommended model for general use. For paid tiers, defaults to `kling-3.0`. For free tiers, it defaults to `ltx-2.5`.
 * * `gemini-omni-1.1`: Best for precise short clips, first/last frames, and high-resolution output.
 * * `kling-2.6`: Best for action, motion blur, and controlled camera moves.
 * * `kling-3.0`: Best for cinematic stories, references, and optional audio.
 * * `ltx-2.3`: Fastest for general scenes, long clips, audio, and rapid iteration.
 * * `ltx-2.5`: Fastest for general scenes, long clips, audio, and rapid iteration.
 * * `minimax-h3`: Great for reference-driven clips with native audio and longer durations.
 * * `seedance-1.5`: Best for smooth, consistent motion with an end frame.
 * * `seedance-2.0`: Best for reference-led clips with precise subject control.
 * * `seedance-2.0-mini`: Faster reference-led clips with consistent motion and audio.
 * * `seedance-2.5`: Best for premium realism, detail, and natural motion.
 * * `sora-2`: Best for creative concepts and longer clips with audio.
 * * `veo3.1`: Best for romantic interactions and expressive action, with realistic detail.
 * * `veo3.1-lite`: Balanced realism and audio at a lower cost than Veo 3.1.
 * * `wan-2.2`: Best for physical motion, action, and camera movement.
 *
 * If you specify the deprecated model value that includes the `-audio` suffix, this will be the same as included `audio` as `true`.
 */
export type V1ImageToVideoCreateBodyModelEnum =
  | "default"
  | "gemini-omni-1.1"
  | "kling-1.6"
  | "kling-2.5"
  | "kling-2.5-audio"
  | "kling-2.6"
  | "kling-3.0"
  | "ltx-2"
  | "ltx-2.3"
  | "ltx-2.5"
  | "minimax-h3"
  | "seedance"
  | "seedance-1.5"
  | "seedance-2.0"
  | "seedance-2.0-mini"
  | "seedance-2.5"
  | "sora-2"
  | "veo3.1"
  | "veo3.1-audio"
  | "veo3.1-lite"
  | "wan-2.2";
