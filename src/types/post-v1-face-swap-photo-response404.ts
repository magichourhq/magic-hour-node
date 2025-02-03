import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Requested resource is not found
 */
export type PostV1FaceSwapPhotoResponse404 = {
  message: "Not Found";
};

/**
 * @internal
 * PostV1FaceSwapPhotoResponse404 without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1FaceSwapPhotoResponse404 = {
  message: "Not Found";
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1FaceSwapPhotoResponse404
 */
const SchemaIn$PostV1FaceSwapPhotoResponse404: z.ZodType<
  PostV1FaceSwapPhotoResponse404, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1FaceSwapPhotoResponse404
 */
const SchemaOut$PostV1FaceSwapPhotoResponse404: z.ZodType<
  External$PostV1FaceSwapPhotoResponse404, // output type of this zod object
  z.ZodTypeDef,
  PostV1FaceSwapPhotoResponse404 // the object to be transformed
> = z
  .object({
    message: z.enum(["Not Found"]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      message: "message",
    });
  });

export const Schemas$PostV1FaceSwapPhotoResponse404 = {
  in: SchemaIn$PostV1FaceSwapPhotoResponse404,
  out: SchemaOut$PostV1FaceSwapPhotoResponse404,
};
