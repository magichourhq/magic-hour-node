import {
  External$V1VideoProjectsgetResponseDownload,
  Schemas$V1VideoProjectsgetResponseDownload,
  V1VideoProjectsgetResponseDownload,
} from "./v1-video-projectsget-response-download";
import {
  External$V1VideoProjectsgetResponseDownloadsItem,
  Schemas$V1VideoProjectsgetResponseDownloadsItem,
  V1VideoProjectsgetResponseDownloadsItem,
} from "./v1-video-projectsget-response-downloads-item";
import {
  External$V1VideoProjectsgetResponseError,
  Schemas$V1VideoProjectsgetResponseError,
  V1VideoProjectsgetResponseError,
} from "./v1-video-projectsget-response-error";
import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Success
 */
export type V1VideoProjectsgetResponse = {
  createdAt: string;
  /**
   * Deprecated: Please use `.downloads` instead. The download url and expiration date of the video project
   */
  download: V1VideoProjectsgetResponseDownload | null;
  downloads: V1VideoProjectsgetResponseDownloadsItem[];
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
  error: V1VideoProjectsgetResponseError | null;
  /**
   * Frame rate of the video. If the status is not 'complete', the frame rate is an estimate and will be adjusted when the video completes.
   */
  fps: number;
  /**
   * The height of the final output video. The maximum height depends on your subscription. Please refer to our [pricing page](https://magichour.ai/pricing) for more details
   */
  height: number;
  /**
   * Unique ID of the video. This value can be used in the [get video project API](/api/tag/video-projects/get/v1/video-projects/{id}) to fetch additional details such as status
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
  type:
    | "ANIMATION"
    | "AUTO_SUBTITLE"
    | "FACE_SWAP"
    | "IMAGE_TO_VIDEO"
    | "LIP_SYNC"
    | "TEXT_TO_VIDEO"
    | "VIDEO_TO_VIDEO";
  /**
   * The width of the final output video. The maximum width depends on your subscription. Please refer to our [pricing page](https://magichour.ai/pricing) for more details
   */
  width: number;
};

/**
 * @internal
 * V1VideoProjectsgetResponse without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1VideoProjectsgetResponse = {
  created_at: string;
  download: External$V1VideoProjectsgetResponseDownload | null;
  downloads: External$V1VideoProjectsgetResponseDownloadsItem[];
  enabled: boolean;
  end_seconds: number;
  error: External$V1VideoProjectsgetResponseError | null;
  fps: number;
  height: number;
  id: string;
  name: string | null;
  start_seconds: number;
  status: "canceled" | "complete" | "draft" | "error" | "queued" | "rendering";
  total_frame_cost: number;
  type:
    | "ANIMATION"
    | "AUTO_SUBTITLE"
    | "FACE_SWAP"
    | "IMAGE_TO_VIDEO"
    | "LIP_SYNC"
    | "TEXT_TO_VIDEO"
    | "VIDEO_TO_VIDEO";
  width: number;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1VideoProjectsgetResponse
 */
const SchemaIn$V1VideoProjectsgetResponse: z.ZodType<
  V1VideoProjectsgetResponse, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    created_at: z.string(),
    download: Schemas$V1VideoProjectsgetResponseDownload.in.nullable(),
    downloads: z.array(Schemas$V1VideoProjectsgetResponseDownloadsItem.in),
    enabled: z.boolean(),
    end_seconds: z.number(),
    error: Schemas$V1VideoProjectsgetResponseError.in.nullable(),
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
    type: z.enum([
      "ANIMATION",
      "AUTO_SUBTITLE",
      "FACE_SWAP",
      "IMAGE_TO_VIDEO",
      "LIP_SYNC",
      "TEXT_TO_VIDEO",
      "VIDEO_TO_VIDEO",
    ]),
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1VideoProjectsgetResponse
 */
const SchemaOut$V1VideoProjectsgetResponse: z.ZodType<
  External$V1VideoProjectsgetResponse, // output type of this zod object
  z.ZodTypeDef,
  V1VideoProjectsgetResponse // the object to be transformed
> = z
  .object({
    createdAt: z.string(),
    download: Schemas$V1VideoProjectsgetResponseDownload.out.nullable(),
    downloads: z.array(Schemas$V1VideoProjectsgetResponseDownloadsItem.out),
    enabled: z.boolean(),
    endSeconds: z.number(),
    error: Schemas$V1VideoProjectsgetResponseError.out.nullable(),
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
    type: z.enum([
      "ANIMATION",
      "AUTO_SUBTITLE",
      "FACE_SWAP",
      "IMAGE_TO_VIDEO",
      "LIP_SYNC",
      "TEXT_TO_VIDEO",
      "VIDEO_TO_VIDEO",
    ]),
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

export const Schemas$V1VideoProjectsgetResponse = {
  in: SchemaIn$V1VideoProjectsgetResponse,
  out: SchemaOut$V1VideoProjectsgetResponse,
};
