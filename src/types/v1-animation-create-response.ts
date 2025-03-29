import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Success
 */
export type V1AnimationCreateResponse = {
  /**
   * Estimated cost of the video in terms of number of frames needed to render the video. Frames will be adjusted when the video completes
   */
  estimatedFrameCost: number;
  /**
   * Unique ID of the video. This value can be used in the [get video project API](https://docs.magichour.ai/api-reference/video-projects/get-video-details) to fetch additional details such as status
   */
  id: string;
};

/**
 * @internal
 * V1AnimationCreateResponse without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AnimationCreateResponse = {
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
    estimated_frame_cost: z.number().int(),
    id: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
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
    estimatedFrameCost: z.number().int(),
    id: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      estimatedFrameCost: "estimated_frame_cost",
      id: "id",
    });
  });

export const Schemas$V1AnimationCreateResponse = {
  in: SchemaIn$V1AnimationCreateResponse,
  out: SchemaOut$V1AnimationCreateResponse,
};
