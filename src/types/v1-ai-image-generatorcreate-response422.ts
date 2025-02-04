import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Unprocessable Entity
 */
export type V1AiImageGeneratorcreateResponse422 = {
  message: string;
};

/**
 * @internal
 * V1AiImageGeneratorcreateResponse422 without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiImageGeneratorcreateResponse422 = {
  message: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiImageGeneratorcreateResponse422
 */
const SchemaIn$V1AiImageGeneratorcreateResponse422: z.ZodType<
  V1AiImageGeneratorcreateResponse422, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiImageGeneratorcreateResponse422
 */
const SchemaOut$V1AiImageGeneratorcreateResponse422: z.ZodType<
  External$V1AiImageGeneratorcreateResponse422, // output type of this zod object
  z.ZodTypeDef,
  V1AiImageGeneratorcreateResponse422 // the object to be transformed
> = z
  .object({
    message: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      message: "message",
    });
  });

export const Schemas$V1AiImageGeneratorcreateResponse422 = {
  in: SchemaIn$V1AiImageGeneratorcreateResponse422,
  out: SchemaOut$V1AiImageGeneratorcreateResponse422,
};
