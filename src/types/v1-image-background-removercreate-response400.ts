import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * The request is invalid
 */
export type V1ImageBackgroundRemovercreateResponse400 = {
  message: string;
};

/**
 * @internal
 * V1ImageBackgroundRemovercreateResponse400 without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1ImageBackgroundRemovercreateResponse400 = {
  message: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1ImageBackgroundRemovercreateResponse400
 */
const SchemaIn$V1ImageBackgroundRemovercreateResponse400: z.ZodType<
  V1ImageBackgroundRemovercreateResponse400, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1ImageBackgroundRemovercreateResponse400
 */
const SchemaOut$V1ImageBackgroundRemovercreateResponse400: z.ZodType<
  External$V1ImageBackgroundRemovercreateResponse400, // output type of this zod object
  z.ZodTypeDef,
  V1ImageBackgroundRemovercreateResponse400 // the object to be transformed
> = z
  .object({
    message: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      message: "message",
    });
  });

export const Schemas$V1ImageBackgroundRemovercreateResponse400 = {
  in: SchemaIn$V1ImageBackgroundRemovercreateResponse400,
  out: SchemaOut$V1ImageBackgroundRemovercreateResponse400,
};
