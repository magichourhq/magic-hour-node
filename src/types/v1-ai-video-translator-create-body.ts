import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1AiVideoTranslatorCreateBodyAssets,
  Schemas$V1AiVideoTranslatorCreateBodyAssets,
  V1AiVideoTranslatorCreateBodyAssets,
} from "./v1-ai-video-translator-create-body-assets";

/**
 * V1AiVideoTranslatorCreateBody
 */
export type V1AiVideoTranslatorCreateBody = {
  /**
   * Source video for the translation job.
   */
  assets: V1AiVideoTranslatorCreateBodyAssets;
  /**
   * End time of your clip (seconds). Must be greater than start_seconds. The clip must be 1-30 seconds long.
   */
  endSeconds: number;
  /**
   * Give your video a custom name for easy identification.
   */
  name?: string | undefined;
  /**
   * Output video resolution. Defaults to 480p. 720p and 1080p require a paid plan.
   */
  resolution?: ("1080p" | "480p" | "720p") | undefined;
  /**
   * Start time of your clip (seconds). Must be ≥ 0.
   */
  startSeconds?: number | undefined;
  /**
   * Language to translate the video's speech into.
   */
  targetLanguage:
    | "Afrikaans"
    | "Arabic"
    | "Bengali"
    | "Bulgarian"
    | "Catalan"
    | "Chinese (Simplified)"
    | "Chinese (Traditional)"
    | "Croatian"
    | "Czech"
    | "Danish"
    | "Dutch"
    | "English"
    | "Estonian"
    | "Finnish"
    | "French"
    | "German"
    | "Greek"
    | "Gujarati"
    | "Hebrew"
    | "Hindi"
    | "Hungarian"
    | "Indonesian"
    | "Italian"
    | "Japanese"
    | "Kannada"
    | "Kazakh"
    | "Korean"
    | "Latvian"
    | "Lithuanian"
    | "Malay"
    | "Malayalam"
    | "Marathi"
    | "Norwegian"
    | "Persian"
    | "Polish"
    | "Portuguese"
    | "Punjabi"
    | "Romanian"
    | "Russian"
    | "Serbian"
    | "Slovak"
    | "Slovenian"
    | "Spanish"
    | "Swahili"
    | "Swedish"
    | "Tamil"
    | "Telugu"
    | "Thai"
    | "Turkish"
    | "Ukrainian"
    | "Urdu"
    | "Vietnamese"
    | "Welsh";
};

/**
 * @internal
 * V1AiVideoTranslatorCreateBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiVideoTranslatorCreateBody = {
  assets: External$V1AiVideoTranslatorCreateBodyAssets;
  end_seconds: number;
  name?: string | undefined;
  resolution?: ("1080p" | "480p" | "720p") | undefined;
  start_seconds?: number | undefined;
  target_language:
    | "Afrikaans"
    | "Arabic"
    | "Bengali"
    | "Bulgarian"
    | "Catalan"
    | "Chinese (Simplified)"
    | "Chinese (Traditional)"
    | "Croatian"
    | "Czech"
    | "Danish"
    | "Dutch"
    | "English"
    | "Estonian"
    | "Finnish"
    | "French"
    | "German"
    | "Greek"
    | "Gujarati"
    | "Hebrew"
    | "Hindi"
    | "Hungarian"
    | "Indonesian"
    | "Italian"
    | "Japanese"
    | "Kannada"
    | "Kazakh"
    | "Korean"
    | "Latvian"
    | "Lithuanian"
    | "Malay"
    | "Malayalam"
    | "Marathi"
    | "Norwegian"
    | "Persian"
    | "Polish"
    | "Portuguese"
    | "Punjabi"
    | "Romanian"
    | "Russian"
    | "Serbian"
    | "Slovak"
    | "Slovenian"
    | "Spanish"
    | "Swahili"
    | "Swedish"
    | "Tamil"
    | "Telugu"
    | "Thai"
    | "Turkish"
    | "Ukrainian"
    | "Urdu"
    | "Vietnamese"
    | "Welsh";
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiVideoTranslatorCreateBody
 */
