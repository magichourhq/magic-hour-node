import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * Provide the assets for video editing.
 */
export type V1AiVideoEditorCreateBodyAssets = {
  /**
   * The video to edit. This value is either
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
 * V1AiVideoEditorCreateBodyAssets without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiVideoEditorCreateBodyAssets = {
  video_file_path: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiVideoEditorCreateBodyAssets
 */
const SchemaIn$V1AiVideoEditorCreateBodyAssets: z.ZodType<
  V1AiVideoEditorCreateBodyAssets, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiVideoEditorCreateBodyAssets
 */
const SchemaOut$V1AiVideoEditorCreateBodyAssets: z.ZodType<
  External$V1AiVideoEditorCreateBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  V1AiVideoEditorCreateBodyAssets // the object to be transformed
> = z
  .object({
    videoFilePath: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      videoFilePath: "video_file_path",
    });
  });

export const Schemas$V1AiVideoEditorCreateBodyAssets = {
  in: SchemaIn$V1AiVideoEditorCreateBodyAssets,
  out: SchemaOut$V1AiVideoEditorCreateBodyAssets,
};
