/**
 *
 * * `custom` - use your own prompt for the video.
 * * `use_lyrics` - Use the lyrics of the audio to create the prompt. If this option is selected, then `assets.audio_source` must be `file` or `youtube`.
 * * `ai_choose` - Let AI write the prompt. If this option is selected, then `assets.audio_source` must be `file` or `youtube`.
 */
export type PostV1AnimationBodyStylePromptTypeEnum =
  | "ai_choose"
  | "custom"
  | "use_lyrics";
