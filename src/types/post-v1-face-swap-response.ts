import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Success
 */
export type PostV1FaceSwapResponse = {
  /**
   * Estimated cost of the video in terms of number of frames needed to render the video. Frames will be adjusted when the video completes
   */
  estimatedFrameCost: number;
  /**
   * Unique ID of the image. This value can be used in the [get image project API](/api/tag/image-projects/get/v1/image-projects/{id}) to fetch additional details such as status
   */
  id: string;
};

/**
 * @internal
 * PostV1FaceSwapResponse without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1FaceSwapResponse = {
  estimated_frame_cost: number;
  id: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1FaceSwapResponse
 */
const SchemaIn$PostV1FaceSwapResponse: z.ZodType<
  PostV1FaceSwapResponse, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1FaceSwapResponse
 */
const SchemaOut$PostV1FaceSwapResponse: z.ZodType<
  External$PostV1FaceSwapResponse, // output type of this zod object
  z.ZodTypeDef,
  PostV1FaceSwapResponse // the object to be transformed
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

export const Schemas$PostV1FaceSwapResponse = {
  in: SchemaIn$PostV1FaceSwapResponse,
  out: SchemaOut$PostV1FaceSwapResponse,
};
