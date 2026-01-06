import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * Success
 */
export type V1AnimationCreateResponse = {
  /**
   * The amount of credits deducted from your account to generate the video. If the status is not 'complete', this value is an estimate and may be adjusted upon completion based on the actual FPS of the output video.
   *
   * If video generation fails, credits will be refunded, and this field will be updated to include the refund.
   */
  creditsCharged: number;
  /**
   * Deprecated: Previously represented the number of frames (original name of our credit system) used for video generation. Use 'credits_charged' instead.
   *
   * The amount of frames used to generate the video. If the status is not 'complete', the cost is an estimate and will be adjusted when the video completes.
   */
  estimatedFrameCost: number;
  /**
   * Unique ID of the video. Use it with the [Get video Project API](https://docs.magichour.ai/api-reference/video-projects/get-video-details) to fetch status and downloads.
   */
  id: string;
};

/**
 * @internal
 * V1AnimationCreateResponse without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AnimationCreateResponse = {
  credits_charged: number;
  estimated_frame_cost: number;
  id: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AnimationCreateResponse
 */
const SchemaIn$V1AnimationCreateResponse: z.ZodType<
  V1AnimationCreateResponse, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    credits_charged: z.number().int(),
    estimated_frame_cost: z.number().int(),
    id: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      credits_charged: "creditsCharged",
      estimated_frame_cost: "estimatedFrameCost",
      id: "id",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AnimationCreateResponse
 */
const SchemaOut$V1AnimationCreateResponse: z.ZodType<
  External$V1AnimationCreateResponse, // output type of this zod object
  z.ZodTypeDef,
  V1AnimationCreateResponse // the object to be transformed
> = z
  .object({
    creditsCharged: z.number().int(),
    estimatedFrameCost: z.number().int(),
    id: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      creditsCharged: "credits_charged",
      estimatedFrameCost: "estimated_frame_cost",
      id: "id",
    });
  });

export const Schemas$V1AnimationCreateResponse = {
  in: SchemaIn$V1AnimationCreateResponse,
  out: SchemaOut$V1AnimationCreateResponse,
};
