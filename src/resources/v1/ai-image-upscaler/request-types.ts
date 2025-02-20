import { zodTransform } from "magic-hour/core";
import {
  External$PostV1AiImageUpscalerBodyAssets,
  PostV1AiImageUpscalerBodyAssets,
  Schemas$PostV1AiImageUpscalerBodyAssets,
} from "magic-hour/types/post-v1-ai-image-upscaler-body-assets";
import {
  External$PostV1AiImageUpscalerBodyStyle,
  PostV1AiImageUpscalerBodyStyle,
  Schemas$PostV1AiImageUpscalerBodyStyle,
} from "magic-hour/types/post-v1-ai-image-upscaler-body-style";
import * as z from "zod";

/**
 * CreateRequest
 */
export type CreateRequest = {
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
 * CreateRequest without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$CreateRequest = {
  assets: External$PostV1AiImageUpscalerBodyAssets;
  name?: string | undefined;
  scale_factor: number;
  style: External$PostV1AiImageUpscalerBodyStyle;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object CreateRequest
 */
const SchemaIn$CreateRequest: z.ZodType<
  CreateRequest, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$CreateRequest
 */
const SchemaOut$CreateRequest: z.ZodType<
  External$CreateRequest, // output type of this zod object
  z.ZodTypeDef,
  CreateRequest // the object to be transformed
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

export const Schemas$CreateRequest = {
  in: SchemaIn$CreateRequest,
  out: SchemaOut$CreateRequest,
};
