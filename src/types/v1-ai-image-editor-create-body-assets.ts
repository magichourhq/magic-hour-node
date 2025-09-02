import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * Provide the assets for image edit
 */
export type V1AiImageEditorCreateBodyAssets = {
  /**
   * The image used in the edit. This value is either
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
 * V1AiImageEditorCreateBodyAssets without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiImageEditorCreateBodyAssets = {
  image_file_path: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiImageEditorCreateBodyAssets
 */
const SchemaIn$V1AiImageEditorCreateBodyAssets: z.ZodType<
  V1AiImageEditorCreateBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    image_file_path: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      image_file_path: "imageFilePath",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiImageEditorCreateBodyAssets
 */
const SchemaOut$V1AiImageEditorCreateBodyAssets: z.ZodType<
  External$V1AiImageEditorCreateBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  V1AiImageEditorCreateBodyAssets // the object to be transformed
> = z
  .object({
    imageFilePath: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      imageFilePath: "image_file_path",
    });
  });

export const Schemas$V1AiImageEditorCreateBodyAssets = {
  in: SchemaIn$V1AiImageEditorCreateBodyAssets,
  out: SchemaOut$V1AiImageEditorCreateBodyAssets,
};
