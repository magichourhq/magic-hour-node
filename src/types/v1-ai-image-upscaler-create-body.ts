import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1AiImageUpscalerCreateBodyAssets,
  Schemas$V1AiImageUpscalerCreateBodyAssets,
  V1AiImageUpscalerCreateBodyAssets,
} from "./v1-ai-image-upscaler-create-body-assets";
import {
  External$V1AiImageUpscalerCreateBodyStyle,
  Schemas$V1AiImageUpscalerCreateBodyStyle,
  V1AiImageUpscalerCreateBodyStyle,
} from "./v1-ai-image-upscaler-create-body-style";

/**
 * V1AiImageUpscalerCreateBody
 */
export type V1AiImageUpscalerCreateBody = {
  /**
   * Provide the assets for upscaling
   */
  assets: V1AiImageUpscalerCreateBodyAssets;
  /**
   * The name of image. This value is mainly used for your own identification of the image.
   */
  name?: string | undefined;
  /**
   * How much to scale the image. Must be either 2 or 4.
   *
   * Note: 4x upscale is only available on Creator, Pro, or Business tier.
   */
  scaleFactor: number;
  style: V1AiImageUpscalerCreateBodyStyle;
};

/**
 * @internal
 * V1AiImageUpscalerCreateBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiImageUpscalerCreateBody = {
  assets: External$V1AiImageUpscalerCreateBodyAssets;
  name?: string | undefined;
  scale_factor: number;
  style: External$V1AiImageUpscalerCreateBodyStyle;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiImageUpscalerCreateBody
 */
const SchemaIn$V1AiImageUpscalerCreateBody: z.ZodType<
  V1AiImageUpscalerCreateBody, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    assets: Schemas$V1AiImageUpscalerCreateBodyAssets.in,
    name: z.string().optional(),
    scale_factor: z.number(),
    style: Schemas$V1AiImageUpscalerCreateBodyStyle.in,
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiImageUpscalerCreateBody
 */
const SchemaOut$V1AiImageUpscalerCreateBody: z.ZodType<
  External$V1AiImageUpscalerCreateBody, // output type of this zod object
  z.ZodTypeDef,
  V1AiImageUpscalerCreateBody // the object to be transformed
> = z
  .object({
    assets: Schemas$V1AiImageUpscalerCreateBodyAssets.out,
    name: z.string().optional(),
    scaleFactor: z.number(),
    style: Schemas$V1AiImageUpscalerCreateBodyStyle.out,
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      name: "name",
      scaleFactor: "scale_factor",
      style: "style",
    });
  });

export const Schemas$V1AiImageUpscalerCreateBody = {
  in: SchemaIn$V1AiImageUpscalerCreateBody,
  out: SchemaOut$V1AiImageUpscalerCreateBody,
};
