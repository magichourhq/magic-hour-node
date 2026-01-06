import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1AiVoiceGeneratorCreateBodyStyle,
  Schemas$V1AiVoiceGeneratorCreateBodyStyle,
  V1AiVoiceGeneratorCreateBodyStyle,
} from "./v1-ai-voice-generator-create-body-style";

/**
 * V1AiVoiceGeneratorCreateBody
 */
export type V1AiVoiceGeneratorCreateBody = {
  /**
   * Give your audio a custom name for easy identification.
   */
  name?: string | undefined;
  /**
   * The content used to generate speech.
   */
  style: V1AiVoiceGeneratorCreateBodyStyle;
};

/**
 * @internal
 * V1AiVoiceGeneratorCreateBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiVoiceGeneratorCreateBody = {
  name?: string | undefined;
  style: External$V1AiVoiceGeneratorCreateBodyStyle;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiVoiceGeneratorCreateBody
 */
const SchemaIn$V1AiVoiceGeneratorCreateBody: z.ZodType<
  V1AiVoiceGeneratorCreateBody, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    name: z.string().optional(),
    style: Schemas$V1AiVoiceGeneratorCreateBodyStyle.in,
  })
  .transform((obj) => {
    return zodTransform(obj, {
      name: "name",
      style: "style",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiVoiceGeneratorCreateBody
 */
const SchemaOut$V1AiVoiceGeneratorCreateBody: z.ZodType<
  External$V1AiVoiceGeneratorCreateBody, // output type of this zod object
  z.ZodTypeDef,
  V1AiVoiceGeneratorCreateBody // the object to be transformed
> = z
  .object({
    name: z.string().optional(),
    style: Schemas$V1AiVoiceGeneratorCreateBodyStyle.out,
  })
  .transform((obj) => {
    return zodTransform(obj, {
      name: "name",
      style: "style",
    });
  });

export const Schemas$V1AiVoiceGeneratorCreateBody = {
  in: SchemaIn$V1AiVoiceGeneratorCreateBody,
  out: SchemaOut$V1AiVoiceGeneratorCreateBody,
};
