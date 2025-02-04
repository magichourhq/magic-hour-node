import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * In the case of an error, this object will contain the error encountered during video render
 */
export type V1ImageProjectsgetResponseError = {
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
 * V1ImageProjectsgetResponseError without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1ImageProjectsgetResponseError = {
  code: string;
  message: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1ImageProjectsgetResponseError
 */
const SchemaIn$V1ImageProjectsgetResponseError: z.ZodType<
  V1ImageProjectsgetResponseError, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1ImageProjectsgetResponseError
 */
const SchemaOut$V1ImageProjectsgetResponseError: z.ZodType<
  External$V1ImageProjectsgetResponseError, // output type of this zod object
  z.ZodTypeDef,
  V1ImageProjectsgetResponseError // the object to be transformed
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

export const Schemas$V1ImageProjectsgetResponseError = {
  in: SchemaIn$V1ImageProjectsgetResponseError,
  out: SchemaOut$V1ImageProjectsgetResponseError,
};
