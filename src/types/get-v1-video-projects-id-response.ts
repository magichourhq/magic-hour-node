import {
  External$GetV1VideoProjectsIdResponseDownload,
  GetV1VideoProjectsIdResponseDownload,
  Schemas$GetV1VideoProjectsIdResponseDownload,
} from "./get-v1-video-projects-id-response-download";
import {
  External$GetV1VideoProjectsIdResponseDownloadsItem,
  GetV1VideoProjectsIdResponseDownloadsItem,
  Schemas$GetV1VideoProjectsIdResponseDownloadsItem,
} from "./get-v1-video-projects-id-response-downloads-item";
import {
  External$GetV1VideoProjectsIdResponseError,
  GetV1VideoProjectsIdResponseError,
  Schemas$GetV1VideoProjectsIdResponseError,
} from "./get-v1-video-projects-id-response-error";
import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Success
 */
export type GetV1VideoProjectsIdResponse = {
  createdAt: string;
  /**
   * Deprecated: Please use `.downloads` instead. The download url and expiration date of the video project
   */
  download: GetV1VideoProjectsIdResponseDownload | null;
  downloads: GetV1VideoProjectsIdResponseDownloadsItem[];
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
  error: GetV1VideoProjectsIdResponseError | null;
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
 * GetV1VideoProjectsIdResponse without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$GetV1VideoProjectsIdResponse = {
  created_at: string;
  download: External$GetV1VideoProjectsIdResponseDownload | null;
  downloads: External$GetV1VideoProjectsIdResponseDownloadsItem[];
  enabled: boolean;
  end_seconds: number;
  error: External$GetV1VideoProjectsIdResponseError | null;
  fps: number;
  height: number;
  id: string;
  name: string | null;
  start_seconds: number;
  status: "canceled" | "complete" | "draft" | "error" | "queued" | "rendering";
  total_frame_cost: number;
  type:
    | "ANIMATION"
    | "FACE_SWAP"
    | "IMAGE_TO_VIDEO"
    | "LIP_SYNC"
    | "TEXT_TO_VIDEO"
    | "VIDEO_TO_VIDEO";
  width: number;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object GetV1VideoProjectsIdResponse
 */
const SchemaIn$GetV1VideoProjectsIdResponse: z.ZodType<
  GetV1VideoProjectsIdResponse, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    created_at: z.string(),
    download: Schemas$GetV1VideoProjectsIdResponseDownload.in.nullable(),
    downloads: z.array(Schemas$GetV1VideoProjectsIdResponseDownloadsItem.in),
    enabled: z.boolean(),
    end_seconds: z.number(),
    error: Schemas$GetV1VideoProjectsIdResponseError.in.nullable(),
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$GetV1VideoProjectsIdResponse
 */
const SchemaOut$GetV1VideoProjectsIdResponse: z.ZodType<
  External$GetV1VideoProjectsIdResponse, // output type of this zod object
  z.ZodTypeDef,
  GetV1VideoProjectsIdResponse // the object to be transformed
> = z
  .object({
    createdAt: z.string(),
    download: Schemas$GetV1VideoProjectsIdResponseDownload.out.nullable(),
    downloads: z.array(Schemas$GetV1VideoProjectsIdResponseDownloadsItem.out),
    enabled: z.boolean(),
    endSeconds: z.number(),
    error: Schemas$GetV1VideoProjectsIdResponseError.out.nullable(),
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

export const Schemas$GetV1VideoProjectsIdResponse = {
  in: SchemaIn$GetV1VideoProjectsIdResponse,
  out: SchemaOut$GetV1VideoProjectsIdResponse,
};
