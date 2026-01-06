import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * Provide the assets for image edit
 */
export type V1AiImageEditorCreateBodyAssets = {
  /**
   * Deprecated: Please use `image_file_paths` instead as edits with multiple images are now supported. The image used in the edit. This value is either
   * - a direct URL to the video file
   * - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).
   *
   * See the [file upload guide](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) for details.
   *
   */
  imageFilePath?: string | undefined;
  /**
   * The image(s) used in the edit, maximum of 10 images. This value is either
   * - a direct URL to the video file
   * - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).
   *
   * See the [file upload guide](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) for details.
   *
   */
  imageFilePaths?: string[] | undefined;
};

/**
 * @internal
 * V1AiImageEditorCreateBodyAssets without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiImageEditorCreateBodyAssets = {
  image_file_path?: string | undefined;
  image_file_paths?: string[] | undefined;
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
    image_file_path: z.string().optional(),
    image_file_paths: z.array(z.string()).optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      image_file_path: "imageFilePath",
      image_file_paths: "imageFilePaths",
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
    imageFilePath: z.string().optional(),
    imageFilePaths: z.array(z.string()).optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      imageFilePath: "image_file_path",
      imageFilePaths: "image_file_paths",
    });
  });

export const Schemas$V1AiImageEditorCreateBodyAssets = {
  in: SchemaIn$V1AiImageEditorCreateBodyAssets,
  out: SchemaOut$V1AiImageEditorCreateBodyAssets,
};
