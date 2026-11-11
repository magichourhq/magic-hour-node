/**
 * Editing model. Defaults to LTX 2.5 for free tier and `gemini-omni-1.2` for paid. `wan-3.0` requires a paid tier. `gemini-omni` and `gemini-omni-1.1` are deprecated and run on `gemini-omni-1.2`.
 */
export type V1AiVideoEditorCreateBodyModelEnum =
  | "gemini-omni"
  | "gemini-omni-1.1"
  | "gemini-omni-1.2"
  | "ltx-2.3"
  | "ltx-2.5"
  | "wan-3.0";
