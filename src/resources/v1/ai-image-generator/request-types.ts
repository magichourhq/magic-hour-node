import * as z from "zod";

import { zodTransform } from "magic-hour/core";
import {
  External$V1AiImageGeneratorCreateBodyStyle,
  Schemas$V1AiImageGeneratorCreateBodyStyle,
  V1AiImageGeneratorCreateBodyStyle,
} from "magic-hour/types/v1-ai-image-generator-create-body-style";

/**
 * CreateRequest
 */
export type CreateRequest = {
  /**
   * Number of images to generate.
   */
  imageCount: number;
  /**
   * The name of image. This value is mainly used for your own identification of the image.
   */
  name?: string | undefined;
  /**
   * The orientation of the output image(s).
   */
  orientation: "landscape" | "portrait" | "square";
  /**
   * The art style to use for image generation.
   */
  style: V1AiImageGeneratorCreateBodyStyle;
};

/**
 * @internal
 * CreateRequest without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$CreateRequest = {
  image_count: number;
  name?: string | undefined;
  orientation: "landscape" | "portrait" | "square";
  style: External$V1AiImageGeneratorCreateBodyStyle;
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
    image_count: z.number().int(),
    name: z.string().optional(),
    orientation: z.enum(["landscape", "portrait", "square"]),
    style: Schemas$V1AiImageGeneratorCreateBodyStyle.in,
  })
  .transform((obj) => {
    return zodTransform(obj, {
      image_count: "imageCount",
      name: "name",
      orientation: "orientation",
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
    imageCount: z.number().int(),
    name: z.string().optional(),
    orientation: z.enum(["landscape", "portrait", "square"]),
    style: Schemas$V1AiImageGeneratorCreateBodyStyle.out,
  })
  .transform((obj) => {
    return zodTransform(obj, {
      imageCount: "image_count",
      name: "name",
      orientation: "orientation",
      style: "style",
    });
  });

export const Schemas$CreateRequest = {
  in: SchemaIn$CreateRequest,
  out: SchemaOut$CreateRequest,
};
