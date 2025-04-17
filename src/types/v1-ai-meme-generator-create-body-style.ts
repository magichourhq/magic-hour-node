import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * V1AiMemeGeneratorCreateBodyStyle
 */
export type V1AiMemeGeneratorCreateBodyStyle = {
  /**
   * Whether to search the web for meme content.
   */
  searchWeb?: boolean | undefined;
  /**
   * To use our templates, pass in one of the enum values.
   */
  template:
    | "Bike Fall"
    | "Change My Mind"
    | "Disappointed Guy"
    | "Drake Hotline Bling"
    | "Galaxy Brain"
    | "Gru's Plan"
    | "Is This a Pigeon"
    | "Panik Kalm Panik"
    | "Random"
    | "Side Eyeing Chloe"
    | "Tuxedo Winnie The Pooh"
    | "Two Buttons"
    | "Waiting Skeleton";
  /**
   * The topic of the meme.
   */
  topic: string;
};

/**
 * @internal
 * V1AiMemeGeneratorCreateBodyStyle without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiMemeGeneratorCreateBodyStyle = {
  searchWeb?: boolean | undefined;
  template:
    | "Bike Fall"
    | "Change My Mind"
    | "Disappointed Guy"
    | "Drake Hotline Bling"
    | "Galaxy Brain"
    | "Gru's Plan"
    | "Is This a Pigeon"
    | "Panik Kalm Panik"
    | "Random"
    | "Side Eyeing Chloe"
    | "Tuxedo Winnie The Pooh"
    | "Two Buttons"
    | "Waiting Skeleton";
  topic: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiMemeGeneratorCreateBodyStyle
 */
const SchemaIn$V1AiMemeGeneratorCreateBodyStyle: z.ZodType<
  V1AiMemeGeneratorCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    searchWeb: z.boolean().optional(),
    template: z.enum([
      "Bike Fall",
      "Change My Mind",
      "Disappointed Guy",
      "Drake Hotline Bling",
      "Galaxy Brain",
      "Gru's Plan",
      "Is This a Pigeon",
      "Panik Kalm Panik",
      "Random",
      "Side Eyeing Chloe",
      "Tuxedo Winnie The Pooh",
      "Two Buttons",
      "Waiting Skeleton",
    ]),
    topic: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      searchWeb: "searchWeb",
      template: "template",
      topic: "topic",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiMemeGeneratorCreateBodyStyle
 */
const SchemaOut$V1AiMemeGeneratorCreateBodyStyle: z.ZodType<
  External$V1AiMemeGeneratorCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  V1AiMemeGeneratorCreateBodyStyle // the object to be transformed
> = z
  .object({
    searchWeb: z.boolean().optional(),
    template: z.enum([
      "Bike Fall",
      "Change My Mind",
      "Disappointed Guy",
      "Drake Hotline Bling",
      "Galaxy Brain",
      "Gru's Plan",
      "Is This a Pigeon",
      "Panik Kalm Panik",
      "Random",
      "Side Eyeing Chloe",
      "Tuxedo Winnie The Pooh",
      "Two Buttons",
      "Waiting Skeleton",
    ]),
    topic: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      searchWeb: "searchWeb",
      template: "template",
      topic: "topic",
    });
  });

export const Schemas$V1AiMemeGeneratorCreateBodyStyle = {
  in: SchemaIn$V1AiMemeGeneratorCreateBodyStyle,
  out: SchemaOut$V1AiMemeGeneratorCreateBodyStyle,
};
