import {
  External$PostV1AiImageGeneratorBodyStyle,
  PostV1AiImageGeneratorBodyStyle,
  Schemas$PostV1AiImageGeneratorBodyStyle,
} from "./post-v1-ai-image-generator-body-style";
import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * PostV1AiImageGeneratorBody
 */
export type PostV1AiImageGeneratorBody = {
  /**
   * number to images to generate
   */
  imageCount: number;
  /**
   * The name of image
   */
  name?: string | undefined;
  orientation: "landscape" | "portrait" | "square";
  style: PostV1AiImageGeneratorBodyStyle;
};

/**
 * @internal
 * PostV1AiImageGeneratorBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1AiImageGeneratorBody = {
  image_count: number;
  name?: string | undefined;
  orientation: "landscape" | "portrait" | "square";
  style: External$PostV1AiImageGeneratorBodyStyle;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1AiImageGeneratorBody
 */
const SchemaIn$PostV1AiImageGeneratorBody: z.ZodType<
  PostV1AiImageGeneratorBody, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    image_count: z.number().int(),
    name: z.string().optional(),
    orientation: z.enum(["landscape", "portrait", "square"]),
    style: Schemas$PostV1AiImageGeneratorBodyStyle.in,
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1AiImageGeneratorBody
 */
const SchemaOut$PostV1AiImageGeneratorBody: z.ZodType<
  External$PostV1AiImageGeneratorBody, // output type of this zod object
  z.ZodTypeDef,
  PostV1AiImageGeneratorBody // the object to be transformed
> = z
  .object({
    imageCount: z.number().int(),
    name: z.string().optional(),
    orientation: z.enum(["landscape", "portrait", "square"]),
    style: Schemas$PostV1AiImageGeneratorBodyStyle.out,
  })
  .transform((obj) => {
    return zodTransform(obj, {
      imageCount: "image_count",
      name: "name",
      orientation: "orientation",
      style: "style",
    });
  });

export const Schemas$PostV1AiImageGeneratorBody = {
  in: SchemaIn$PostV1AiImageGeneratorBody,
  out: SchemaOut$PostV1AiImageGeneratorBody,
};
