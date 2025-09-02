import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * Success
 */
export type V1AiClothesChangerCreateResponse = {
  /**
   * The amount of credits deducted from your account to generate the image. We charge credits right when the request is made.
   *
   * If an error occurred while generating the image(s), credits will be refunded and this field will be updated to include the refund.
   */
  creditsCharged: number;
  /**
   * Deprecated: Previously represented the number of frames (original name of our credit system) used for image generation. Use 'credits_charged' instead.
   */
  frameCost: number;
  /**
   * Unique ID of the image. This value can be used in the [get image project API](https://docs.magichour.ai/api-reference/image-projects/get-image-details) to fetch additional details such as status
   */
  id: string;
};

/**
 * @internal
 * V1AiClothesChangerCreateResponse without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiClothesChangerCreateResponse = {
  credits_charged: number;
  frame_cost: number;
  id: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiClothesChangerCreateResponse
 */
const SchemaIn$V1AiClothesChangerCreateResponse: z.ZodType<
  V1AiClothesChangerCreateResponse, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    credits_charged: z.number().int(),
    frame_cost: z.number().int(),
    id: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      credits_charged: "creditsCharged",
      frame_cost: "frameCost",
      id: "id",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiClothesChangerCreateResponse
 */
const SchemaOut$V1AiClothesChangerCreateResponse: z.ZodType<
  External$V1AiClothesChangerCreateResponse, // output type of this zod object
  z.ZodTypeDef,
  V1AiClothesChangerCreateResponse // the object to be transformed
> = z
  .object({
    creditsCharged: z.number().int(),
    frameCost: z.number().int(),
    id: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      creditsCharged: "credits_charged",
      frameCost: "frame_cost",
      id: "id",
    });
  });

export const Schemas$V1AiClothesChangerCreateResponse = {
  in: SchemaIn$V1AiClothesChangerCreateResponse,
  out: SchemaOut$V1AiClothesChangerCreateResponse,
};
