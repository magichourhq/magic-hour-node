import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Requested resource is not found
 */
export type V1FilesUploadUrlscreateResponse404 = {
  message: "Not Found";
};

/**
 * @internal
 * V1FilesUploadUrlscreateResponse404 without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1FilesUploadUrlscreateResponse404 = {
  message: "Not Found";
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1FilesUploadUrlscreateResponse404
 */
const SchemaIn$V1FilesUploadUrlscreateResponse404: z.ZodType<
  V1FilesUploadUrlscreateResponse404, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1FilesUploadUrlscreateResponse404
 */
const SchemaOut$V1FilesUploadUrlscreateResponse404: z.ZodType<
  External$V1FilesUploadUrlscreateResponse404, // output type of this zod object
  z.ZodTypeDef,
  V1FilesUploadUrlscreateResponse404 // the object to be transformed
> = z
  .object({
    message: z.enum(["Not Found"]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      message: "message",
    });
  });

export const Schemas$V1FilesUploadUrlscreateResponse404 = {
  in: SchemaIn$V1FilesUploadUrlscreateResponse404,
  out: SchemaOut$V1FilesUploadUrlscreateResponse404,
};
