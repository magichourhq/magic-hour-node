/**
 * Editing model. Defaults to LTX 2.5 for free tier and `gemini-omni-1.1` for paid. `wan-3.0` requires a paid tier. `gemini-omni` is deprecated; use `gemini-omni-1.1` instead.
 */
export type V1AiVideoEditorCreateBodyModelEnum =
  | "gemini-omni"
  | "gemini-omni-1.1"
  | "ltx-2.3"
  | "ltx-2.5"
  | "wan-3.0";
