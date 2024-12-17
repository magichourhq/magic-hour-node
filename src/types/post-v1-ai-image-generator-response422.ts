/**
 * Generated by Sideko (sideko.dev)
 **/

import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Unprocessable Entity
 */
export type PostV1AiImageGeneratorResponse422 = {
  message: string;
};

/**
 * @internal
 * PostV1AiImageGeneratorResponse422 without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1AiImageGeneratorResponse422 = {
  message: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1AiImageGeneratorResponse422
 */
const SchemaIn$PostV1AiImageGeneratorResponse422: z.ZodType<
  PostV1AiImageGeneratorResponse422, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1AiImageGeneratorResponse422
 */
const SchemaOut$PostV1AiImageGeneratorResponse422: z.ZodType<
  External$PostV1AiImageGeneratorResponse422, // output type of this zod object
  z.ZodTypeDef,
  PostV1AiImageGeneratorResponse422 // the object to be transformed
> = z
  .object({
    message: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      message: "message",
    });
  });

export const Schemas$PostV1AiImageGeneratorResponse422 = {
  in: SchemaIn$PostV1AiImageGeneratorResponse422,
  out: SchemaOut$PostV1AiImageGeneratorResponse422,
};
