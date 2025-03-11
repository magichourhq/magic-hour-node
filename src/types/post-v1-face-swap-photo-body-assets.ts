import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Provide the assets for face swap photo
 */
export type PostV1FaceSwapPhotoBodyAssets = {
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
 * PostV1FaceSwapPhotoBodyAssets without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1FaceSwapPhotoBodyAssets = {
  source_file_path: string;
  target_file_path: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1FaceSwapPhotoBodyAssets
 */
const SchemaIn$PostV1FaceSwapPhotoBodyAssets: z.ZodType<
  PostV1FaceSwapPhotoBodyAssets, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1FaceSwapPhotoBodyAssets
 */
const SchemaOut$PostV1FaceSwapPhotoBodyAssets: z.ZodType<
  External$PostV1FaceSwapPhotoBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  PostV1FaceSwapPhotoBodyAssets // the object to be transformed
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

export const Schemas$PostV1FaceSwapPhotoBodyAssets = {
  in: SchemaIn$PostV1FaceSwapPhotoBodyAssets,
  out: SchemaOut$PostV1FaceSwapPhotoBodyAssets,
};
