import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * The request is invalid
 */
export type V1ImageBackgroundRemoverCreateResponse400 = {
  message: string;
};

/**
 * @internal
 * V1ImageBackgroundRemoverCreateResponse400 without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1ImageBackgroundRemoverCreateResponse400 = {
  message: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1ImageBackgroundRemoverCreateResponse400
 */
const SchemaIn$V1ImageBackgroundRemoverCreateResponse400: z.ZodType<
  V1ImageBackgroundRemoverCreateResponse400, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1ImageBackgroundRemoverCreateResponse400
 */
const SchemaOut$V1ImageBackgroundRemoverCreateResponse400: z.ZodType<
  External$V1ImageBackgroundRemoverCreateResponse400, // output type of this zod object
  z.ZodTypeDef,
  V1ImageBackgroundRemoverCreateResponse400 // the object to be transformed
> = z
  .object({
    message: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      message: "message",
    });
  });

export const Schemas$V1ImageBackgroundRemoverCreateResponse400 = {
  in: SchemaIn$V1ImageBackgroundRemoverCreateResponse400,
  out: SchemaOut$V1ImageBackgroundRemoverCreateResponse400,
};