const SchemaIn$V1AiVideoTranslatorCreateBody: z.ZodType<
  V1AiVideoTranslatorCreateBody, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    assets: Schemas$V1AiVideoTranslatorCreateBodyAssets.in,
    end_seconds: z.number(),
    name: z.string().optional(),
    resolution: z.enum(["1080p", "480p", "720p"]).optional(),
    start_seconds: z.number().optional(),
    target_language: z.enum([
      "Afrikaans",
      "Arabic",
      "Bengali",
      "Bulgarian",
      "Catalan",
      "Chinese (Simplified)",
      "Chinese (Traditional)",
      "Croatian",
      "Czech",
      "Danish",
      "Dutch",
      "English",
      "Estonian",
      "Finnish",
      "French",
      "German",
      "Greek",
      "Gujarati",
      "Hebrew",
      "Hindi",
      "Hungarian",
      "Indonesian",
      "Italian",
      "Japanese",
      "Kannada",
      "Kazakh",
      "Korean",
      "Latvian",
      "Lithuanian",
      "Malay",
      "Malayalam",
      "Marathi",
      "Norwegian",
      "Persian",
      "Polish",
      "Portuguese",
      "Punjabi",
      "Romanian",
      "Russian",
      "Serbian",
      "Slovak",
      "Slovenian",
      "Spanish",
      "Swahili",
      "Swedish",
      "Tamil",
      "Telugu",
      "Thai",
      "Turkish",
      "Ukrainian",
      "Urdu",
      "Vietnamese",
      "Welsh",
    ]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      end_seconds: "endSeconds",
      name: "name",
      resolution: "resolution",
      start_seconds: "startSeconds",
      target_language: "targetLanguage",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiVideoTranslatorCreateBody
 */
const SchemaOut$V1AiVideoTranslatorCreateBody: z.ZodType<
  External$V1AiVideoTranslatorCreateBody, // output type of this zod object
  z.ZodTypeDef,
  V1AiVideoTranslatorCreateBody // the object to be transformed
> = z
  .object({
    assets: Schemas$V1AiVideoTranslatorCreateBodyAssets.out,
    endSeconds: z.number(),
    name: z.string().optional(),
    resolution: z.enum(["1080p", "480p", "720p"]).optional(),
    startSeconds: z.number().optional(),
    targetLanguage: z.enum([
      "Afrikaans",
      "Arabic",
      "Bengali",
      "Bulgarian",
      "Catalan",
      "Chinese (Simplified)",
      "Chinese (Traditional)",
      "Croatian",
      "Czech",
      "Danish",
      "Dutch",
      "English",
      "Estonian",
      "Finnish",
      "French",
      "German",
      "Greek",
      "Gujarati",
      "Hebrew",
      "Hindi",
      "Hungarian",
      "Indonesian",
      "Italian",
      "Japanese",
      "Kannada",
      "Kazakh",
      "Korean",
      "Latvian",
      "Lithuanian",
      "Malay",
      "Malayalam",
      "Marathi",
      "Norwegian",
      "Persian",
      "Polish",
      "Portuguese",
      "Punjabi",
      "Romanian",
      "Russian",
      "Serbian",
      "Slovak",
      "Slovenian",
      "Spanish",
      "Swahili",
      "Swedish",
      "Tamil",
      "Telugu",
      "Thai",
      "Turkish",
      "Ukrainian",
      "Urdu",
      "Vietnamese",
      "Welsh",
    ]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      endSeconds: "end_seconds",
      name: "name",
      resolution: "resolution",
      startSeconds: "start_seconds",
      targetLanguage: "target_language",
    });
  });

export const Schemas$V1AiVideoTranslatorCreateBody = {
  in: SchemaIn$V1AiVideoTranslatorCreateBody,
  out: SchemaOut$V1AiVideoTranslatorCreateBody,
};
