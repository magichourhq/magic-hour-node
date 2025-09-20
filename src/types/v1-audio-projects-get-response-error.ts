import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * In the case of an error, this object will contain the error encountered during video render
 */
export type V1AudioProjectsGetResponseError = {
  /**
   * An error code to indicate why a failure happened.
   */
  code: string;
  /**
   * Details on the reason why a failure happened.
   */
  message: string;
};

/**
 * @internal
 * V1AudioProjectsGetResponseError without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AudioProjectsGetResponseError = {
  code: string;
  message: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AudioProjectsGetResponseError
 */
const SchemaIn$V1AudioProjectsGetResponseError: z.ZodType<
  V1AudioProjectsGetResponseError, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    code: z.string(),
    message: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      code: "code",
      message: "message",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AudioProjectsGetResponseError
 */
const SchemaOut$V1AudioProjectsGetResponseError: z.ZodType<
  External$V1AudioProjectsGetResponseError, // output type of this zod object
  z.ZodTypeDef,
  V1AudioProjectsGetResponseError // the object to be transformed
> = z
  .object({
    code: z.string(),
    message: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      code: "code",
      message: "message",
    });
  });

export const Schemas$V1AudioProjectsGetResponseError = {
  in: SchemaIn$V1AudioProjectsGetResponseError,
  out: SchemaOut$V1AudioProjectsGetResponseError,
};
