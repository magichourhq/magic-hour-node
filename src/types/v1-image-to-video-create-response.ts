import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Success
 */
export type V1ImageToVideoCreateResponse = {
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
   * Unique ID of the video. This value can be used in the [get video project API](https://docs.magichour.ai/api-reference/video-projects/get-video-details) to fetch additional details such as status
   */
  id: string;
};

/**
 * @internal
 * V1ImageToVideoCreateResponse without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1ImageToVideoCreateResponse = {
  credits_charged: number;
  estimated_frame_cost: number;
  id: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1ImageToVideoCreateResponse
 */
const SchemaIn$V1ImageToVideoCreateResponse: z.ZodType<
  V1ImageToVideoCreateResponse, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1ImageToVideoCreateResponse
 */
const SchemaOut$V1ImageToVideoCreateResponse: z.ZodType<
  External$V1ImageToVideoCreateResponse, // output type of this zod object
  z.ZodTypeDef,
  V1ImageToVideoCreateResponse // the object to be transformed
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

export const Schemas$V1ImageToVideoCreateResponse = {
  in: SchemaIn$V1ImageToVideoCreateResponse,
  out: SchemaOut$V1ImageToVideoCreateResponse,
};
