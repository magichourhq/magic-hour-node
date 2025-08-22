import * as z from "zod";

import { zodTransform } from "magic-hour/core";

/**
 * In the case of an error, this object will contain the error encountered during video render
 */
export type V1VideoProjectsGetResponseError = {
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
 * V1VideoProjectsGetResponseError without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1VideoProjectsGetResponseError = {
  code: string;
  message: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1VideoProjectsGetResponseError
 */
const SchemaIn$V1VideoProjectsGetResponseError: z.ZodType<
  V1VideoProjectsGetResponseError, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1VideoProjectsGetResponseError
 */
const SchemaOut$V1VideoProjectsGetResponseError: z.ZodType<
  External$V1VideoProjectsGetResponseError, // output type of this zod object
  z.ZodTypeDef,
  V1VideoProjectsGetResponseError // the object to be transformed
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

export const Schemas$V1VideoProjectsGetResponseError = {
  in: SchemaIn$V1VideoProjectsGetResponseError,
  out: SchemaOut$V1VideoProjectsGetResponseError,
};
