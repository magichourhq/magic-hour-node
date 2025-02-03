import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * The request is not properly authenticated
 */
export type PostV1AiImageGeneratorResponse401 = {
  message: "Unauthorized";
};

/**
 * @internal
 * PostV1AiImageGeneratorResponse401 without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1AiImageGeneratorResponse401 = {
  message: "Unauthorized";
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1AiImageGeneratorResponse401
 */
const SchemaIn$PostV1AiImageGeneratorResponse401: z.ZodType<
  PostV1AiImageGeneratorResponse401, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    message: z.enum(["Unauthorized"]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      message: "message",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1AiImageGeneratorResponse401
 */
const SchemaOut$PostV1AiImageGeneratorResponse401: z.ZodType<
  External$PostV1AiImageGeneratorResponse401, // output type of this zod object
  z.ZodTypeDef,
  PostV1AiImageGeneratorResponse401 // the object to be transformed
> = z
  .object({
    message: z.enum(["Unauthorized"]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      message: "message",
    });
  });

export const Schemas$PostV1AiImageGeneratorResponse401 = {
  in: SchemaIn$PostV1AiImageGeneratorResponse401,
  out: SchemaOut$PostV1AiImageGeneratorResponse401,
};
