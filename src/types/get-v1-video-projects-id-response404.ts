import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Requested resource is not found
 */
export type GetV1VideoProjectsIdResponse404 = {
  message: "Not Found";
};

/**
 * @internal
 * GetV1VideoProjectsIdResponse404 without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$GetV1VideoProjectsIdResponse404 = {
  message: "Not Found";
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object GetV1VideoProjectsIdResponse404
 */
const SchemaIn$GetV1VideoProjectsIdResponse404: z.ZodType<
  GetV1VideoProjectsIdResponse404, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    message: z.enum(["Not Found"]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      message: "message",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$GetV1VideoProjectsIdResponse404
 */
const SchemaOut$GetV1VideoProjectsIdResponse404: z.ZodType<
  External$GetV1VideoProjectsIdResponse404, // output type of this zod object
  z.ZodTypeDef,
  GetV1VideoProjectsIdResponse404 // the object to be transformed
> = z
  .object({
    message: z.enum(["Not Found"]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      message: "message",
    });
  });

export const Schemas$GetV1VideoProjectsIdResponse404 = {
  in: SchemaIn$GetV1VideoProjectsIdResponse404,
  out: SchemaOut$GetV1VideoProjectsIdResponse404,
};
