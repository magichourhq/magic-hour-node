import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Success
 */
export type V1AiPhotoEditorCreateResponse = {
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
 * V1AiPhotoEditorCreateResponse without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiPhotoEditorCreateResponse = {
  frame_cost: number;
  id: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiPhotoEditorCreateResponse
 */
const SchemaIn$V1AiPhotoEditorCreateResponse: z.ZodType<
  V1AiPhotoEditorCreateResponse, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiPhotoEditorCreateResponse
 */
const SchemaOut$V1AiPhotoEditorCreateResponse: z.ZodType<
  External$V1AiPhotoEditorCreateResponse, // output type of this zod object
  z.ZodTypeDef,
  V1AiPhotoEditorCreateResponse // the object to be transformed
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

export const Schemas$V1AiPhotoEditorCreateResponse = {
  in: SchemaIn$V1AiPhotoEditorCreateResponse,
  out: SchemaOut$V1AiPhotoEditorCreateResponse,
};
