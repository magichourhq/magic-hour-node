import * as z from "zod";

import { zodTransform } from "magic-hour/core";

/**
 * V1FaceSwapCreateBodyAssetsFaceMappingsItem
 */
export type V1FaceSwapCreateBodyAssetsFaceMappingsItem = {
  /**
   * The face image that will be used to replace the face in the `original_face`. This value is either
   * - a direct URL to the video file
   * - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).
   *
   * Please refer to the [Input File documentation](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) to learn more.
   *
   */
  newFace: string;
  /**
   * The face detected from the image in `target_file_path`. The file name is in the format of `<face_frame>-<face_index>.png`. This value is corresponds to the response in the [face detection API](https://docs.magichour.ai/api-reference/files/get-face-detection-details).
   *
   * * The face_frame is the frame number of the face in the target image. For images, the frame number is always 0.
   * * The face_index is the index of the face in the target image, starting from 0 going left to right.
   */
  originalFace: string;
};

/**
 * @internal
 * V1FaceSwapCreateBodyAssetsFaceMappingsItem without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1FaceSwapCreateBodyAssetsFaceMappingsItem = {
  new_face: string;
  original_face: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1FaceSwapCreateBodyAssetsFaceMappingsItem
 */
const SchemaIn$V1FaceSwapCreateBodyAssetsFaceMappingsItem: z.ZodType<
  V1FaceSwapCreateBodyAssetsFaceMappingsItem, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    new_face: z.string(),
    original_face: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      new_face: "newFace",
      original_face: "originalFace",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1FaceSwapCreateBodyAssetsFaceMappingsItem
 */
const SchemaOut$V1FaceSwapCreateBodyAssetsFaceMappingsItem: z.ZodType<
  External$V1FaceSwapCreateBodyAssetsFaceMappingsItem, // output type of this zod object
  z.ZodTypeDef,
  V1FaceSwapCreateBodyAssetsFaceMappingsItem // the object to be transformed
> = z
  .object({
    newFace: z.string(),
    originalFace: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      newFace: "new_face",
      originalFace: "original_face",
    });
  });

export const Schemas$V1FaceSwapCreateBodyAssetsFaceMappingsItem = {
  in: SchemaIn$V1FaceSwapCreateBodyAssetsFaceMappingsItem,
  out: SchemaOut$V1FaceSwapCreateBodyAssetsFaceMappingsItem,
};
