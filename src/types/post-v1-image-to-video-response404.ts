import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Requested resource is not found
 */
export type PostV1ImageToVideoResponse404 = {
  message: "Not Found";
};

/**
 * @internal
 * PostV1ImageToVideoResponse404 without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1ImageToVideoResponse404 = {
  message: "Not Found";
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1ImageToVideoResponse404
 */
const SchemaIn$PostV1ImageToVideoResponse404: z.ZodType<
  PostV1ImageToVideoResponse404, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    message: z.enum(["Not Found"]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      message: "message",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1ImageToVideoResponse404
 */
const SchemaOut$PostV1ImageToVideoResponse404: z.ZodType<
  External$PostV1ImageToVideoResponse404, // output type of this zod object
  z.ZodTypeDef,
  PostV1ImageToVideoResponse404 // the object to be transformed
> = z
  .object({
    message: z.enum(["Not Found"]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      message: "message",
    });
  });

export const Schemas$PostV1ImageToVideoResponse404 = {
  in: SchemaIn$PostV1ImageToVideoResponse404,
  out: SchemaOut$PostV1ImageToVideoResponse404,
};
