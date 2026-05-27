import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * Provide the audio file and an optional reference image.
 */
export type V1AudioToVideoCreateBodyAssets = {
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
   * Reference image for the initial frame of the video. This value is either
   * - a direct URL to the video file
   * - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).
   *
   * See the [file upload guide](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) for details.
   *
   */
  imageFilePath?: string | undefined;
};

/**
 * @internal
 * V1AudioToVideoCreateBodyAssets without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AudioToVideoCreateBodyAssets = {
  audio_file_path: string;
  image_file_path?: string | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AudioToVideoCreateBodyAssets
 */
const SchemaIn$V1AudioToVideoCreateBodyAssets: z.ZodType<
  V1AudioToVideoCreateBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    audio_file_path: z.string(),
    image_file_path: z.string().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      audio_file_path: "audioFilePath",
      image_file_path: "imageFilePath",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AudioToVideoCreateBodyAssets
 */
const SchemaOut$V1AudioToVideoCreateBodyAssets: z.ZodType<
  External$V1AudioToVideoCreateBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  V1AudioToVideoCreateBodyAssets // the object to be transformed
> = z
  .object({
    audioFilePath: z.string(),
    imageFilePath: z.string().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      audioFilePath: "audio_file_path",
      imageFilePath: "image_file_path",
    });
  });

export const Schemas$V1AudioToVideoCreateBodyAssets = {
  in: SchemaIn$V1AudioToVideoCreateBodyAssets,
  out: SchemaOut$V1AudioToVideoCreateBodyAssets,
};
