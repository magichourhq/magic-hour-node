import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Success
 */
export type PostV1ImageBackgroundRemoverResponse = {
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
 * PostV1ImageBackgroundRemoverResponse without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1ImageBackgroundRemoverResponse = {
  frame_cost: number;
  id: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1ImageBackgroundRemoverResponse
 */
const SchemaIn$PostV1ImageBackgroundRemoverResponse: z.ZodType<
  PostV1ImageBackgroundRemoverResponse, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1ImageBackgroundRemoverResponse
 */
const SchemaOut$PostV1ImageBackgroundRemoverResponse: z.ZodType<
  External$PostV1ImageBackgroundRemoverResponse, // output type of this zod object
  z.ZodTypeDef,
  PostV1ImageBackgroundRemoverResponse // the object to be transformed
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

export const Schemas$PostV1ImageBackgroundRemoverResponse = {
  in: SchemaIn$PostV1ImageBackgroundRemoverResponse,
  out: SchemaOut$PostV1ImageBackgroundRemoverResponse,
};
