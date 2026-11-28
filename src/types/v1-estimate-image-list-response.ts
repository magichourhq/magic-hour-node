import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * Success
 */
export type V1EstimateImageListResponse = {
  /**
   * Credits a create request with these fields charges.
   */
  estimatedCredits: number;
};

/**
 * @internal
 * V1EstimateImageListResponse without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1EstimateImageListResponse = {
  estimated_credits: number;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1EstimateImageListResponse
 */
const SchemaIn$V1EstimateImageListResponse: z.ZodType<
  V1EstimateImageListResponse, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1EstimateImageListResponse
 */
const SchemaOut$V1EstimateImageListResponse: z.ZodType<
  External$V1EstimateImageListResponse, // output type of this zod object
  z.ZodTypeDef,
  V1EstimateImageListResponse // the object to be transformed
> = z
  .object({
    estimatedCredits: z.number().int(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      estimatedCredits: "estimated_credits",
    });
  });

export const Schemas$V1EstimateImageListResponse = {
  in: SchemaIn$V1EstimateImageListResponse,
  out: SchemaOut$V1EstimateImageListResponse,
};
