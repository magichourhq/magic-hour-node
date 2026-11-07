import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1VideoToVideoCreateBodyAssets,
  Schemas$V1VideoToVideoCreateBodyAssets,
  V1VideoToVideoCreateBodyAssets,
} from "magic-hour/types/v1-video-to-video-create-body-assets";
import {
  External$V1VideoToVideoCreateBodyStyle,
  Schemas$V1VideoToVideoCreateBodyStyle,
  V1VideoToVideoCreateBodyStyle,
} from "magic-hour/types/v1-video-to-video-create-body-style";

/**
 * CreateRequest
 */
export type CreateRequest = {
  /**
   * Provide the assets for video-to-video. For video, The `video_source` field determines whether `video_file_path` or `youtube_url` field is used
   */
  assets: V1VideoToVideoCreateBodyAssets;
  /**
   * End time of your clip (seconds). Must be greater than start_seconds.
   */
  endSeconds: number;
  /**
   * Source video FPS for v3 frame limits and estimated credits. Defaults to 30; final charges settle to rendered frames.
   */
  fps?: number | undefined;
  /**
   * Determines whether the resulting video will have the same frame per second as the original video, or half.
   * * `FULL` - the result video will have the same FPS as the input video
   * * `HALF` - the result video will have half the FPS as the input video
   */
  fpsResolution?: ("FULL" | "HALF") | undefined;
  /**
   * Source video height in integer pixels. Required and positive for v3; ignored for v1/v2.
   */
  height?: number | null | undefined;
  /**
   * Give your video a custom name for easy identification.
   */
  name?: string | undefined;
  /**
   * Start time of your clip (seconds). Must be ≥ 0.
   */
  startSeconds: number;
  style: V1VideoToVideoCreateBodyStyle;
  /**
   * Source video width in integer pixels. Required and positive for v3; ignored for v1/v2.
   */
  width?: number | null | undefined;
};

/**
 * @internal
 * CreateRequest without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$CreateRequest = {
  assets: External$V1VideoToVideoCreateBodyAssets;
  end_seconds: number;
  fps?: number | undefined;
  fps_resolution?: ("FULL" | "HALF") | undefined;
  height?: number | null | undefined;
  name?: string | undefined;
  start_seconds: number;
  style: External$V1VideoToVideoCreateBodyStyle;
  width?: number | null | undefined;
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
    assets: Schemas$V1VideoToVideoCreateBodyAssets.in,
    end_seconds: z.number(),
    fps: z.number().optional(),
    fps_resolution: z.enum(["FULL", "HALF"]).optional(),
    height: z.number().int().nullable().optional(),
    name: z.string().optional(),
    start_seconds: z.number(),
    style: Schemas$V1VideoToVideoCreateBodyStyle.in,
    width: z.number().int().nullable().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      end_seconds: "endSeconds",
      fps: "fps",
      fps_resolution: "fpsResolution",
      height: "height",
      name: "name",
      start_seconds: "startSeconds",
      style: "style",
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
    assets: Schemas$V1VideoToVideoCreateBodyAssets.out,
    endSeconds: z.number(),
    fps: z.number().optional(),
    fpsResolution: z.enum(["FULL", "HALF"]).optional(),
    height: z.number().int().nullable().optional(),
    name: z.string().optional(),
    startSeconds: z.number(),
    style: Schemas$V1VideoToVideoCreateBodyStyle.out,
    width: z.number().int().nullable().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      endSeconds: "end_seconds",
      fps: "fps",
      fpsResolution: "fps_resolution",
      height: "height",
      name: "name",
      startSeconds: "start_seconds",
      style: "style",
      width: "width",
    });
  });

export const Schemas$CreateRequest = {
  in: SchemaIn$CreateRequest,
  out: SchemaOut$CreateRequest,
};
