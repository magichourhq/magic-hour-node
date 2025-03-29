import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Provide the assets for face swap photo
 */
export type V1FaceSwapPhotoCreateBodyAssets = {
  /**
   * This is the image from which the face is extracted. This value can be either the `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls), or the url of the file.
   */
  sourceFilePath: string;
  /**
   * This is the image where the face from the source image will be placed. This value can be either the `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls), or the url of the file.
   */
  targetFilePath: string;
};

/**
 * @internal
 * V1FaceSwapPhotoCreateBodyAssets without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1FaceSwapPhotoCreateBodyAssets = {
  source_file_path: string;
  target_file_path: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1FaceSwapPhotoCreateBodyAssets
 */
const SchemaIn$V1FaceSwapPhotoCreateBodyAssets: z.ZodType<
  V1FaceSwapPhotoCreateBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    source_file_path: z.string(),
    target_file_path: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      source_file_path: "sourceFilePath",
      target_file_path: "targetFilePath",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1FaceSwapPhotoCreateBodyAssets
 */
const SchemaOut$V1FaceSwapPhotoCreateBodyAssets: z.ZodType<
  External$V1FaceSwapPhotoCreateBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  V1FaceSwapPhotoCreateBodyAssets // the object to be transformed
> = z
  .object({
    sourceFilePath: z.string(),
    targetFilePath: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      sourceFilePath: "source_file_path",
      targetFilePath: "target_file_path",
    });
  });

export const Schemas$V1FaceSwapPhotoCreateBodyAssets = {
  in: SchemaIn$V1FaceSwapPhotoCreateBodyAssets,
  out: SchemaOut$V1FaceSwapPhotoCreateBodyAssets,
};
