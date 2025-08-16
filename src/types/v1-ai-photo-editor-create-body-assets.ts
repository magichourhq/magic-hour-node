import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Provide the assets for photo editor
 */
export type V1AiPhotoEditorCreateBodyAssets = {
  /**
   * The image used to generate the output. This value is either
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
 * V1AiPhotoEditorCreateBodyAssets without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiPhotoEditorCreateBodyAssets = {
  image_file_path: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiPhotoEditorCreateBodyAssets
 */
const SchemaIn$V1AiPhotoEditorCreateBodyAssets: z.ZodType<
  V1AiPhotoEditorCreateBodyAssets, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiPhotoEditorCreateBodyAssets
 */
const SchemaOut$V1AiPhotoEditorCreateBodyAssets: z.ZodType<
  External$V1AiPhotoEditorCreateBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  V1AiPhotoEditorCreateBodyAssets // the object to be transformed
> = z
  .object({
    imageFilePath: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      imageFilePath: "image_file_path",
    });
  });

export const Schemas$V1AiPhotoEditorCreateBodyAssets = {
  in: SchemaIn$V1AiPhotoEditorCreateBodyAssets,
  out: SchemaOut$V1AiPhotoEditorCreateBodyAssets,
};
