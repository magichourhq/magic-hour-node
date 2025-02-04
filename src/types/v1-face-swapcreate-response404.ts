import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Requested resource is not found
 */
export type V1FaceSwapcreateResponse404 = {
  message: "Not Found";
};

/**
 * @internal
 * V1FaceSwapcreateResponse404 without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1FaceSwapcreateResponse404 = {
  message: "Not Found";
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1FaceSwapcreateResponse404
 */
const SchemaIn$V1FaceSwapcreateResponse404: z.ZodType<
  V1FaceSwapcreateResponse404, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1FaceSwapcreateResponse404
 */
const SchemaOut$V1FaceSwapcreateResponse404: z.ZodType<
  External$V1FaceSwapcreateResponse404, // output type of this zod object
  z.ZodTypeDef,
  V1FaceSwapcreateResponse404 // the object to be transformed
> = z
  .object({
    message: z.enum(["Not Found"]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      message: "message",
    });
  });

export const Schemas$V1FaceSwapcreateResponse404 = {
  in: SchemaIn$V1FaceSwapcreateResponse404,
  out: SchemaOut$V1FaceSwapcreateResponse404,
};
