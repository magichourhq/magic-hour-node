import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * PostV1ImageToVideoBodyStyle
 */
export type PostV1ImageToVideoBodyStyle = {
  /**
   * The prompt used for the video.
   */
  prompt: string | null;
};

/**
 * @internal
 * PostV1ImageToVideoBodyStyle without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1ImageToVideoBodyStyle = {
  prompt: string | null;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1ImageToVideoBodyStyle
 */
const SchemaIn$PostV1ImageToVideoBodyStyle: z.ZodType<
  PostV1ImageToVideoBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    prompt: z.string().nullable(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      prompt: "prompt",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1ImageToVideoBodyStyle
 */
const SchemaOut$PostV1ImageToVideoBodyStyle: z.ZodType<
  External$PostV1ImageToVideoBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  PostV1ImageToVideoBodyStyle // the object to be transformed
> = z
  .object({
    prompt: z.string().nullable(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      prompt: "prompt",
    });
  });

export const Schemas$PostV1ImageToVideoBodyStyle = {
  in: SchemaIn$PostV1ImageToVideoBodyStyle,
  out: SchemaOut$PostV1ImageToVideoBodyStyle,
};
