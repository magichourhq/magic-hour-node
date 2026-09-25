import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * Source video for the translation job.
 */
export type V1AiVideoTranslatorCreateBodyAssets = {
  /**
   * Source video containing the speech to translate. This value is either
   * - a direct URL to the video file
   * - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).
   *
   * See the [file upload guide](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) for details.
   *
   */
  videoFilePath: string;
};

/**
 * @internal
 * V1AiVideoTranslatorCreateBodyAssets without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiVideoTranslatorCreateBodyAssets = {
  video_file_path: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiVideoTranslatorCreateBodyAssets
 */
const SchemaIn$V1AiVideoTranslatorCreateBodyAssets: z.ZodType<
  V1AiVideoTranslatorCreateBodyAssets, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiVideoTranslatorCreateBodyAssets
 */
const SchemaOut$V1AiVideoTranslatorCreateBodyAssets: z.ZodType<
  External$V1AiVideoTranslatorCreateBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  V1AiVideoTranslatorCreateBodyAssets // the object to be transformed
> = z
  .object({
    videoFilePath: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      videoFilePath: "video_file_path",
    });
  });

export const Schemas$V1AiVideoTranslatorCreateBodyAssets = {
  in: SchemaIn$V1AiVideoTranslatorCreateBodyAssets,
  out: SchemaOut$V1AiVideoTranslatorCreateBodyAssets,
};
