import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * The request is invalid
 */
export type DeleteV1VideoProjectsIdResponse400 = {
  message: string;
};

/**
 * @internal
 * DeleteV1VideoProjectsIdResponse400 without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$DeleteV1VideoProjectsIdResponse400 = {
  message: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object DeleteV1VideoProjectsIdResponse400
 */
const SchemaIn$DeleteV1VideoProjectsIdResponse400: z.ZodType<
  DeleteV1VideoProjectsIdResponse400, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$DeleteV1VideoProjectsIdResponse400
 */
const SchemaOut$DeleteV1VideoProjectsIdResponse400: z.ZodType<
  External$DeleteV1VideoProjectsIdResponse400, // output type of this zod object
  z.ZodTypeDef,
  DeleteV1VideoProjectsIdResponse400 // the object to be transformed
> = z
  .object({
    message: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      message: "message",
    });
  });

export const Schemas$DeleteV1VideoProjectsIdResponse400 = {
  in: SchemaIn$DeleteV1VideoProjectsIdResponse400,
  out: SchemaOut$DeleteV1VideoProjectsIdResponse400,
};
