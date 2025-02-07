/**
 * * `default` - Use the default recommended prompt for the art style.
 * * `custom` - Only use the prompt passed in the API. Note: for v1, lora prompt will still be auto added to apply the art style properly.
 * * `append_default` - Add the default recommended prompt to the end of the prompt passed in the API.
 */
export type PostV1VideoToVideoBodyStylePromptTypeEnum =
  | "append_default"
  | "custom"
  | "default";
