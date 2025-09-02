import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * Provide the assets for auto subtitle generator
 */
export type V1AutoSubtitleGeneratorCreateBodyAssets = {
  /**
   * This is the video used to add subtitles. This value is either
   * - a direct URL to the video file
   * - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).
   *
   * Please refer to the [Input File documentation](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) to learn more.
   *
   */
  videoFilePath: string;
};

/**
 * @internal
 * V1AutoSubtitleGeneratorCreateBodyAssets without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AutoSubtitleGeneratorCreateBodyAssets = {
  video_file_path: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AutoSubtitleGeneratorCreateBodyAssets
 */
const SchemaIn$V1AutoSubtitleGeneratorCreateBodyAssets: z.ZodType<
  V1AutoSubtitleGeneratorCreateBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    video_file_path: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      video_file_path: "videoFilePath",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AutoSubtitleGeneratorCreateBodyAssets
 */
const SchemaOut$V1AutoSubtitleGeneratorCreateBodyAssets: z.ZodType<
  External$V1AutoSubtitleGeneratorCreateBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  V1AutoSubtitleGeneratorCreateBodyAssets // the object to be transformed
> = z
  .object({
    videoFilePath: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      videoFilePath: "video_file_path",
    });
  });

export const Schemas$V1AutoSubtitleGeneratorCreateBodyAssets = {
  in: SchemaIn$V1AutoSubtitleGeneratorCreateBodyAssets,
  out: SchemaOut$V1AutoSubtitleGeneratorCreateBodyAssets,
};
