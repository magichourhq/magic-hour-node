import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * In the case of an error, this object will contain the error encountered during video render
 */
export type GetV1VideoProjectsIdResponseError = {
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
 * GetV1VideoProjectsIdResponseError without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$GetV1VideoProjectsIdResponseError = {
  code: string;
  message: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object GetV1VideoProjectsIdResponseError
 */
const SchemaIn$GetV1VideoProjectsIdResponseError: z.ZodType<
  GetV1VideoProjectsIdResponseError, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$GetV1VideoProjectsIdResponseError
 */
const SchemaOut$GetV1VideoProjectsIdResponseError: z.ZodType<
  External$GetV1VideoProjectsIdResponseError, // output type of this zod object
  z.ZodTypeDef,
  GetV1VideoProjectsIdResponseError // the object to be transformed
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

export const Schemas$GetV1VideoProjectsIdResponseError = {
  in: SchemaIn$GetV1VideoProjectsIdResponseError,
  out: SchemaOut$GetV1VideoProjectsIdResponseError,
};
