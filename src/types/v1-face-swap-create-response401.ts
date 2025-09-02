import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * The request is not properly authenticated
 */
export type V1FaceSwapCreateResponse401 = {
  message: "Unauthorized";
};

/**
 * @internal
 * V1FaceSwapCreateResponse401 without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1FaceSwapCreateResponse401 = {
  message: "Unauthorized";
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1FaceSwapCreateResponse401
 */
const SchemaIn$V1FaceSwapCreateResponse401: z.ZodType<
  V1FaceSwapCreateResponse401, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    message: z.enum(["Unauthorized"]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      message: "message",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1FaceSwapCreateResponse401
 */
const SchemaOut$V1FaceSwapCreateResponse401: z.ZodType<
  External$V1FaceSwapCreateResponse401, // output type of this zod object
  z.ZodTypeDef,
  V1FaceSwapCreateResponse401 // the object to be transformed
> = z
  .object({
    message: z.enum(["Unauthorized"]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      message: "message",
    });
  });

export const Schemas$V1FaceSwapCreateResponse401 = {
  in: SchemaIn$V1FaceSwapCreateResponse401,
  out: SchemaOut$V1FaceSwapCreateResponse401,
};
