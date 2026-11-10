/**
 * Output resolution. Defaults to `480p` for free tier and `720p` for paid. Supported per model: `gemini-omni-1.1`: 360p, 720p, 1080p, 4k; `wan-3.0`: 480p, 720p, 1080p; `ltx-2.5`: 480p, 720p, 1080p.
 */
export type V1AiVideoEditorCreateBodyResolutionEnum =
  | "1080p"
  | "360p"
  | "480p"
  | "4k"
  | "720p";
