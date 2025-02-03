import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * The request is invalid
 */
export type GetV1ImageProjectsIdResponse400 = {
  message: string;
};

/**
 * @internal
 * GetV1ImageProjectsIdResponse400 without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$GetV1ImageProjectsIdResponse400 = {
  message: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object GetV1ImageProjectsIdResponse400
 */
const SchemaIn$GetV1ImageProjectsIdResponse400: z.ZodType<
  GetV1ImageProjectsIdResponse400, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$GetV1ImageProjectsIdResponse400
 */
const SchemaOut$GetV1ImageProjectsIdResponse400: z.ZodType<
  External$GetV1ImageProjectsIdResponse400, // output type of this zod object
  z.ZodTypeDef,
  GetV1ImageProjectsIdResponse400 // the object to be transformed
> = z
  .object({
    message: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      message: "message",
    });
  });

export const Schemas$GetV1ImageProjectsIdResponse400 = {
  in: SchemaIn$GetV1ImageProjectsIdResponse400,
  out: SchemaOut$GetV1ImageProjectsIdResponse400,
};
