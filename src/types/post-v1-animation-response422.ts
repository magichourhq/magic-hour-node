import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Unprocessable Entity
 */
export type PostV1AnimationResponse422 = {
  message: string;
};

/**
 * @internal
 * PostV1AnimationResponse422 without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1AnimationResponse422 = {
  message: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1AnimationResponse422
 */
const SchemaIn$PostV1AnimationResponse422: z.ZodType<
  PostV1AnimationResponse422, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1AnimationResponse422
 */
const SchemaOut$PostV1AnimationResponse422: z.ZodType<
  External$PostV1AnimationResponse422, // output type of this zod object
  z.ZodTypeDef,
  PostV1AnimationResponse422 // the object to be transformed
> = z
  .object({
    message: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      message: "message",
    });
  });

export const Schemas$PostV1AnimationResponse422 = {
  in: SchemaIn$PostV1AnimationResponse422,
  out: SchemaOut$PostV1AnimationResponse422,
};
