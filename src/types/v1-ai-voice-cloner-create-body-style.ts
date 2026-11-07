import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * V1AiVoiceClonerCreateBodyStyle
 */
export type V1AiVoiceClonerCreateBodyStyle = {
  /**
   * Spoken language. Use a canonical lowercase language name, or auto to detect the language from the text. Defaults to auto.
   */
  language?:
    | (
        | "afrikaans"
        | "albanian"
        | "amharic"
        | "arabic"
        | "armenian"
        | "assamese"
        | "auto"
        | "azerbaijani"
        | "basque"
        | "belarusian"
        | "bengali"
        | "bulgarian"
        | "burmese"
        | "cantonese"
        | "catalan"
        | "cebuano"
        | "chinese"
        | "croatian"
        | "czech"
        | "danish"
        | "dutch"
        | "english"
        | "estonian"
        | "finnish"
        | "french"
        | "galician"
        | "georgian"
        | "german"
        | "greek"
        | "gujarati"
        | "haitian creole"
        | "hebrew"
        | "hindi"
        | "hungarian"
        | "icelandic"
        | "indonesian"
        | "italian"
        | "japanese"
        | "javanese"
        | "kannada"
        | "kazakh"
        | "konkani"
        | "korean"
        | "lao"
        | "latvian"
        | "lithuanian"
        | "luxembourgish"
        | "macedonian"
        | "maithili"
        | "malagasy"
        | "malay"
        | "malayalam"
        | "marathi"
        | "mongolian"
        | "nepali"
        | "norwegian"
        | "odia"
        | "pashto"
        | "persian"
        | "polish"
        | "portuguese"
        | "punjabi"
        | "romanian"
        | "russian"
        | "serbian"
        | "sindhi"
        | "sinhala"
        | "slovak"
        | "slovenian"
        | "spanish"
        | "swahili"
        | "swedish"
        | "tagalog"
        | "tamil"
        | "telugu"
        | "thai"
        | "turkish"
        | "ukrainian"
        | "urdu"
        | "uzbek"
        | "vietnamese"
        | "welsh"
      )
    | undefined;
  /**
   * Text used to generate speech from the cloned voice. The character limit is 5000 characters.
   */
  prompt: string;
  /**
   * Speech speed multiplier, from 0.75 to 1.30 inclusive. Defaults to 1 (normal speed).
   */
  speed?: number | undefined;
};

/**
 * @internal
 * V1AiVoiceClonerCreateBodyStyle without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiVoiceClonerCreateBodyStyle = {
  language?:
    | (
        | "afrikaans"
        | "albanian"
        | "amharic"
        | "arabic"
        | "armenian"
        | "assamese"
        | "auto"
        | "azerbaijani"
        | "basque"
        | "belarusian"
        | "bengali"
        | "bulgarian"
        | "burmese"
        | "cantonese"
        | "catalan"
        | "cebuano"
        | "chinese"
        | "croatian"
        | "czech"
        | "danish"
        | "dutch"
        | "english"
        | "estonian"
        | "finnish"
        | "french"
        | "galician"
        | "georgian"
        | "german"
        | "greek"
        | "gujarati"
        | "haitian creole"
        | "hebrew"
        | "hindi"
        | "hungarian"
        | "icelandic"
        | "indonesian"
        | "italian"
        | "japanese"
        | "javanese"
        | "kannada"
        | "kazakh"
        | "konkani"
        | "korean"
        | "lao"
        | "latvian"
        | "lithuanian"
        | "luxembourgish"
        | "macedonian"
        | "maithili"
        | "malagasy"
        | "malay"
        | "malayalam"
        | "marathi"
        | "mongolian"
        | "nepali"
        | "norwegian"
        | "odia"
        | "pashto"
        | "persian"
        | "polish"
        | "portuguese"
        | "punjabi"
        | "romanian"
        | "russian"
        | "serbian"
        | "sindhi"
        | "sinhala"
        | "slovak"
        | "slovenian"
        | "spanish"
        | "swahili"
        | "swedish"
        | "tagalog"
        | "tamil"
        | "telugu"
        | "thai"
        | "turkish"
        | "ukrainian"
        | "urdu"
        | "uzbek"
        | "vietnamese"
        | "welsh"
      )
    | undefined;
  prompt: string;
  speed?: number | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiVoiceClonerCreateBodyStyle
 */
