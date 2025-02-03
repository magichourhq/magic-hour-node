import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * When a request fails validations
 */
export type DeleteV1VideoProjectsIdResponse422 = {
  message: string;
};

/**
 * @internal
 * DeleteV1VideoProjectsIdResponse422 without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$DeleteV1VideoProjectsIdResponse422 = {
  message: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object DeleteV1VideoProjectsIdResponse422
 */
const SchemaIn$DeleteV1VideoProjectsIdResponse422: z.ZodType<
  DeleteV1VideoProjectsIdResponse422, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$DeleteV1VideoProjectsIdResponse422
 */
const SchemaOut$DeleteV1VideoProjectsIdResponse422: z.ZodType<
  External$DeleteV1VideoProjectsIdResponse422, // output type of this zod object
  z.ZodTypeDef,
  DeleteV1VideoProjectsIdResponse422 // the object to be transformed
> = z
  .object({
    message: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      message: "message",
    });
  });

export const Schemas$DeleteV1VideoProjectsIdResponse422 = {
  in: SchemaIn$DeleteV1VideoProjectsIdResponse422,
  out: SchemaOut$DeleteV1VideoProjectsIdResponse422,
};
