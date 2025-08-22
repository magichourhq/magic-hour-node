import * as z from "zod";

import { zodTransform } from "magic-hour/core";

/**
 * Provide the assets for animation.
 */
export type V1AnimationCreateBodyAssets = {
  /**
   * The path of the input audio. This field is required if `audio_source` is `file`. This value is either
   * - a direct URL to the video file
   * - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).
   *
   * Please refer to the [Input File documentation](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) to learn more.
   *
   */
  audioFilePath?: string | undefined;
  /**
   * Optionally add an audio source if you'd like to incorporate audio into your video
   */
  audioSource: "file" | "none" | "youtube";
  /**
   * An initial image to use a the first frame of the video. This value is either
   * - a direct URL to the video file
   * - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).
   *
   * Please refer to the [Input File documentation](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) to learn more.
   *
   */
  imageFilePath?: string | undefined;
  /**
   * Using a youtube video as the input source. This field is required if `audio_source` is `youtube`
   */
  youtubeUrl?: string | undefined;
};

/**
 * @internal
 * V1AnimationCreateBodyAssets without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AnimationCreateBodyAssets = {
  audio_file_path?: string | undefined;
  audio_source: "file" | "none" | "youtube";
  image_file_path?: string | undefined;
  youtube_url?: string | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AnimationCreateBodyAssets
 */
const SchemaIn$V1AnimationCreateBodyAssets: z.ZodType<
  V1AnimationCreateBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    audio_file_path: z.string().optional(),
    audio_source: z.enum(["file", "none", "youtube"]),
    image_file_path: z.string().optional(),
    youtube_url: z.string().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      audio_file_path: "audioFilePath",
      audio_source: "audioSource",
      image_file_path: "imageFilePath",
      youtube_url: "youtubeUrl",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AnimationCreateBodyAssets
 */
const SchemaOut$V1AnimationCreateBodyAssets: z.ZodType<
  External$V1AnimationCreateBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  V1AnimationCreateBodyAssets // the object to be transformed
> = z
  .object({
    audioFilePath: z.string().optional(),
    audioSource: z.enum(["file", "none", "youtube"]),
    imageFilePath: z.string().optional(),
    youtubeUrl: z.string().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      audioFilePath: "audio_file_path",
      audioSource: "audio_source",
      imageFilePath: "image_file_path",
      youtubeUrl: "youtube_url",
    });
  });

export const Schemas$V1AnimationCreateBodyAssets = {
  in: SchemaIn$V1AnimationCreateBodyAssets,
  out: SchemaOut$V1AnimationCreateBodyAssets,
};
