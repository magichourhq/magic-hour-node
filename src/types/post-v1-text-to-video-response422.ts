import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Unprocessable Entity
 */
export type PostV1TextToVideoResponse422 = {
  message: string;
};

/**
 * @internal
 * PostV1TextToVideoResponse422 without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1TextToVideoResponse422 = {
  message: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1TextToVideoResponse422
 */
const SchemaIn$PostV1TextToVideoResponse422: z.ZodType<
  PostV1TextToVideoResponse422, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1TextToVideoResponse422
 */
const SchemaOut$PostV1TextToVideoResponse422: z.ZodType<
  External$PostV1TextToVideoResponse422, // output type of this zod object
  z.ZodTypeDef,
  PostV1TextToVideoResponse422 // the object to be transformed
> = z
  .object({
    message: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      message: "message",
    });
  });

export const Schemas$PostV1TextToVideoResponse422 = {
  in: SchemaIn$PostV1TextToVideoResponse422,
  out: SchemaOut$PostV1TextToVideoResponse422,
};
