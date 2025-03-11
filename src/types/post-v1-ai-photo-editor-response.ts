import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Success
 */
export type PostV1AiPhotoEditorResponse = {
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
 * PostV1AiPhotoEditorResponse without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1AiPhotoEditorResponse = {
  frame_cost: number;
  id: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1AiPhotoEditorResponse
 */
const SchemaIn$PostV1AiPhotoEditorResponse: z.ZodType<
  PostV1AiPhotoEditorResponse, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1AiPhotoEditorResponse
 */
const SchemaOut$PostV1AiPhotoEditorResponse: z.ZodType<
  External$PostV1AiPhotoEditorResponse, // output type of this zod object
  z.ZodTypeDef,
  PostV1AiPhotoEditorResponse // the object to be transformed
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

export const Schemas$PostV1AiPhotoEditorResponse = {
  in: SchemaIn$PostV1AiPhotoEditorResponse,
  out: SchemaOut$PostV1AiPhotoEditorResponse,
};
