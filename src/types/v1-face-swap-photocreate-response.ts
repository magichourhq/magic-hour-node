import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Success
 */
export type V1FaceSwapPhotocreateResponse = {
  /**
   * The frame cost of the image generation
   */
  frameCost: number;
  /**
   * Unique ID of the image. This value can be used in the [get image project API](/api/tag/image-projects/get/v1/image-projects/{id}) to fetch additional details such as status
   */
  id: string;
};

/**
 * @internal
 * V1FaceSwapPhotocreateResponse without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1FaceSwapPhotocreateResponse = {
  frame_cost: number;
  id: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1FaceSwapPhotocreateResponse
 */
const SchemaIn$V1FaceSwapPhotocreateResponse: z.ZodType<
  V1FaceSwapPhotocreateResponse, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    frame_cost: z.number().int(),
    id: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      frame_cost: "frameCost",
      id: "id",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1FaceSwapPhotocreateResponse
 */
const SchemaOut$V1FaceSwapPhotocreateResponse: z.ZodType<
  External$V1FaceSwapPhotocreateResponse, // output type of this zod object
  z.ZodTypeDef,
  V1FaceSwapPhotocreateResponse // the object to be transformed
> = z
  .object({
    frameCost: z.number().int(),
    id: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      frameCost: "frame_cost",
      id: "id",
    });
  });

export const Schemas$V1FaceSwapPhotocreateResponse = {
  in: SchemaIn$V1FaceSwapPhotocreateResponse,
  out: SchemaOut$V1FaceSwapPhotocreateResponse,
};
