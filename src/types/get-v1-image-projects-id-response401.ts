import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * The request is not properly authenticated
 */
export type GetV1ImageProjectsIdResponse401 = {
  message: "Unauthorized";
};

/**
 * @internal
 * GetV1ImageProjectsIdResponse401 without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$GetV1ImageProjectsIdResponse401 = {
  message: "Unauthorized";
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object GetV1ImageProjectsIdResponse401
 */
const SchemaIn$GetV1ImageProjectsIdResponse401: z.ZodType<
  GetV1ImageProjectsIdResponse401, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$GetV1ImageProjectsIdResponse401
 */
const SchemaOut$GetV1ImageProjectsIdResponse401: z.ZodType<
  External$GetV1ImageProjectsIdResponse401, // output type of this zod object
  z.ZodTypeDef,
  GetV1ImageProjectsIdResponse401 // the object to be transformed
> = z
  .object({
    message: z.enum(["Unauthorized"]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      message: "message",
    });
  });

export const Schemas$GetV1ImageProjectsIdResponse401 = {
  in: SchemaIn$GetV1ImageProjectsIdResponse401,
  out: SchemaOut$GetV1ImageProjectsIdResponse401,
};
