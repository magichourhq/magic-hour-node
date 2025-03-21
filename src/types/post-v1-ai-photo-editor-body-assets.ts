import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Provide the assets for photo editor
 */
export type PostV1AiPhotoEditorBodyAssets = {
  /**
   * The image used to generate the output. This value can be either the `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls), or the url of the file.
   */
  imageFilePath: string;
};

/**
 * @internal
 * PostV1AiPhotoEditorBodyAssets without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1AiPhotoEditorBodyAssets = {
  image_file_path: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1AiPhotoEditorBodyAssets
 */
const SchemaIn$PostV1AiPhotoEditorBodyAssets: z.ZodType<
  PostV1AiPhotoEditorBodyAssets, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1AiPhotoEditorBodyAssets
 */
const SchemaOut$PostV1AiPhotoEditorBodyAssets: z.ZodType<
  External$PostV1AiPhotoEditorBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  PostV1AiPhotoEditorBodyAssets // the object to be transformed
> = z
  .object({
    imageFilePath: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      imageFilePath: "image_file_path",
    });
  });

export const Schemas$PostV1AiPhotoEditorBodyAssets = {
  in: SchemaIn$PostV1AiPhotoEditorBodyAssets,
  out: SchemaOut$PostV1AiPhotoEditorBodyAssets,
};
