import {
  External$V1ImageProjectsgetResponseDownloadsItem,
  Schemas$V1ImageProjectsgetResponseDownloadsItem,
  V1ImageProjectsgetResponseDownloadsItem,
} from "./v1-image-projectsget-response-downloads-item";
import {
  External$V1ImageProjectsgetResponseError,
  Schemas$V1ImageProjectsgetResponseError,
  V1ImageProjectsgetResponseError,
} from "./v1-image-projectsget-response-error";
import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Success
 */
export type V1ImageProjectsgetResponse = {
  createdAt: string;
  downloads: V1ImageProjectsgetResponseDownloadsItem[];
  /**
   * Indicates whether the resource is deleted
   */
  enabled: boolean;
  /**
   * In the case of an error, this object will contain the error encountered during video render
   */
  error: V1ImageProjectsgetResponseError | null;
  /**
   * Unique ID of the image. This value can be used in the [get image project API](/api/tag/image-projects/get/v1/image-projects/{id}) to fetch additional details such as status
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
 * V1ImageProjectsgetResponse without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1ImageProjectsgetResponse = {
  created_at: string;
  downloads: External$V1ImageProjectsgetResponseDownloadsItem[];
  enabled: boolean;
  error: External$V1ImageProjectsgetResponseError | null;
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
 * Takes network data, validates it, and transforms keys to match typescript object V1ImageProjectsgetResponse
 */
const SchemaIn$V1ImageProjectsgetResponse: z.ZodType<
  V1ImageProjectsgetResponse, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    created_at: z.string(),
    downloads: z.array(Schemas$V1ImageProjectsgetResponseDownloadsItem.in),
    enabled: z.boolean(),
    error: Schemas$V1ImageProjectsgetResponseError.in.nullable(),
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1ImageProjectsgetResponse
 */
const SchemaOut$V1ImageProjectsgetResponse: z.ZodType<
  External$V1ImageProjectsgetResponse, // output type of this zod object
  z.ZodTypeDef,
  V1ImageProjectsgetResponse // the object to be transformed
> = z
  .object({
    createdAt: z.string(),
    downloads: z.array(Schemas$V1ImageProjectsgetResponseDownloadsItem.out),
    enabled: z.boolean(),
    error: Schemas$V1ImageProjectsgetResponseError.out.nullable(),
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

export const Schemas$V1ImageProjectsgetResponse = {
  in: SchemaIn$V1ImageProjectsgetResponse,
  out: SchemaOut$V1ImageProjectsgetResponse,
};
