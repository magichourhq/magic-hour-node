/**
 * Generated by Sideko (sideko.dev)
 **/

import { types } from "magic-hour";

/**
 * PostV1AiPhotoEditorBody
 */
export type PostV1AiPhotoEditorBody = {
  /**
   * Provide the assets for photo editor
   */
  assets: types.PostV1AiPhotoEditorBodyAssets;
  /**
   * The name of image
   */
  name?: string;
  /**
   * The resolution of the final output image. The allowed value is based on your subscription. Please refer to our [pricing page](https://magichour.ai/pricing) for more details
   */
  resolution: number;
  /**
   * Deprecated: Please use `.style.steps` instead. Number of iterations used to generate the output. Higher values improve quality and increase the strength of the prompt but increase processing time.
   */
  steps?: number;
  style: types.PostV1AiPhotoEditorBodyStyle;
};
