/**
 * The AI model to use for video editing. Defaults to `ltx-2.5` on free tiers and `gemini-omni-1.2` on paid tiers.
 *
 * * `gemini-omni-1.2`: Best for precise clips up to 15s, references, and high-resolution output. Requires a paid tier.
 * * `wan-3.0`: High-quality video with native audio, long clips, and end-frame control. Requires a paid tier.
 * * `ltx-2.5`: Fastest for general scenes, long clips, audio, and rapid iteration.
 * * `kling-4.0`: Create cinematic videos with image and video references and optional audio. Requires a paid tier.
 */
export type V1AiVideoEditorCreateBodyModelEnum =
  | "gemini-omni"
  | "gemini-omni-1.1"
  | "gemini-omni-1.2"
  | "kling-4.0"
  | "ltx-2.3"
  | "ltx-2.5"
  | "wan-3.0";
