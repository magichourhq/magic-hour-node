import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * Success
 */
export type V1EstimateAudioListResponse = {
  /**
   * Credits a create request with these fields charges.
   */
  estimatedCredits: number;
};

/**
 * @internal
 * V1EstimateAudioListResponse without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1EstimateAudioListResponse = {
  estimated_credits: number;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1EstimateAudioListResponse
 */
const SchemaIn$V1EstimateAudioListResponse: z.ZodType<
  V1EstimateAudioListResponse, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    estimated_credits: z.number().int(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      estimated_credits: "estimatedCredits",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1EstimateAudioListResponse
 */
const SchemaOut$V1EstimateAudioListResponse: z.ZodType<
  External$V1EstimateAudioListResponse, // output type of this zod object
  z.ZodTypeDef,
  V1EstimateAudioListResponse // the object to be transformed
> = z
  .object({
    estimatedCredits: z.number().int(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      estimatedCredits: "estimated_credits",
    });
  });

export const Schemas$V1EstimateAudioListResponse = {
  in: SchemaIn$V1EstimateAudioListResponse,
  out: SchemaOut$V1EstimateAudioListResponse,
};
