import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Requested resource is not found
 */
export type DeleteV1VideoProjectsIdResponse404 = {
  message: "Not Found";
};

/**
 * @internal
 * DeleteV1VideoProjectsIdResponse404 without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$DeleteV1VideoProjectsIdResponse404 = {
  message: "Not Found";
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object DeleteV1VideoProjectsIdResponse404
 */
const SchemaIn$DeleteV1VideoProjectsIdResponse404: z.ZodType<
  DeleteV1VideoProjectsIdResponse404, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$DeleteV1VideoProjectsIdResponse404
 */
const SchemaOut$DeleteV1VideoProjectsIdResponse404: z.ZodType<
  External$DeleteV1VideoProjectsIdResponse404, // output type of this zod object
  z.ZodTypeDef,
  DeleteV1VideoProjectsIdResponse404 // the object to be transformed
> = z
  .object({
    message: z.enum(["Not Found"]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      message: "message",
    });
  });

export const Schemas$DeleteV1VideoProjectsIdResponse404 = {
  in: SchemaIn$DeleteV1VideoProjectsIdResponse404,
  out: SchemaOut$DeleteV1VideoProjectsIdResponse404,
};
