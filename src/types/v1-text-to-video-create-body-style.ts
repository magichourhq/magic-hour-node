import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * V1TextToVideoCreateBodyStyle
 */
export type V1TextToVideoCreateBodyStyle = {
  /**
   * The prompt used for the video.
   */
  prompt: string;
};

/**
 * @internal
 * V1TextToVideoCreateBodyStyle without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1TextToVideoCreateBodyStyle = {
  prompt: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1TextToVideoCreateBodyStyle
 */
const SchemaIn$V1TextToVideoCreateBodyStyle: z.ZodType<
  V1TextToVideoCreateBodyStyle, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1TextToVideoCreateBodyStyle
 */
const SchemaOut$V1TextToVideoCreateBodyStyle: z.ZodType<
  External$V1TextToVideoCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  V1TextToVideoCreateBodyStyle // the object to be transformed
> = z
  .object({
    prompt: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      prompt: "prompt",
    });
  });

export const Schemas$V1TextToVideoCreateBodyStyle = {
  in: SchemaIn$V1TextToVideoCreateBodyStyle,
  out: SchemaOut$V1TextToVideoCreateBodyStyle,
};
