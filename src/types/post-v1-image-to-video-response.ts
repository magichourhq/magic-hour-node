import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Success
 */
export type PostV1ImageToVideoResponse = {
  /**
   * Estimated cost of the video in terms of number of frames needed to render the video. Frames will be adjusted when the video completes
   */
  estimatedFrameCost: number;
  /**
   * Unique ID of the video. This value can be used in the [get video project API](/api/tag/video-projects/get/v1/video-projects/{id}) to fetch additional details such as status
   */
  id: string;
};

/**
 * @internal
 * PostV1ImageToVideoResponse without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1ImageToVideoResponse = {
  estimated_frame_cost: number;
  id: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1ImageToVideoResponse
 */
const SchemaIn$PostV1ImageToVideoResponse: z.ZodType<
  PostV1ImageToVideoResponse, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1ImageToVideoResponse
 */
const SchemaOut$PostV1ImageToVideoResponse: z.ZodType<
  External$PostV1ImageToVideoResponse, // output type of this zod object
  z.ZodTypeDef,
  PostV1ImageToVideoResponse // the object to be transformed
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

export const Schemas$PostV1ImageToVideoResponse = {
  in: SchemaIn$PostV1ImageToVideoResponse,
  out: SchemaOut$PostV1ImageToVideoResponse,
};
