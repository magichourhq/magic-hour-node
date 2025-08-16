import { zodTransform } from "magic-hour/core";
import {
  External$V1AiImageUpscalerCreateBodyAssets,
  Schemas$V1AiImageUpscalerCreateBodyAssets,
  V1AiImageUpscalerCreateBodyAssets,
} from "magic-hour/types/v1-ai-image-upscaler-create-body-assets";
import {
  External$V1AiImageUpscalerCreateBodyStyle,
  Schemas$V1AiImageUpscalerCreateBodyStyle,
  V1AiImageUpscalerCreateBodyStyle,
} from "magic-hour/types/v1-ai-image-upscaler-create-body-style";
import * as z from "zod";

/**
 * CreateRequest
 */
export type CreateRequest = {
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
 * CreateRequest without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$CreateRequest = {
  assets: External$V1AiImageUpscalerCreateBodyAssets;
  name?: string | undefined;
  scale_factor: number;
  style: External$V1AiImageUpscalerCreateBodyStyle;
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$CreateRequest
 */
const SchemaOut$CreateRequest: z.ZodType<
  External$CreateRequest, // output type of this zod object
  z.ZodTypeDef,
  CreateRequest // the object to be transformed
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

export const Schemas$CreateRequest = {
  in: SchemaIn$CreateRequest,
  out: SchemaOut$CreateRequest,
};
