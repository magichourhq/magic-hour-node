import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * In the case of an error, this object will contain the error encountered during video render
 */
export type V1VideoProjectsgetResponseError = {
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
 * V1VideoProjectsgetResponseError without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1VideoProjectsgetResponseError = {
  code: string;
  message: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1VideoProjectsgetResponseError
 */
const SchemaIn$V1VideoProjectsgetResponseError: z.ZodType<
  V1VideoProjectsgetResponseError, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1VideoProjectsgetResponseError
 */
const SchemaOut$V1VideoProjectsgetResponseError: z.ZodType<
  External$V1VideoProjectsgetResponseError, // output type of this zod object
  z.ZodTypeDef,
  V1VideoProjectsgetResponseError // the object to be transformed
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

export const Schemas$V1VideoProjectsgetResponseError = {
  in: SchemaIn$V1VideoProjectsgetResponseError,
  out: SchemaOut$V1VideoProjectsgetResponseError,
};
