/**
 * The AI model to use for video generation.
 *
 * * `default`: uses our currently recommended model for general use. For paid tiers, defaults to `kling-3.0`. For free tiers, it defaults to `ltx-2.3`.
 * * `ltx-2.3`: Fastest output. Best for rapid iteration.
 * * `wan-2.2`: Strong physics, camera moves, and motion.
 * * `kling-2.5`: Great for action, motion blur, and camera moves.
 * * `kling-3.0`: Best overall quality for cinematic storytelling.
 * * `veo3.1-lite`: Veo quality at a more accessible cost.
 * * `veo3.1`: Google's model. Highest realism and detail.
 * * `seedance-1.5`: Smooth, consistent motion with precision.
 * * `seedance-2.0-mini`: Fast, consistent video with strong motion quality
 * * `seedance-2.0`: Top quality with reference-to-video control.
 * * `sora-2`: Open AI's model. Great for creativity and viral clips.
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
  | "seedance-1.5"
  | "seedance-2.0"
  | "seedance-2.0-mini"
  | "sora-2"
  | "veo3.1"
  | "veo3.1-audio"
  | "veo3.1-lite"
  | "wan-2.2";
