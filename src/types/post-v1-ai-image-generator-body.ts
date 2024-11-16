/**
 * Generated by Sideko (sideko.dev)
 **/

import { types } from "magic-hour";

export type PostV1AiImageGeneratorBody = {
  /**
   * number to images to generate
   */
  image_count: number;
  /**
   * The name of image
   */
  name?: string;
  orientation: types.PostV1AiImageGeneratorBodyOrientationEnum;
  style: types.PostV1AiImageGeneratorBodyStyle;
};
