import {
  External$V1VideoProjectsGetResponseDownload,
  Schemas$V1VideoProjectsGetResponseDownload,
  V1VideoProjectsGetResponseDownload,
} from "./v1-video-projects-get-response-download";
import {
  External$V1VideoProjectsGetResponseDownloadsItem,
  Schemas$V1VideoProjectsGetResponseDownloadsItem,
  V1VideoProjectsGetResponseDownloadsItem,
} from "./v1-video-projects-get-response-downloads-item";
import {
  External$V1VideoProjectsGetResponseError,
  Schemas$V1VideoProjectsGetResponseError,
  V1VideoProjectsGetResponseError,
} from "./v1-video-projects-get-response-error";
import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Success
 */
export type V1VideoProjectsGetResponse = {
  createdAt: string;
  /**
   * Deprecated: Please use `.downloads` instead. The download url and expiration date of the video project
   */
  download: V1VideoProjectsGetResponseDownload | null;
  downloads: V1VideoProjectsGetResponseDownloadsItem[];
  /**
   * Indicates whether the resource is deleted
   */
  enabled: boolean;
  /**
   * The end time of the input video in seconds
   */
  endSeconds: number;
  /**
   * In the case of an error, this object will contain the error encountered during video render
   */
  error: V1VideoProjectsGetResponseError | null;
  /**
   * Frame rate of the video. If the status is not 'complete', the frame rate is an estimate and will be adjusted when the video completes.
   */
  fps: number;
  /**
   * The height of the final output video. A value of -1 indicates the height can be ignored.
   */
  height: number;
  /**
   * Unique ID of the video. This value can be used in the [get video project API](https://docs.magichour.ai/api-reference/video-projects/get-video-details) to fetch additional details such as status
   */
  id: string;
  /**
   * The name of the video.
   */
  name: string | null;
  /**
   * The start time of the input video in seconds
   */
  startSeconds: number;
  /**
   * The status of the video.
   */
  status: "canceled" | "complete" | "draft" | "error" | "queued" | "rendering";
  /**
   * The amount of frames used to generate the video. If the status is not 'complete', the cost is an estimate and will be adjusted when the video completes.
   */
  totalFrameCost: number;
  /**
   * The type of the video project. Possible values are ANIMATION, IMAGE_TO_VIDEO, VIDEO_TO_VIDEO, TEXT_TO_VIDEO, FACE_SWAP, LIP_SYNC, AUTO_SUBTITLE, TALKING_PHOTO
   */
  type: string;
  /**
   * The width of the final output video. A value of -1 indicates the width can be ignored.
   */
  width: number;
};

/**
 * @internal
 * V1VideoProjectsGetResponse without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1VideoProjectsGetResponse = {
  created_at: string;
  download: External$V1VideoProjectsGetResponseDownload | null;
  downloads: External$V1VideoProjectsGetResponseDownloadsItem[];
  enabled: boolean;
  end_seconds: number;
  error: External$V1VideoProjectsGetResponseError | null;
  fps: number;
  height: number;
  id: string;
  name: string | null;
  start_seconds: number;
  status: "canceled" | "complete" | "draft" | "error" | "queued" | "rendering";
  total_frame_cost: number;
  type: string;
  width: number;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1VideoProjectsGetResponse
 */
const SchemaIn$V1VideoProjectsGetResponse: z.ZodType<
  V1VideoProjectsGetResponse, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    created_at: z.string(),
    download: Schemas$V1VideoProjectsGetResponseDownload.in.nullable(),
    downloads: z.array(Schemas$V1VideoProjectsGetResponseDownloadsItem.in),
    enabled: z.boolean(),
    end_seconds: z.number(),
    error: Schemas$V1VideoProjectsGetResponseError.in.nullable(),
    fps: z.number(),
    height: z.number().int(),
    id: z.string(),
    name: z.string().nullable(),
    start_seconds: z.number(),
    status: z.enum([
      "canceled",
      "complete",
      "draft",
      "error",
      "queued",
      "rendering",
    ]),
    total_frame_cost: z.number().int(),
    type: z.string(),
    width: z.number().int(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      created_at: "createdAt",
      download: "download",
      downloads: "downloads",
      enabled: "enabled",
      end_seconds: "endSeconds",
      error: "error",
      fps: "fps",
      height: "height",
      id: "id",
      name: "name",
      start_seconds: "startSeconds",
      status: "status",
      total_frame_cost: "totalFrameCost",
      type: "type",
      width: "width",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1VideoProjectsGetResponse
 */
const SchemaOut$V1VideoProjectsGetResponse: z.ZodType<
  External$V1VideoProjectsGetResponse, // output type of this zod object
  z.ZodTypeDef,
  V1VideoProjectsGetResponse // the object to be transformed
> = z
  .object({
    createdAt: z.string(),
    download: Schemas$V1VideoProjectsGetResponseDownload.out.nullable(),
    downloads: z.array(Schemas$V1VideoProjectsGetResponseDownloadsItem.out),
    enabled: z.boolean(),
    endSeconds: z.number(),
    error: Schemas$V1VideoProjectsGetResponseError.out.nullable(),
    fps: z.number(),
    height: z.number().int(),
    id: z.string(),
    name: z.string().nullable(),
    startSeconds: z.number(),
    status: z.enum([
      "canceled",
      "complete",
      "draft",
      "error",
      "queued",
      "rendering",
    ]),
    totalFrameCost: z.number().int(),
    type: z.string(),
    width: z.number().int(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      createdAt: "created_at",
      download: "download",
      downloads: "downloads",
      enabled: "enabled",
      endSeconds: "end_seconds",
      error: "error",
      fps: "fps",
      height: "height",
      id: "id",
      name: "name",
      startSeconds: "start_seconds",
      status: "status",
      totalFrameCost: "total_frame_cost",
      type: "type",
      width: "width",
    });
  });

export const Schemas$V1VideoProjectsGetResponse = {
  in: SchemaIn$V1VideoProjectsGetResponse,
  out: SchemaOut$V1VideoProjectsGetResponse,
};
