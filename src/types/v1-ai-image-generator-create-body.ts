import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1AiImageGeneratorCreateBodyStyle,
  Schemas$V1AiImageGeneratorCreateBodyStyle,
  V1AiImageGeneratorCreateBodyStyle,
} from "./v1-ai-image-generator-create-body-style";

/**
 * V1AiImageGeneratorCreateBody
 */
export type V1AiImageGeneratorCreateBody = {
  /**
   * Number of images to generate.
   */
  imageCount: number;
  /**
   * Give your image a custom name for easy identification.
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
 * V1AiImageGeneratorCreateBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiImageGeneratorCreateBody = {
  image_count: number;
  name?: string | undefined;
  orientation: "landscape" | "portrait" | "square";
  style: External$V1AiImageGeneratorCreateBodyStyle;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiImageGeneratorCreateBody
 */
const SchemaIn$V1AiImageGeneratorCreateBody: z.ZodType<
  V1AiImageGeneratorCreateBody, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiImageGeneratorCreateBody
 */
const SchemaOut$V1AiImageGeneratorCreateBody: z.ZodType<
  External$V1AiImageGeneratorCreateBody, // output type of this zod object
  z.ZodTypeDef,
  V1AiImageGeneratorCreateBody // the object to be transformed
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

export const Schemas$V1AiImageGeneratorCreateBody = {
  in: SchemaIn$V1AiImageGeneratorCreateBody,
  out: SchemaOut$V1AiImageGeneratorCreateBody,
};
