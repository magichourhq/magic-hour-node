import { zodTransform } from "magic-hour/core";
import {
  External$PostV1LipSyncBodyAssets,
  PostV1LipSyncBodyAssets,
  Schemas$PostV1LipSyncBodyAssets,
} from "magic-hour/types/post-v1-lip-sync-body-assets";
import * as z from "zod";

/**
 * CreateRequest
 */
export type CreateRequest = {
  /**
   * Provide the assets for lip-sync. For video, The `video_source` field determines whether `video_file_path` or `youtube_url` field is used
   */
  assets: PostV1LipSyncBodyAssets;
  /**
   * The end time of the input video in seconds
   */
  endSeconds: number;
  /**
   * The height of the final output video. The maximum height depends on your subscription. Please refer to our [pricing page](https://magichour.ai/pricing) for more details
   */
  height: number;
  /**
   * Defines the maximum FPS (frames per second) for the output video. If the input video's FPS is lower than this limit, the output video will retain the input FPS. This is useful for reducing unnecessary frame usage in scenarios where high FPS is not required.
   */
  maxFpsLimit?: number | undefined;
  /**
   * The name of video
   */
  name?: string | undefined;
  /**
   * The start time of the input video in seconds
   */
  startSeconds: number;
  /**
   * The width of the final output video. The maximum width depends on your subscription. Please refer to our [pricing page](https://magichour.ai/pricing) for more details
   */
  width: number;
};

/**
 * @internal
 * CreateRequest without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$CreateRequest = {
  assets: External$PostV1LipSyncBodyAssets;
  end_seconds: number;
  height: number;
  max_fps_limit?: number | undefined;
  name?: string | undefined;
  start_seconds: number;
  width: number;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object CreateRequest
 */
const SchemaIn$CreateRequest: z.ZodType<
  CreateRequest, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    assets: Schemas$PostV1LipSyncBodyAssets.in,
    end_seconds: z.number(),
    height: z.number().int(),
    max_fps_limit: z.number().optional(),
    name: z.string().optional(),
    start_seconds: z.number(),
    width: z.number().int(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      end_seconds: "endSeconds",
      height: "height",
      max_fps_limit: "maxFpsLimit",
      name: "name",
      start_seconds: "startSeconds",
      width: "width",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$CreateRequest
 */
const SchemaOut$CreateRequest: z.ZodType<
  External$CreateRequest, // output type of this zod object
  z.ZodTypeDef,
  CreateRequest // the object to be transformed
> = z
  .object({
    assets: Schemas$PostV1LipSyncBodyAssets.out,
    endSeconds: z.number(),
    height: z.number().int(),
    maxFpsLimit: z.number().optional(),
    name: z.string().optional(),
    startSeconds: z.number(),
    width: z.number().int(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      endSeconds: "end_seconds",
      height: "height",
      maxFpsLimit: "max_fps_limit",
      name: "name",
      startSeconds: "start_seconds",
      width: "width",
    });
  });

export const Schemas$CreateRequest = {
  in: SchemaIn$CreateRequest,
  out: SchemaOut$CreateRequest,
};
