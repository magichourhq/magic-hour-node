import * as z from "zod";

import { zodTransform } from "magic-hour/core";

/**
 * Provide the assets for video-to-video. For video, The `video_source` field determines whether `video_file_path` or `youtube_url` field is used
 */
export type V1VideoToVideoCreateBodyAssets = {
  /**
   * Required if `video_source` is `file`. This value is either
   * - a direct URL to the video file
   * - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).
   *
   * Please refer to the [Input File documentation](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) to learn more.
   *
   */
  videoFilePath?: string | undefined;
  videoSource: "file" | "youtube";
  /**
   * Using a youtube video as the input source. This field is required if `video_source` is `youtube`
   */
  youtubeUrl?: string | undefined;
};

/**
 * @internal
 * V1VideoToVideoCreateBodyAssets without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1VideoToVideoCreateBodyAssets = {
  video_file_path?: string | undefined;
  video_source: "file" | "youtube";
  youtube_url?: string | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1VideoToVideoCreateBodyAssets
 */
const SchemaIn$V1VideoToVideoCreateBodyAssets: z.ZodType<
  V1VideoToVideoCreateBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    video_file_path: z.string().optional(),
    video_source: z.enum(["file", "youtube"]),
    youtube_url: z.string().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      video_file_path: "videoFilePath",
      video_source: "videoSource",
      youtube_url: "youtubeUrl",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1VideoToVideoCreateBodyAssets
 */
const SchemaOut$V1VideoToVideoCreateBodyAssets: z.ZodType<
  External$V1VideoToVideoCreateBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  V1VideoToVideoCreateBodyAssets // the object to be transformed
> = z
  .object({
    videoFilePath: z.string().optional(),
    videoSource: z.enum(["file", "youtube"]),
    youtubeUrl: z.string().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      videoFilePath: "video_file_path",
      videoSource: "video_source",
      youtubeUrl: "youtube_url",
    });
  });

export const Schemas$V1VideoToVideoCreateBodyAssets = {
  in: SchemaIn$V1VideoToVideoCreateBodyAssets,
  out: SchemaOut$V1VideoToVideoCreateBodyAssets,
};
