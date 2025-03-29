import {
  External$V1ImageProjectsGetResponseDownloadsItem,
  Schemas$V1ImageProjectsGetResponseDownloadsItem,
  V1ImageProjectsGetResponseDownloadsItem,
} from "./v1-image-projects-get-response-downloads-item";
import {
  External$V1ImageProjectsGetResponseError,
  Schemas$V1ImageProjectsGetResponseError,
  V1ImageProjectsGetResponseError,
} from "./v1-image-projects-get-response-error";
import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Success
 */
export type V1ImageProjectsGetResponse = {
  createdAt: string;
  downloads: V1ImageProjectsGetResponseDownloadsItem[];
  /**
   * Indicates whether the resource is deleted
   */
  enabled: boolean;
  /**
   * In the case of an error, this object will contain the error encountered during video render
   */
  error: V1ImageProjectsGetResponseError | null;
  /**
   * Unique ID of the image. This value can be used in the [get image project API](https://docs.magichour.ai/api-reference/image-projects/get-image-details) to fetch additional details such as status
   */
  id: string;
  /**
   * Number of images generated
   */
  imageCount: number;
  /**
   * The name of the image.
   */
  name: string | null;
  /**
   * The status of the image.
   */
  status: "canceled" | "complete" | "draft" | "error" | "queued" | "rendering";
  /**
   * The amount of frames used to generate the image.
   */
  totalFrameCost: number;
  type:
    | "AI_HEADSHOT"
    | "AI_IMAGE"
    | "BACKGROUND_REMOVER"
    | "CLOTHES_CHANGER"
    | "FACE_SWAP"
    | "IMAGE_UPSCALER"
    | "PHOTO_EDITOR"
    | "QR_CODE";
};

/**
 * @internal
 * V1ImageProjectsGetResponse without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1ImageProjectsGetResponse = {
  created_at: string;
  downloads: External$V1ImageProjectsGetResponseDownloadsItem[];
  enabled: boolean;
  error: External$V1ImageProjectsGetResponseError | null;
  id: string;
  image_count: number;
  name: string | null;
  status: "canceled" | "complete" | "draft" | "error" | "queued" | "rendering";
  total_frame_cost: number;
  type:
    | "AI_HEADSHOT"
    | "AI_IMAGE"
    | "BACKGROUND_REMOVER"
    | "CLOTHES_CHANGER"
    | "FACE_SWAP"
    | "IMAGE_UPSCALER"
    | "PHOTO_EDITOR"
    | "QR_CODE";
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1ImageProjectsGetResponse
 */
const SchemaIn$V1ImageProjectsGetResponse: z.ZodType<
  V1ImageProjectsGetResponse, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    created_at: z.string(),
    downloads: z.array(Schemas$V1ImageProjectsGetResponseDownloadsItem.in),
    enabled: z.boolean(),
    error: Schemas$V1ImageProjectsGetResponseError.in.nullable(),
    id: z.string(),
    image_count: z.number().int(),
    name: z.string().nullable(),
    status: z.enum([
      "canceled",
      "complete",
      "draft",
      "error",
      "queued",
      "rendering",
    ]),
    total_frame_cost: z.number().int(),
    type: z.enum([
      "AI_HEADSHOT",
      "AI_IMAGE",
      "BACKGROUND_REMOVER",
      "CLOTHES_CHANGER",
      "FACE_SWAP",
      "IMAGE_UPSCALER",
      "PHOTO_EDITOR",
      "QR_CODE",
    ]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      created_at: "createdAt",
      downloads: "downloads",
      enabled: "enabled",
      error: "error",
      id: "id",
      image_count: "imageCount",
      name: "name",
      status: "status",
      total_frame_cost: "totalFrameCost",
      type: "type",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1ImageProjectsGetResponse
 */
const SchemaOut$V1ImageProjectsGetResponse: z.ZodType<
  External$V1ImageProjectsGetResponse, // output type of this zod object
  z.ZodTypeDef,
  V1ImageProjectsGetResponse // the object to be transformed
> = z
  .object({
    createdAt: z.string(),
    downloads: z.array(Schemas$V1ImageProjectsGetResponseDownloadsItem.out),
    enabled: z.boolean(),
    error: Schemas$V1ImageProjectsGetResponseError.out.nullable(),
    id: z.string(),
    imageCount: z.number().int(),
    name: z.string().nullable(),
    status: z.enum([
      "canceled",
      "complete",
      "draft",
      "error",
      "queued",
      "rendering",
    ]),
    totalFrameCost: z.number().int(),
    type: z.enum([
      "AI_HEADSHOT",
      "AI_IMAGE",
      "BACKGROUND_REMOVER",
      "CLOTHES_CHANGER",
      "FACE_SWAP",
      "IMAGE_UPSCALER",
      "PHOTO_EDITOR",
      "QR_CODE",
    ]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      createdAt: "created_at",
      downloads: "downloads",
      enabled: "enabled",
      error: "error",
      id: "id",
      imageCount: "image_count",
      name: "name",
      status: "status",
      totalFrameCost: "total_frame_cost",
      type: "type",
    });
  });

export const Schemas$V1ImageProjectsGetResponse = {
  in: SchemaIn$V1ImageProjectsGetResponse,
  out: SchemaOut$V1ImageProjectsGetResponse,
};
