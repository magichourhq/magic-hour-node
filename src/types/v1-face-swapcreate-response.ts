import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Success
 */
export type V1FaceSwapcreateResponse = {
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
 * V1FaceSwapcreateResponse without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1FaceSwapcreateResponse = {
  estimated_frame_cost: number;
  id: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1FaceSwapcreateResponse
 */
const SchemaIn$V1FaceSwapcreateResponse: z.ZodType<
  V1FaceSwapcreateResponse, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1FaceSwapcreateResponse
 */
const SchemaOut$V1FaceSwapcreateResponse: z.ZodType<
  External$V1FaceSwapcreateResponse, // output type of this zod object
  z.ZodTypeDef,
  V1FaceSwapcreateResponse // the object to be transformed
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

export const Schemas$V1FaceSwapcreateResponse = {
  in: SchemaIn$V1FaceSwapcreateResponse,
  out: SchemaOut$V1FaceSwapcreateResponse,
};
