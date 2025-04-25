import { zodTransform } from "magic-hour/core";
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
import * as z from "zod";

/**
 * CreateRequest
 */
export type CreateRequest = {
  /**
   * Provide the assets for video-to-video. For video, The `video_source` field determines whether `video_file_path` or `youtube_url` field is used
   */
  assets: V1VideoToVideoCreateBodyAssets;
  /**
   * The end time of the input video in seconds
   */
  endSeconds: number;
  /**
   * Determines whether the resulting video will have the same frame per second as the original video, or half.
   * * `FULL` - the result video will have the same FPS as the input video
   * * `HALF` - the result video will have half the FPS as the input video
   */
  fpsResolution?: ("FULL" | "HALF") | undefined;
  /**
   * Used to determine the dimensions of the output video.
   *
   * * If height is provided, width will also be required. The larger value between width and height will be used to determine the maximum output resolution while maintaining the original aspect ratio.
   * * If both height and width are omitted, the video will be resized according to your subscription's maximum resolution, while preserving aspect ratio.
   *
   * Note: if the video's original resolution is less than the maximum, the video will not be resized.
   *
   * See our [pricing page](https://magichour.ai/pricing) for more details.
   */
  height?: number | undefined;
  /**
   * The name of video
   */
  name?: string | undefined;
  /**
   * The start time of the input video in seconds
   */
  startSeconds: number;
  style: V1VideoToVideoCreateBodyStyle;
  /**
   * Used to determine the dimensions of the output video.
   *
   * * If width is provided, height will also be required. The larger value between width and height will be used to determine the maximum output resolution while maintaining the original aspect ratio.
   * * If both height and width are omitted, the video will be resized according to your subscription's maximum resolution, while preserving aspect ratio.
   *
   * Note: if the video's original resolution is less than the maximum, the video will not be resized.
   *
   * See our [pricing page](https://magichour.ai/pricing) for more details.
   */
  width?: number | undefined;
};

/**
 * @internal
 * CreateRequest without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$CreateRequest = {
  assets: External$V1VideoToVideoCreateBodyAssets;
  end_seconds: number;
  fps_resolution?: ("FULL" | "HALF") | undefined;
  height?: number | undefined;
  name?: string | undefined;
  start_seconds: number;
  style: External$V1VideoToVideoCreateBodyStyle;
  width?: number | undefined;
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
    fps_resolution: z.enum(["FULL", "HALF"]).optional(),
    height: z.number().int().optional(),
    name: z.string().optional(),
    start_seconds: z.number(),
    style: Schemas$V1VideoToVideoCreateBodyStyle.in,
    width: z.number().int().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      end_seconds: "endSeconds",
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
    fpsResolution: z.enum(["FULL", "HALF"]).optional(),
    height: z.number().int().optional(),
    name: z.string().optional(),
    startSeconds: z.number(),
    style: Schemas$V1VideoToVideoCreateBodyStyle.out,
    width: z.number().int().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      endSeconds: "end_seconds",
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
