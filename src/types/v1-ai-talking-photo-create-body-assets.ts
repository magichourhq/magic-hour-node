import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Provide the assets for creating a talking photo
 */
export type V1AiTalkingPhotoCreateBodyAssets = {
  /**
   * The audio file to sync with the image. This value is either
   * - a direct URL to the video file
   * - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).
   *
   * Please refer to the [Input File documentation](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) to learn more.
   *
   */
  audioFilePath: string;
  /**
   * The source image to animate. This value is either
   * - a direct URL to the video file
   * - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).
   *
   * Please refer to the [Input File documentation](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) to learn more.
   *
   */
  imageFilePath: string;
};

/**
 * @internal
 * V1AiTalkingPhotoCreateBodyAssets without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiTalkingPhotoCreateBodyAssets = {
  audio_file_path: string;
  image_file_path: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiTalkingPhotoCreateBodyAssets
 */
const SchemaIn$V1AiTalkingPhotoCreateBodyAssets: z.ZodType<
  V1AiTalkingPhotoCreateBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    audio_file_path: z.string(),
    image_file_path: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      audio_file_path: "audioFilePath",
      image_file_path: "imageFilePath",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiTalkingPhotoCreateBodyAssets
 */
const SchemaOut$V1AiTalkingPhotoCreateBodyAssets: z.ZodType<
  External$V1AiTalkingPhotoCreateBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  V1AiTalkingPhotoCreateBodyAssets // the object to be transformed
> = z
  .object({
    audioFilePath: z.string(),
    imageFilePath: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      audioFilePath: "audio_file_path",
      imageFilePath: "image_file_path",
    });
  });

export const Schemas$V1AiTalkingPhotoCreateBodyAssets = {
  in: SchemaIn$V1AiTalkingPhotoCreateBodyAssets,
  out: SchemaOut$V1AiTalkingPhotoCreateBodyAssets,
};
