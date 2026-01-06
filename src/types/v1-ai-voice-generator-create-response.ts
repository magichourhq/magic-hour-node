import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * Success
 */
export type V1AiVoiceGeneratorCreateResponse = {
  /**
   * The amount of credits deducted from your account to generate the audio. We charge credits right when the request is made.
   *
   * If an error occurred while generating the audio, credits will be refunded and this field will be updated to include the refund.
   */
  creditsCharged: number;
  /**
   * Unique ID of the audio. Use it with the [Get audio Project API](https://docs.magichour.ai/api-reference/audio-projects/get-audio-details) to fetch status and downloads.
   */
  id: string;
};

/**
 * @internal
 * V1AiVoiceGeneratorCreateResponse without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiVoiceGeneratorCreateResponse = {
  credits_charged: number;
  id: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiVoiceGeneratorCreateResponse
 */
const SchemaIn$V1AiVoiceGeneratorCreateResponse: z.ZodType<
  V1AiVoiceGeneratorCreateResponse, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    credits_charged: z.number().int(),
    id: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      credits_charged: "creditsCharged",
      id: "id",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiVoiceGeneratorCreateResponse
 */
const SchemaOut$V1AiVoiceGeneratorCreateResponse: z.ZodType<
  External$V1AiVoiceGeneratorCreateResponse, // output type of this zod object
  z.ZodTypeDef,
  V1AiVoiceGeneratorCreateResponse // the object to be transformed
> = z
  .object({
    creditsCharged: z.number().int(),
    id: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      creditsCharged: "credits_charged",
      id: "id",
    });
  });

export const Schemas$V1AiVoiceGeneratorCreateResponse = {
  in: SchemaIn$V1AiVoiceGeneratorCreateResponse,
  out: SchemaOut$V1AiVoiceGeneratorCreateResponse,
};
