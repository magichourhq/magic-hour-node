import {
  External$PostV1AiImageUpscalerBodyAssets,
  PostV1AiImageUpscalerBodyAssets,
  Schemas$PostV1AiImageUpscalerBodyAssets,
} from "./post-v1-ai-image-upscaler-body-assets";
import {
  External$PostV1AiImageUpscalerBodyStyle,
  PostV1AiImageUpscalerBodyStyle,
  Schemas$PostV1AiImageUpscalerBodyStyle,
} from "./post-v1-ai-image-upscaler-body-style";
import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * PostV1AiImageUpscalerBody
 */
export type PostV1AiImageUpscalerBody = {
  /**
   * Provide the assets for upscaling
   */
  assets: PostV1AiImageUpscalerBodyAssets;
  /**
   * The name of image
   */
  name?: string | undefined;
  /**
   * How much to scale the image. Must be either 2 or 4
   */
  scaleFactor: number;
  style: PostV1AiImageUpscalerBodyStyle;
};

/**
 * @internal
 * PostV1AiImageUpscalerBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1AiImageUpscalerBody = {
  assets: External$PostV1AiImageUpscalerBodyAssets;
  name?: string | undefined;
  scale_factor: number;
  style: External$PostV1AiImageUpscalerBodyStyle;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1AiImageUpscalerBody
 */
const SchemaIn$PostV1AiImageUpscalerBody: z.ZodType<
  PostV1AiImageUpscalerBody, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    assets: Schemas$PostV1AiImageUpscalerBodyAssets.in,
    name: z.string().optional(),
    scale_factor: z.number(),
    style: Schemas$PostV1AiImageUpscalerBodyStyle.in,
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      name: "name",
      scale_factor: "scaleFactor",
      style: "style",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1AiImageUpscalerBody
 */
const SchemaOut$PostV1AiImageUpscalerBody: z.ZodType<
  External$PostV1AiImageUpscalerBody, // output type of this zod object
  z.ZodTypeDef,
  PostV1AiImageUpscalerBody // the object to be transformed
> = z
  .object({
    assets: Schemas$PostV1AiImageUpscalerBodyAssets.out,
    name: z.string().optional(),
    scaleFactor: z.number(),
    style: Schemas$PostV1AiImageUpscalerBodyStyle.out,
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      name: "name",
      scaleFactor: "scale_factor",
      style: "style",
    });
  });

export const Schemas$PostV1AiImageUpscalerBody = {
  in: SchemaIn$PostV1AiImageUpscalerBody,
  out: SchemaOut$PostV1AiImageUpscalerBody,
};
