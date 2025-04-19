import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Attributed used to dictate the style of the output
 */
export type V1ImageToVideoCreateBodyStyle = {
  /**
   * Deprecated: Please use `quality_mode` instead. For backward compatibility, setting `high_quality: true` and `quality_mode: quick` will map to `quality_mode: studio`. Note: `quality_mode: studio` offers the same quality as `high_quality: true`.
   */
  highQuality?: boolean | undefined;
  /**
   * The prompt used for the video.
   */
  prompt?: string | undefined;
  /**
   * * `quick` - Fastest option for rapid results. Takes ~3 minutes per 5s of video.
   * *  `studio` - Polished visuals with longer runtime. Takes ~8.5 minutes per 5s of video.
   */
  qualityMode?: ("quick" | "studio") | undefined;
};

/**
 * @internal
 * V1ImageToVideoCreateBodyStyle without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1ImageToVideoCreateBodyStyle = {
  high_quality?: boolean | undefined;
  prompt?: string | undefined;
  quality_mode?: ("quick" | "studio") | undefined;
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
    prompt: z.string().optional(),
    quality_mode: z.enum(["quick", "studio"]).optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      high_quality: "highQuality",
      prompt: "prompt",
      quality_mode: "qualityMode",
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
    prompt: z.string().optional(),
    qualityMode: z.enum(["quick", "studio"]).optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      highQuality: "high_quality",
      prompt: "prompt",
      qualityMode: "quality_mode",
    });
  });

export const Schemas$V1ImageToVideoCreateBodyStyle = {
  in: SchemaIn$V1ImageToVideoCreateBodyStyle,
  out: SchemaOut$V1ImageToVideoCreateBodyStyle,
};
