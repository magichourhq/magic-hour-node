import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * The request is invalid
 */
export type PostV1AiClothesChangerResponse400 = {
  message: string;
};

/**
 * @internal
 * PostV1AiClothesChangerResponse400 without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1AiClothesChangerResponse400 = {
  message: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1AiClothesChangerResponse400
 */
const SchemaIn$PostV1AiClothesChangerResponse400: z.ZodType<
  PostV1AiClothesChangerResponse400, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1AiClothesChangerResponse400
 */
const SchemaOut$PostV1AiClothesChangerResponse400: z.ZodType<
  External$PostV1AiClothesChangerResponse400, // output type of this zod object
  z.ZodTypeDef,
  PostV1AiClothesChangerResponse400 // the object to be transformed
> = z
  .object({
    message: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      message: "message",
    });
  });

export const Schemas$PostV1AiClothesChangerResponse400 = {
  in: SchemaIn$PostV1AiClothesChangerResponse400,
  out: SchemaOut$PostV1AiClothesChangerResponse400,
};
