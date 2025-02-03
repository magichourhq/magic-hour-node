import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * The request is not properly authenticated
 */
export type GetV1VideoProjectsIdResponse401 = {
  message: "Unauthorized";
};

/**
 * @internal
 * GetV1VideoProjectsIdResponse401 without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$GetV1VideoProjectsIdResponse401 = {
  message: "Unauthorized";
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object GetV1VideoProjectsIdResponse401
 */
const SchemaIn$GetV1VideoProjectsIdResponse401: z.ZodType<
  GetV1VideoProjectsIdResponse401, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$GetV1VideoProjectsIdResponse401
 */
const SchemaOut$GetV1VideoProjectsIdResponse401: z.ZodType<
  External$GetV1VideoProjectsIdResponse401, // output type of this zod object
  z.ZodTypeDef,
  GetV1VideoProjectsIdResponse401 // the object to be transformed
> = z
  .object({
    message: z.enum(["Unauthorized"]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      message: "message",
    });
  });

export const Schemas$GetV1VideoProjectsIdResponse401 = {
  in: SchemaIn$GetV1VideoProjectsIdResponse401,
  out: SchemaOut$GetV1VideoProjectsIdResponse401,
};
