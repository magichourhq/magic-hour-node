import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Success
 */
export type PostV1AiImageGeneratorResponse = {
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
 * PostV1AiImageGeneratorResponse without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1AiImageGeneratorResponse = {
  frame_cost: number;
  id: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1AiImageGeneratorResponse
 */
const SchemaIn$PostV1AiImageGeneratorResponse: z.ZodType<
  PostV1AiImageGeneratorResponse, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1AiImageGeneratorResponse
 */
const SchemaOut$PostV1AiImageGeneratorResponse: z.ZodType<
  External$PostV1AiImageGeneratorResponse, // output type of this zod object
  z.ZodTypeDef,
  PostV1AiImageGeneratorResponse // the object to be transformed
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

export const Schemas$PostV1AiImageGeneratorResponse = {
  in: SchemaIn$PostV1AiImageGeneratorResponse,
  out: SchemaOut$PostV1AiImageGeneratorResponse,
};
