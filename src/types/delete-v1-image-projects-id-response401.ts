import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * The request is not properly authenticated
 */
export type DeleteV1ImageProjectsIdResponse401 = {
  message: "Unauthorized";
};

/**
 * @internal
 * DeleteV1ImageProjectsIdResponse401 without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$DeleteV1ImageProjectsIdResponse401 = {
  message: "Unauthorized";
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object DeleteV1ImageProjectsIdResponse401
 */
const SchemaIn$DeleteV1ImageProjectsIdResponse401: z.ZodType<
  DeleteV1ImageProjectsIdResponse401, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$DeleteV1ImageProjectsIdResponse401
 */
const SchemaOut$DeleteV1ImageProjectsIdResponse401: z.ZodType<
  External$DeleteV1ImageProjectsIdResponse401, // output type of this zod object
  z.ZodTypeDef,
  DeleteV1ImageProjectsIdResponse401 // the object to be transformed
> = z
  .object({
    message: z.enum(["Unauthorized"]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      message: "message",
    });
  });

export const Schemas$DeleteV1ImageProjectsIdResponse401 = {
  in: SchemaIn$DeleteV1ImageProjectsIdResponse401,
  out: SchemaOut$DeleteV1ImageProjectsIdResponse401,
};
