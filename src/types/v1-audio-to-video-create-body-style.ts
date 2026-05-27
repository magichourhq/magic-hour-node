import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * Attributes used to dictate the style of the output
 */
export type V1AudioToVideoCreateBodyStyle = {
  /**
   * Prompt to guide the visual style of the video.
   */
  prompt?: string | undefined;
};

/**
 * @internal
 * V1AudioToVideoCreateBodyStyle without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AudioToVideoCreateBodyStyle = {
  prompt?: string | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AudioToVideoCreateBodyStyle
 */
const SchemaIn$V1AudioToVideoCreateBodyStyle: z.ZodType<
  V1AudioToVideoCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    prompt: z.string().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      prompt: "prompt",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AudioToVideoCreateBodyStyle
 */
const SchemaOut$V1AudioToVideoCreateBodyStyle: z.ZodType<
  External$V1AudioToVideoCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  V1AudioToVideoCreateBodyStyle // the object to be transformed
> = z
  .object({
    prompt: z.string().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      prompt: "prompt",
    });
  });

export const Schemas$V1AudioToVideoCreateBodyStyle = {
  in: SchemaIn$V1AudioToVideoCreateBodyStyle,
  out: SchemaOut$V1AudioToVideoCreateBodyStyle,
};
