import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * The content used to generate speech.
 */
export type V1AiVoiceGeneratorCreateBodyStyle = {
  /**
   * Text used to generate speech. Starter tier users can use up to 200 characters, while Creator, Pro, or Business users can use up to 1000.
   */
  prompt: string;
  /**
   * The voice to use for the speech. Available voices: Elon Musk, Mark Zuckerberg, Joe Rogan, Barack Obama, Morgan Freeman, Kanye West, Donald Trump, Joe Biden, Kim Kardashian, Taylor Swift
   */
  voiceName:
    | "Barack Obama"
    | "Donald Trump"
    | "Elon Musk"
    | "Joe Biden"
    | "Joe Rogan"
    | "Kanye West"
    | "Kim Kardashian"
    | "Mark Zuckerberg"
    | "Morgan Freeman"
    | "Taylor Swift";
};

/**
 * @internal
 * V1AiVoiceGeneratorCreateBodyStyle without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiVoiceGeneratorCreateBodyStyle = {
  prompt: string;
  voice_name:
    | "Barack Obama"
    | "Donald Trump"
    | "Elon Musk"
    | "Joe Biden"
    | "Joe Rogan"
    | "Kanye West"
    | "Kim Kardashian"
    | "Mark Zuckerberg"
    | "Morgan Freeman"
    | "Taylor Swift";
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiVoiceGeneratorCreateBodyStyle
 */
const SchemaIn$V1AiVoiceGeneratorCreateBodyStyle: z.ZodType<
  V1AiVoiceGeneratorCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    prompt: z.string(),
    voice_name: z.enum([
      "Barack Obama",
      "Donald Trump",
      "Elon Musk",
      "Joe Biden",
      "Joe Rogan",
      "Kanye West",
      "Kim Kardashian",
      "Mark Zuckerberg",
      "Morgan Freeman",
      "Taylor Swift",
    ]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      prompt: "prompt",
      voice_name: "voiceName",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiVoiceGeneratorCreateBodyStyle
 */
const SchemaOut$V1AiVoiceGeneratorCreateBodyStyle: z.ZodType<
  External$V1AiVoiceGeneratorCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  V1AiVoiceGeneratorCreateBodyStyle // the object to be transformed
> = z
  .object({
    prompt: z.string(),
    voiceName: z.enum([
      "Barack Obama",
      "Donald Trump",
      "Elon Musk",
      "Joe Biden",
      "Joe Rogan",
      "Kanye West",
      "Kim Kardashian",
      "Mark Zuckerberg",
      "Morgan Freeman",
      "Taylor Swift",
    ]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      prompt: "prompt",
      voiceName: "voice_name",
    });
  });

export const Schemas$V1AiVoiceGeneratorCreateBodyStyle = {
  in: SchemaIn$V1AiVoiceGeneratorCreateBodyStyle,
  out: SchemaOut$V1AiVoiceGeneratorCreateBodyStyle,
};
