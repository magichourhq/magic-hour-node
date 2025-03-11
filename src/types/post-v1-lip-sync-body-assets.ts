import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Provide the assets for lip-sync. For video, The `video_source` field determines whether `video_file_path` or `youtube_url` field is used
 */
export type PostV1LipSyncBodyAssets = {
  /**
   * The path of the audio file. This value can be either the `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls), or the url of the file.
   */
  audioFilePath: string;
  /**
   * The path of the input video. This field is required if `video_source` is `file`. This value can be either the `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls), or the url of the file.
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
 * PostV1LipSyncBodyAssets without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1LipSyncBodyAssets = {
  audio_file_path: string;
  video_file_path?: string | undefined;
  video_source: "file" | "youtube";
  youtube_url?: string | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1LipSyncBodyAssets
 */
const SchemaIn$PostV1LipSyncBodyAssets: z.ZodType<
  PostV1LipSyncBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    audio_file_path: z.string(),
    video_file_path: z.string().optional(),
    video_source: z.enum(["file", "youtube"]),
    youtube_url: z.string().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      audio_file_path: "audioFilePath",
      video_file_path: "videoFilePath",
      video_source: "videoSource",
      youtube_url: "youtubeUrl",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1LipSyncBodyAssets
 */
const SchemaOut$PostV1LipSyncBodyAssets: z.ZodType<
  External$PostV1LipSyncBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  PostV1LipSyncBodyAssets // the object to be transformed
> = z
  .object({
    audioFilePath: z.string(),
    videoFilePath: z.string().optional(),
    videoSource: z.enum(["file", "youtube"]),
    youtubeUrl: z.string().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      audioFilePath: "audio_file_path",
      videoFilePath: "video_file_path",
      videoSource: "video_source",
      youtubeUrl: "youtube_url",
    });
  });

export const Schemas$PostV1LipSyncBodyAssets = {
  in: SchemaIn$PostV1LipSyncBodyAssets,
  out: SchemaOut$PostV1LipSyncBodyAssets,
};
