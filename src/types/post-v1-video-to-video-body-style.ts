/**
 * Generated by Sideko (sideko.dev)
 **/

import { types } from "magic-hour";

export type PostV1VideoToVideoBodyStyle = {
  art_style: types.PostV1VideoToVideoBodyStyleArtStyleEnum;
  /**
   * * &#x60;Dreamshaper&#x60; - a good all-around model that works for both animations as well as realism.
   * * &#x60;Absolute Reality&#x60; - better at realism, but you&#x27;ll often get similar results with Dreamshaper as well.
   * * &#x60;Flat 2D Anime&#x60; - best for a flat illustration style that&#x27;s common in most anime.
   * * &#x60;default&#x60; - use the default recommended model for the selected art style.
   */
  model: types.PostV1VideoToVideoBodyStyleModelEnum;
  /**
   * The prompt used for the video. Prompt is required if &#x60;prompt_type&#x60; is &#x60;custom&#x60; or &#x60;append_default&#x60;. If &#x60;prompt_type&#x60; is &#x60;default&#x60;, then the &#x60;prompt&#x60; value passed will be ignored.
   */
  prompt?: string | null;
  /**
   * * &#x60;default&#x60; - Use the default recommended prompt for the art style.
   * * &#x60;custom&#x60; - Only use the prompt passed in the API. Note: for v1, lora prompt will still be auto added to apply the art style properly.
   * * &#x60;append_default&#x60; - Add the default recommended prompt to the end of the prompt passed in the API.
   */
  prompt_type: types.PostV1VideoToVideoBodyStylePromptTypeEnum;
  /**
   * * &#x60;v1&#x60; - more detail, closer prompt adherence, and frame-by-frame previews.
   * * &#x60;v2&#x60; - faster, more consistent, and less noisy.
   * * &#x60;default&#x60; - use the default version for the selected art style.
   */
  version: types.PostV1VideoToVideoBodyStyleVersionEnum;
};
