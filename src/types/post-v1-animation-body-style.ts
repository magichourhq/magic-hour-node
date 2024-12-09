/**
 * Generated by Sideko (sideko.dev)
 **/

import { types } from "magic-hour";

/**
 * Defines the style of the output video
 */
export type PostV1AnimationBodyStyle = {
  /**
   * The art style of the final output video
   */
  art_style: types.PostV1AnimationBodyStyleArtStyleEnum;
  /**
   * Describe custom art style. This field is required if `art_style` is `Custom`
   */
  art_style_custom?: string;
  camera_effect: types.PostV1AnimationBodyStyleCameraEffectEnum;
  /**
   * The prompt used for the video. Prompt is required if `prompt_type` is `custom`. Otherwise this value is ignored
   */
  prompt?: string | null;
  /**
   *
   * * `custom` - use your own prompt for the video.
   * * `use_lyrics` - Use the lyrics of the audio to create the prompt. If this option is selected, then `assets.audio_source` must be `file` or `youtube`.
   * * `ai_choose` - Let AI write the prompt. If this option is selected, then `assets.audio_source` must be `file` or `youtube`.
   */
  prompt_type: types.PostV1AnimationBodyStylePromptTypeEnum;
  /**
   * Change determines how quickly the video's content changes across frames. Higher = more rapid transitions. Lower = more stable visual experience.
   */
  transition_speed: number;
};
