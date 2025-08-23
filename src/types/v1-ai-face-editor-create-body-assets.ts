import * as z from "zod";

import { zodTransform } from "magic-hour/core";

/**
 * Provide the assets for face editor
 */
export type V1AiFaceEditorCreateBodyAssets = {
  /**
   * This is the image whose face will be edited. This value is either
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
 * V1AiFaceEditorCreateBodyAssets without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiFaceEditorCreateBodyAssets = {
  image_file_path: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiFaceEditorCreateBodyAssets
 */
const SchemaIn$V1AiFaceEditorCreateBodyAssets: z.ZodType<
  V1AiFaceEditorCreateBodyAssets, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiFaceEditorCreateBodyAssets
 */
const SchemaOut$V1AiFaceEditorCreateBodyAssets: z.ZodType<
  External$V1AiFaceEditorCreateBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  V1AiFaceEditorCreateBodyAssets // the object to be transformed
> = z
  .object({
    imageFilePath: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      imageFilePath: "image_file_path",
    });
  });

export const Schemas$V1AiFaceEditorCreateBodyAssets = {
  in: SchemaIn$V1AiFaceEditorCreateBodyAssets,
  out: SchemaOut$V1AiFaceEditorCreateBodyAssets,
};
