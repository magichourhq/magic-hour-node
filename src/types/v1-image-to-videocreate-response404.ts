import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Requested resource is not found
 */
export type V1ImageToVideocreateResponse404 = {
  message: "Not Found";
};

/**
 * @internal
 * V1ImageToVideocreateResponse404 without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1ImageToVideocreateResponse404 = {
  message: "Not Found";
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1ImageToVideocreateResponse404
 */
const SchemaIn$V1ImageToVideocreateResponse404: z.ZodType<
  V1ImageToVideocreateResponse404, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1ImageToVideocreateResponse404
 */
const SchemaOut$V1ImageToVideocreateResponse404: z.ZodType<
  External$V1ImageToVideocreateResponse404, // output type of this zod object
  z.ZodTypeDef,
  V1ImageToVideocreateResponse404 // the object to be transformed
> = z
  .object({
    message: z.enum(["Not Found"]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      message: "message",
    });
  });

export const Schemas$V1ImageToVideocreateResponse404 = {
  in: SchemaIn$V1ImageToVideocreateResponse404,
  out: SchemaOut$V1ImageToVideocreateResponse404,
};
