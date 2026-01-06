import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * Provide the assets for lip-sync. For video, The `video_source` field determines whether `video_file_path` or `youtube_url` field is used
 */
export type V1LipSyncCreateBodyAssets = {
  /**
   * The path of the audio file. This value is either
   * - a direct URL to the video file
   * - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).
   *
   * See the [file upload guide](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) for details.
   *
   */
  audioFilePath: string;
  /**
   * Your video file. Required if `video_source` is `file`. This value is either
   * - a direct URL to the video file
   * - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).
   *
   * See the [file upload guide](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) for details.
   *
   */
  videoFilePath?: string | undefined;
  /**
   * Choose your video source.
   */
  videoSource: "file" | "youtube";
  /**
   * YouTube URL (required if `video_source` is `youtube`).
   */
  youtubeUrl?: string | undefined;
};

/**
 * @internal
 * V1LipSyncCreateBodyAssets without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1LipSyncCreateBodyAssets = {
  audio_file_path: string;
  video_file_path?: string | undefined;
  video_source: "file" | "youtube";
  youtube_url?: string | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1LipSyncCreateBodyAssets
 */
const SchemaIn$V1LipSyncCreateBodyAssets: z.ZodType<
  V1LipSyncCreateBodyAssets, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1LipSyncCreateBodyAssets
 */
const SchemaOut$V1LipSyncCreateBodyAssets: z.ZodType<
  External$V1LipSyncCreateBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  V1LipSyncCreateBodyAssets // the object to be transformed
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

export const Schemas$V1LipSyncCreateBodyAssets = {
  in: SchemaIn$V1LipSyncCreateBodyAssets,
  out: SchemaOut$V1LipSyncCreateBodyAssets,
};
