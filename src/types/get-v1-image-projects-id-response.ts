import {
  External$GetV1ImageProjectsIdResponseDownloadsItem,
  GetV1ImageProjectsIdResponseDownloadsItem,
  Schemas$GetV1ImageProjectsIdResponseDownloadsItem,
} from "./get-v1-image-projects-id-response-downloads-item";
import {
  External$GetV1ImageProjectsIdResponseError,
  GetV1ImageProjectsIdResponseError,
  Schemas$GetV1ImageProjectsIdResponseError,
} from "./get-v1-image-projects-id-response-error";
import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Success
 */
export type GetV1ImageProjectsIdResponse = {
  createdAt: string;
  downloads: GetV1ImageProjectsIdResponseDownloadsItem[];
  /**
   * Indicates whether the resource is deleted
   */
  enabled: boolean;
  /**
   * In the case of an error, this object will contain the error encountered during video render
   */
  error: GetV1ImageProjectsIdResponseError | null;
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
 * GetV1ImageProjectsIdResponse without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$GetV1ImageProjectsIdResponse = {
  created_at: string;
  downloads: External$GetV1ImageProjectsIdResponseDownloadsItem[];
  enabled: boolean;
  error: External$GetV1ImageProjectsIdResponseError | null;
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
 * Takes network data, validates it, and transforms keys to match typescript object GetV1ImageProjectsIdResponse
 */
const SchemaIn$GetV1ImageProjectsIdResponse: z.ZodType<
  GetV1ImageProjectsIdResponse, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    created_at: z.string(),
    downloads: z.array(Schemas$GetV1ImageProjectsIdResponseDownloadsItem.in),
    enabled: z.boolean(),
    error: Schemas$GetV1ImageProjectsIdResponseError.in.nullable(),
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$GetV1ImageProjectsIdResponse
 */
const SchemaOut$GetV1ImageProjectsIdResponse: z.ZodType<
  External$GetV1ImageProjectsIdResponse, // output type of this zod object
  z.ZodTypeDef,
  GetV1ImageProjectsIdResponse // the object to be transformed
> = z
  .object({
    createdAt: z.string(),
    downloads: z.array(Schemas$GetV1ImageProjectsIdResponseDownloadsItem.out),
    enabled: z.boolean(),
    error: Schemas$GetV1ImageProjectsIdResponseError.out.nullable(),
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

export const Schemas$GetV1ImageProjectsIdResponse = {
  in: SchemaIn$GetV1ImageProjectsIdResponse,
  out: SchemaOut$GetV1ImageProjectsIdResponse,
};
