import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Provide the assets for video-to-video. For video, The `video_source` field determines whether `video_file_path` or `youtube_url` field is used
 */
export type PostV1VideoToVideoBodyAssets = {
  /**
   * The path of the input video. This is the `file_path` field from the response of the [upload urls API](/docs/api/tag/files/post/v1/files/upload-urls). This field is required if `video_source` is `file`
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
 * PostV1VideoToVideoBodyAssets without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1VideoToVideoBodyAssets = {
  video_file_path?: string | undefined;
  video_source: "file" | "youtube";
  youtube_url?: string | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1VideoToVideoBodyAssets
 */
const SchemaIn$PostV1VideoToVideoBodyAssets: z.ZodType<
  PostV1VideoToVideoBodyAssets, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1VideoToVideoBodyAssets
 */
const SchemaOut$PostV1VideoToVideoBodyAssets: z.ZodType<
  External$PostV1VideoToVideoBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  PostV1VideoToVideoBodyAssets // the object to be transformed
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

export const Schemas$PostV1VideoToVideoBodyAssets = {
  in: SchemaIn$PostV1VideoToVideoBodyAssets,
  out: SchemaOut$PostV1VideoToVideoBodyAssets,
};
