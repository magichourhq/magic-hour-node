import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Provide the assets for face swap. For video, The `video_source` field determines whether `video_file_path` or `youtube_url` field is used
 */
export type V1FaceSwapCreateBodyAssets = {
  /**
   * The path of the input image. This value can be either the `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls), or the url of the file.
   */
  imageFilePath: string;
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
 * V1FaceSwapCreateBodyAssets without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1FaceSwapCreateBodyAssets = {
  image_file_path: string;
  video_file_path?: string | undefined;
  video_source: "file" | "youtube";
  youtube_url?: string | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1FaceSwapCreateBodyAssets
 */
const SchemaIn$V1FaceSwapCreateBodyAssets: z.ZodType<
  V1FaceSwapCreateBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    image_file_path: z.string(),
    video_file_path: z.string().optional(),
    video_source: z.enum(["file", "youtube"]),
    youtube_url: z.string().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      image_file_path: "imageFilePath",
      video_file_path: "videoFilePath",
      video_source: "videoSource",
      youtube_url: "youtubeUrl",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1FaceSwapCreateBodyAssets
 */
const SchemaOut$V1FaceSwapCreateBodyAssets: z.ZodType<
  External$V1FaceSwapCreateBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  V1FaceSwapCreateBodyAssets // the object to be transformed
> = z
  .object({
    imageFilePath: z.string(),
    videoFilePath: z.string().optional(),
    videoSource: z.enum(["file", "youtube"]),
    youtubeUrl: z.string().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      imageFilePath: "image_file_path",
      videoFilePath: "video_file_path",
      videoSource: "video_source",
      youtubeUrl: "youtube_url",
    });
  });

export const Schemas$V1FaceSwapCreateBodyAssets = {
  in: SchemaIn$V1FaceSwapCreateBodyAssets,
  out: SchemaOut$V1FaceSwapCreateBodyAssets,
};
