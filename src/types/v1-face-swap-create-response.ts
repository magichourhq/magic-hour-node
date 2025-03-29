import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Success
 */
export type V1FaceSwapCreateResponse = {
  /**
   * Estimated cost of the video in terms of number of frames needed to render the video. Frames will be adjusted when the video completes
   */
  estimatedFrameCost: number;
  /**
   * Unique ID of the image. This value can be used in the [get image project API](https://docs.magichour.ai/api-reference/image-projects/get-image-details) to fetch additional details such as status
   */
  id: string;
};

/**
 * @internal
 * V1FaceSwapCreateResponse without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1FaceSwapCreateResponse = {
  estimated_frame_cost: number;
  id: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1FaceSwapCreateResponse
 */
const SchemaIn$V1FaceSwapCreateResponse: z.ZodType<
  V1FaceSwapCreateResponse, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1FaceSwapCreateResponse
 */
const SchemaOut$V1FaceSwapCreateResponse: z.ZodType<
  External$V1FaceSwapCreateResponse, // output type of this zod object
  z.ZodTypeDef,
  V1FaceSwapCreateResponse // the object to be transformed
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

export const Schemas$V1FaceSwapCreateResponse = {
  in: SchemaIn$V1FaceSwapCreateResponse,
  out: SchemaOut$V1FaceSwapCreateResponse,
};
