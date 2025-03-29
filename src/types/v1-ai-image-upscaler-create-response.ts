import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Success
 */
export type V1AiImageUpscalerCreateResponse = {
  /**
   * The frame cost of the image generation
   */
  frameCost: number;
  /**
   * Unique ID of the image. This value can be used in the [get image project API](https://docs.magichour.ai/api-reference/image-projects/get-image-details) to fetch additional details such as status
   */
  id: string;
};

/**
 * @internal
 * V1AiImageUpscalerCreateResponse without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiImageUpscalerCreateResponse = {
  frame_cost: number;
  id: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiImageUpscalerCreateResponse
 */
const SchemaIn$V1AiImageUpscalerCreateResponse: z.ZodType<
  V1AiImageUpscalerCreateResponse, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiImageUpscalerCreateResponse
 */
const SchemaOut$V1AiImageUpscalerCreateResponse: z.ZodType<
  External$V1AiImageUpscalerCreateResponse, // output type of this zod object
  z.ZodTypeDef,
  V1AiImageUpscalerCreateResponse // the object to be transformed
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

export const Schemas$V1AiImageUpscalerCreateResponse = {
  in: SchemaIn$V1AiImageUpscalerCreateResponse,
  out: SchemaOut$V1AiImageUpscalerCreateResponse,
};
