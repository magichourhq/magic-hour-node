import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * Requested resource is not found
 */
export type V1AiFaceEditorCreateResponse404 = {
  message: "Not Found";
};

/**
 * @internal
 * V1AiFaceEditorCreateResponse404 without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiFaceEditorCreateResponse404 = {
  message: "Not Found";
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiFaceEditorCreateResponse404
 */
const SchemaIn$V1AiFaceEditorCreateResponse404: z.ZodType<
  V1AiFaceEditorCreateResponse404, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiFaceEditorCreateResponse404
 */
const SchemaOut$V1AiFaceEditorCreateResponse404: z.ZodType<
  External$V1AiFaceEditorCreateResponse404, // output type of this zod object
  z.ZodTypeDef,
  V1AiFaceEditorCreateResponse404 // the object to be transformed
> = z
  .object({
    message: z.enum(["Not Found"]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      message: "message",
    });
  });

export const Schemas$V1AiFaceEditorCreateResponse404 = {
  in: SchemaIn$V1AiFaceEditorCreateResponse404,
  out: SchemaOut$V1AiFaceEditorCreateResponse404,
};
