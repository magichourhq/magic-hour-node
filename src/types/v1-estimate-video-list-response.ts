import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * Success
 */
export type V1EstimateVideoListResponse = {
  /**
   * Credits a create request with these fields charges.
   */
  estimatedCredits: number;
};

/**
 * @internal
 * V1EstimateVideoListResponse without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1EstimateVideoListResponse = {
  estimated_credits: number;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1EstimateVideoListResponse
 */
const SchemaIn$V1EstimateVideoListResponse: z.ZodType<
  V1EstimateVideoListResponse, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1EstimateVideoListResponse
 */
const SchemaOut$V1EstimateVideoListResponse: z.ZodType<
  External$V1EstimateVideoListResponse, // output type of this zod object
  z.ZodTypeDef,
  V1EstimateVideoListResponse // the object to be transformed
> = z
  .object({
    estimatedCredits: z.number().int(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      estimatedCredits: "estimated_credits",
    });
  });

export const Schemas$V1EstimateVideoListResponse = {
  in: SchemaIn$V1EstimateVideoListResponse,
  out: SchemaOut$V1EstimateVideoListResponse,
};
