import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Success
 */
export type PostV1AiClothesChangerResponse = {
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
 * PostV1AiClothesChangerResponse without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1AiClothesChangerResponse = {
  frame_cost: number;
  id: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1AiClothesChangerResponse
 */
const SchemaIn$PostV1AiClothesChangerResponse: z.ZodType<
  PostV1AiClothesChangerResponse, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1AiClothesChangerResponse
 */
const SchemaOut$PostV1AiClothesChangerResponse: z.ZodType<
  External$PostV1AiClothesChangerResponse, // output type of this zod object
  z.ZodTypeDef,
  PostV1AiClothesChangerResponse // the object to be transformed
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

export const Schemas$PostV1AiClothesChangerResponse = {
  in: SchemaIn$PostV1AiClothesChangerResponse,
  out: SchemaOut$PostV1AiClothesChangerResponse,
};
