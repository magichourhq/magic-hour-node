import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * In the case of an error, this object will contain the error encountered during video render
 */
export type GetV1ImageProjectsIdResponseError = {
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
 * GetV1ImageProjectsIdResponseError without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$GetV1ImageProjectsIdResponseError = {
  code: string;
  message: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object GetV1ImageProjectsIdResponseError
 */
const SchemaIn$GetV1ImageProjectsIdResponseError: z.ZodType<
  GetV1ImageProjectsIdResponseError, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$GetV1ImageProjectsIdResponseError
 */
const SchemaOut$GetV1ImageProjectsIdResponseError: z.ZodType<
  External$GetV1ImageProjectsIdResponseError, // output type of this zod object
  z.ZodTypeDef,
  GetV1ImageProjectsIdResponseError // the object to be transformed
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

export const Schemas$GetV1ImageProjectsIdResponseError = {
  in: SchemaIn$GetV1ImageProjectsIdResponseError,
  out: SchemaOut$GetV1ImageProjectsIdResponseError,
};
