import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * Attributed used to dictate the style of the output
 */
export type V1ImageToVideoCreateBodyStyle = {
  /**
   * Deprecated: Please use `resolution` instead. For backward compatibility,
   * * `false` maps to 720p resolution
   * * `true` maps to 1080p resolution
   *
   * This field will be removed in a future version. Use the `resolution` field to directly specify the resolution.
   */
  highQuality?: boolean | undefined;
  /**
   * The prompt used for the video. Maximum length depends on the model that runs, in characters:
   *
   * * **`gemini-omni-1.2`**: 4000 characters.
   * * **`kling-2.6`**: 2500 characters.
   * * **`kling-3.0`**: 2500 characters.
   * * **`kling-4.0`**: 10000 characters.
   * * **`ltx-2.5`**: 4000 characters.
   * * **`minimax-h3`**: 20000 characters.
   * * **`seedance-1.5`**: 4000 characters.
   * * **`seedance-2.0`**: 4000 characters.
   * * **`seedance-2.0-fast`**: 4000 characters.
   * * **`seedance-2.0-mini`**: 4000 characters.
   * * **`seedance-2.5`**: 4000 characters.
   * * **`veo3.1`**: 2500 characters.
   * * **`veo3.1-lite`**: 2500 characters.
   * * **`wan-2.2`**: 10000 characters.
   * * **`wan-3.0`**: 10000 characters.
   *
   * For `default`, the limit of the automatically selected model applies. Selection depends on subscription tier, resolution and duration. Specify an explicit model to use a known prompt limit. Prompts exceeding the effective model's limit are rejected, not truncated.
   */
  prompt?: string | undefined;
  /**
   * DEPRECATED: Please use `resolution` field instead. For backward compatibility:
   * * `quick` maps to 720p resolution
   * * `studio` maps to 1080p resolution
   *
   * This field will be removed in a future version. Use the `resolution` field to directly to specify the resolution.
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
