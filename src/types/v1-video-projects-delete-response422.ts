import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * When a request fails validations
 */
export type V1VideoProjectsDeleteResponse422 = {
  message: string;
};

/**
 * @internal
 * V1VideoProjectsDeleteResponse422 without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1VideoProjectsDeleteResponse422 = {
  message: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1VideoProjectsDeleteResponse422
 */
const SchemaIn$V1VideoProjectsDeleteResponse422: z.ZodType<
  V1VideoProjectsDeleteResponse422, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    message: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      message: "message",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1VideoProjectsDeleteResponse422
 */
const SchemaOut$V1VideoProjectsDeleteResponse422: z.ZodType<
  External$V1VideoProjectsDeleteResponse422, // output type of this zod object
  z.ZodTypeDef,
  V1VideoProjectsDeleteResponse422 // the object to be transformed
> = z
  .object({
    message: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      message: "message",
    });
  });

export const Schemas$V1VideoProjectsDeleteResponse422 = {
  in: SchemaIn$V1VideoProjectsDeleteResponse422,
  out: SchemaOut$V1VideoProjectsDeleteResponse422,
};
