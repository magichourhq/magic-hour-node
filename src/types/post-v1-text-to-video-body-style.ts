import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * PostV1TextToVideoBodyStyle
 */
export type PostV1TextToVideoBodyStyle = {
  /**
   * The prompt used for the video.
   */
  prompt: string;
};

/**
 * @internal
 * PostV1TextToVideoBodyStyle without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1TextToVideoBodyStyle = {
  prompt: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1TextToVideoBodyStyle
 */
const SchemaIn$PostV1TextToVideoBodyStyle: z.ZodType<
  PostV1TextToVideoBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    prompt: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      prompt: "prompt",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1TextToVideoBodyStyle
 */
const SchemaOut$PostV1TextToVideoBodyStyle: z.ZodType<
  External$PostV1TextToVideoBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  PostV1TextToVideoBodyStyle // the object to be transformed
> = z
  .object({
    prompt: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      prompt: "prompt",
    });
  });

export const Schemas$PostV1TextToVideoBodyStyle = {
  in: SchemaIn$PostV1TextToVideoBodyStyle,
  out: SchemaOut$PostV1TextToVideoBodyStyle,
};
