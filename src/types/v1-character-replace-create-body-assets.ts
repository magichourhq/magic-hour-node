import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * Source video and reference character image for the job.
 */
export type V1CharacterReplaceCreateBodyAssets = {
  /**
   * Reference character image used as the replacement or animation target. This value is either
   * - a direct URL to the video file
   * - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).
   *
   * See the [file upload guide](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) for details.
   *
   */
  imageFilePath: string;
  /**
   * Source video containing the subject to replace or animate. This value is either
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
 * V1CharacterReplaceCreateBodyAssets without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1CharacterReplaceCreateBodyAssets = {
  image_file_path: string;
  video_file_path: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1CharacterReplaceCreateBodyAssets
 */
const SchemaIn$V1CharacterReplaceCreateBodyAssets: z.ZodType<
  V1CharacterReplaceCreateBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    image_file_path: z.string(),
    video_file_path: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      image_file_path: "imageFilePath",
      video_file_path: "videoFilePath",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1CharacterReplaceCreateBodyAssets
 */
const SchemaOut$V1CharacterReplaceCreateBodyAssets: z.ZodType<
  External$V1CharacterReplaceCreateBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  V1CharacterReplaceCreateBodyAssets // the object to be transformed
> = z
  .object({
    imageFilePath: z.string(),
    videoFilePath: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      imageFilePath: "image_file_path",
      videoFilePath: "video_file_path",
    });
  });

export const Schemas$V1CharacterReplaceCreateBodyAssets = {
  in: SchemaIn$V1CharacterReplaceCreateBodyAssets,
  out: SchemaOut$V1CharacterReplaceCreateBodyAssets,
};
