import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Provide the assets for animation.
 */
export type PostV1AnimationBodyAssets = {
  /**
   * The path of the input audio. This is the `file_path` field from the response of the [upload urls API](/docs/api/tag/files/post/v1/files/upload-urls). This field is required if `audio_source` is `file`
   */
  audioFilePath?: string | undefined;
  /**
   * Optionally add an audio source if you'd like to incorporate audio into your video
   */
  audioSource: "file" | "none" | "youtube";
  /**
   * An initial image to use a the first frame of the video. This is the `file_path` field from the response of the [upload urls API](/docs/api/tag/files/post/v1/files/upload-urls)
   */
  imageFilePath?: string | undefined;
  /**
   * Using a youtube video as the input source. This field is required if `audio_source` is `youtube`
   */
  youtubeUrl?: string | undefined;
};

/**
 * @internal
 * PostV1AnimationBodyAssets without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1AnimationBodyAssets = {
  audio_file_path?: string | undefined;
  audio_source: "file" | "none" | "youtube";
  image_file_path?: string | undefined;
  youtube_url?: string | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1AnimationBodyAssets
 */
const SchemaIn$PostV1AnimationBodyAssets: z.ZodType<
  PostV1AnimationBodyAssets, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1AnimationBodyAssets
 */
const SchemaOut$PostV1AnimationBodyAssets: z.ZodType<
  External$PostV1AnimationBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  PostV1AnimationBodyAssets // the object to be transformed
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

export const Schemas$PostV1AnimationBodyAssets = {
  in: SchemaIn$PostV1AnimationBodyAssets,
  out: SchemaOut$PostV1AnimationBodyAssets,
};
