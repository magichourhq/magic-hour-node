import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * The request is invalid
 */
export type PostV1AiImageUpscalerResponse400 = {
  message: string;
};

/**
 * @internal
 * PostV1AiImageUpscalerResponse400 without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1AiImageUpscalerResponse400 = {
  message: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1AiImageUpscalerResponse400
 */
const SchemaIn$PostV1AiImageUpscalerResponse400: z.ZodType<
  PostV1AiImageUpscalerResponse400, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    message: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      message: "message",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1AiImageUpscalerResponse400
 */
const SchemaOut$PostV1AiImageUpscalerResponse400: z.ZodType<
  External$PostV1AiImageUpscalerResponse400, // output type of this zod object
  z.ZodTypeDef,
  PostV1AiImageUpscalerResponse400 // the object to be transformed
> = z
  .object({
    message: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      message: "message",
    });
  });

export const Schemas$PostV1AiImageUpscalerResponse400 = {
  in: SchemaIn$PostV1AiImageUpscalerResponse400,
  out: SchemaOut$PostV1AiImageUpscalerResponse400,
};