const SchemaIn$V1AiVoiceClonerCreateBodyStyle: z.ZodType<
  V1AiVoiceClonerCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    language: z
      .enum([
        "afrikaans",
        "albanian",
        "amharic",
        "arabic",
        "armenian",
        "assamese",
        "auto",
        "azerbaijani",
        "basque",
        "belarusian",
        "bengali",
        "bulgarian",
        "burmese",
        "cantonese",
        "catalan",
        "cebuano",
        "chinese",
        "croatian",
        "czech",
        "danish",
        "dutch",
        "english",
        "estonian",
        "finnish",
        "french",
        "galician",
        "georgian",
        "german",
        "greek",
        "gujarati",
        "haitian creole",
        "hebrew",
        "hindi",
        "hungarian",
        "icelandic",
        "indonesian",
        "italian",
        "japanese",
        "javanese",
        "kannada",
        "kazakh",
        "konkani",
        "korean",
        "lao",
        "latvian",
        "lithuanian",
        "luxembourgish",
        "macedonian",
        "maithili",
        "malagasy",
        "malay",
        "malayalam",
        "marathi",
        "mongolian",
        "nepali",
        "norwegian",
        "odia",
        "pashto",
        "persian",
        "polish",
        "portuguese",
        "punjabi",
        "romanian",
        "russian",
        "serbian",
        "sindhi",
        "sinhala",
        "slovak",
        "slovenian",
        "spanish",
        "swahili",
        "swedish",
        "tagalog",
        "tamil",
        "telugu",
        "thai",
        "turkish",
        "ukrainian",
        "urdu",
        "uzbek",
        "vietnamese",
        "welsh",
      ])
      .optional(),
    prompt: z.string(),
    speed: z.number().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      language: "language",
      prompt: "prompt",
      speed: "speed",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiVoiceClonerCreateBodyStyle
 */
const SchemaOut$V1AiVoiceClonerCreateBodyStyle: z.ZodType<
  External$V1AiVoiceClonerCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  V1AiVoiceClonerCreateBodyStyle // the object to be transformed
> = z
  .object({
    language: z
      .enum([
        "afrikaans",
        "albanian",
        "amharic",
        "arabic",
        "armenian",
        "assamese",
        "auto",
        "azerbaijani",
        "basque",
        "belarusian",
        "bengali",
        "bulgarian",
        "burmese",
        "cantonese",
        "catalan",
        "cebuano",
        "chinese",
        "croatian",
        "czech",
        "danish",
        "dutch",
        "english",
        "estonian",
        "finnish",
        "french",
        "galician",
        "georgian",
        "german",
        "greek",
        "gujarati",
        "haitian creole",
        "hebrew",
        "hindi",
        "hungarian",
        "icelandic",
        "indonesian",
        "italian",
        "japanese",
        "javanese",
        "kannada",
        "kazakh",
        "konkani",
        "korean",
        "lao",
        "latvian",
        "lithuanian",
        "luxembourgish",
        "macedonian",
        "maithili",
        "malagasy",
        "malay",
        "malayalam",
        "marathi",
        "mongolian",
        "nepali",
        "norwegian",
        "odia",
        "pashto",
        "persian",
        "polish",
        "portuguese",
        "punjabi",
        "romanian",
        "russian",
        "serbian",
        "sindhi",
        "sinhala",
        "slovak",
        "slovenian",
        "spanish",
        "swahili",
        "swedish",
        "tagalog",
        "tamil",
        "telugu",
        "thai",
        "turkish",
        "ukrainian",
        "urdu",
        "uzbek",
        "vietnamese",
        "welsh",
      ])
      .optional(),
    prompt: z.string(),
    speed: z.number().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      language: "language",
      prompt: "prompt",
      speed: "speed",
    });
  });

export const Schemas$V1AiVoiceClonerCreateBodyStyle = {
  in: SchemaIn$V1AiVoiceClonerCreateBodyStyle,
  out: SchemaOut$V1AiVoiceClonerCreateBodyStyle,
};
