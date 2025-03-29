import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * V1ImageToVideoCreateBodyStyle
 */
export type V1ImageToVideoCreateBodyStyle = {
  /**
   * High Quality mode enhances detail, sharpness, and realism, making it ideal for portraits, animals, and intricate landscapes.
   */
  highQuality?: boolean | undefined;
  /**
   * The prompt used for the video.
   */
  prompt: string | null;
};

/**
 * @internal
 * V1ImageToVideoCreateBodyStyle without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1ImageToVideoCreateBodyStyle = {
  high_quality?: boolean | undefined;
  prompt: string | null;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1ImageToVideoCreateBodyStyle
 */
const SchemaIn$V1ImageToVideoCreateBodyStyle: z.ZodType<
  V1ImageToVideoCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    high_quality: z.boolean().optional(),
    prompt: z.string().nullable(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      high_quality: "highQuality",
      prompt: "prompt",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1ImageToVideoCreateBodyStyle
 */
const SchemaOut$V1ImageToVideoCreateBodyStyle: z.ZodType<
  External$V1ImageToVideoCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  V1ImageToVideoCreateBodyStyle // the object to be transformed
> = z
  .object({
    highQuality: z.boolean().optional(),
    prompt: z.string().nullable(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      highQuality: "high_quality",
      prompt: "prompt",
    });
  });

export const Schemas$V1ImageToVideoCreateBodyStyle = {
  in: SchemaIn$V1ImageToVideoCreateBodyStyle,
  out: SchemaOut$V1ImageToVideoCreateBodyStyle,
};
