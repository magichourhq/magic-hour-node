import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * The request is invalid
 */
export type GetV1VideoProjectsIdResponse400 = {
  message: string;
};

/**
 * @internal
 * GetV1VideoProjectsIdResponse400 without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$GetV1VideoProjectsIdResponse400 = {
  message: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object GetV1VideoProjectsIdResponse400
 */
const SchemaIn$GetV1VideoProjectsIdResponse400: z.ZodType<
  GetV1VideoProjectsIdResponse400, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$GetV1VideoProjectsIdResponse400
 */
const SchemaOut$GetV1VideoProjectsIdResponse400: z.ZodType<
  External$GetV1VideoProjectsIdResponse400, // output type of this zod object
  z.ZodTypeDef,
  GetV1VideoProjectsIdResponse400 // the object to be transformed
> = z
  .object({
    message: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      message: "message",
    });
  });

export const Schemas$GetV1VideoProjectsIdResponse400 = {
  in: SchemaIn$GetV1VideoProjectsIdResponse400,
  out: SchemaOut$GetV1VideoProjectsIdResponse400,
};
