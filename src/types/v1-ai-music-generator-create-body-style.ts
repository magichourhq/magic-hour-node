import { zodRequiredAny, zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * V1AiMusicGeneratorCreateBodyStyle
 */
export type V1AiMusicGeneratorCreateBodyStyle = {
  /**
   * Generate music without vocals. When true, lyrics is ignored.
   */
  instrumental?: boolean | undefined;
  /**
   * Custom lyrics. Omit or leave blank for AI-generated lyrics when instrumental is false.
   */
  lyrics?: string | undefined;
  /**
   * Describe the song, including genre, mood, and instruments.
   */
  prompt: string;

  // Index types must also accommodate all defined properties if present (typescript limitation)
  // In reality all additional properties should only have type `any`
  // (there might be some duplication here)
  [additionalProperty: string]:
    | (boolean | undefined)
    | (string | undefined)
    | string
    | any
    | null
    | undefined;
};

/**
 * @internal
 * V1AiMusicGeneratorCreateBodyStyle without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiMusicGeneratorCreateBodyStyle = {
  instrumental?: boolean | undefined;
  lyrics?: string | undefined;
  prompt: string;

  [additionalProperty: string]:
    | (boolean | undefined)
    | (string | undefined)
    | string
    | External$V1AiMusicGeneratorCreateBodyStyle
    | null
    | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiMusicGeneratorCreateBodyStyle
 */
const SchemaIn$V1AiMusicGeneratorCreateBodyStyle: z.ZodType<
  V1AiMusicGeneratorCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    instrumental: z.boolean().optional(),
    lyrics: z.string().optional(),
    prompt: z.string(),
  })
  .catchall(zodRequiredAny)
  .transform((obj) => {
    return zodTransform(obj, {
      instrumental: "instrumental",
      lyrics: "lyrics",
      prompt: "prompt",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiMusicGeneratorCreateBodyStyle
 */
const SchemaOut$V1AiMusicGeneratorCreateBodyStyle: z.ZodType<
  External$V1AiMusicGeneratorCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  V1AiMusicGeneratorCreateBodyStyle // the object to be transformed
> = z
  .object({
    instrumental: z.boolean().optional(),
    lyrics: z.string().optional(),
    prompt: z.string(),
  })
  .catchall(zodRequiredAny)
  .transform((obj) => {
    return zodTransform(obj, {
      instrumental: "instrumental",
      lyrics: "lyrics",
      prompt: "prompt",
    });
  });

export const Schemas$V1AiMusicGeneratorCreateBodyStyle = {
  in: SchemaIn$V1AiMusicGeneratorCreateBodyStyle,
  out: SchemaOut$V1AiMusicGeneratorCreateBodyStyle,
};
