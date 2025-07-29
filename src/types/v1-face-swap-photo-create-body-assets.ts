import {
  External$V1FaceSwapPhotoCreateBodyAssetsFaceMappingsItem,
  Schemas$V1FaceSwapPhotoCreateBodyAssetsFaceMappingsItem,
  V1FaceSwapPhotoCreateBodyAssetsFaceMappingsItem,
} from "./v1-face-swap-photo-create-body-assets-face-mappings-item";
import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Provide the assets for face swap photo
 */
export type V1FaceSwapPhotoCreateBodyAssets = {
  /**
   * This is the array of face mappings used for multiple face swap. The value is required if `face_swap_mode` is `individual-faces`.
   */
  faceMappings?: V1FaceSwapPhotoCreateBodyAssetsFaceMappingsItem[] | undefined;
  /**
   * The mode of face swap.
   * * `all-faces` - Swap all faces in the target image or video. `source_file_path` is required.
   * * `individual-faces` - Swap individual faces in the target image or video. `source_faces` is required.
   */
  faceSwapMode?: ("all-faces" | "individual-faces") | undefined;
  /**
   * This is the image from which the face is extracted. The value is required if `face_swap_mode` is `all-faces`.
   *
   * This value can be either the `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls), or the url of the file.
   */
  sourceFilePath?: string | undefined;
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
  face_mappings?:
    | External$V1FaceSwapPhotoCreateBodyAssetsFaceMappingsItem[]
    | undefined;
  face_swap_mode?: ("all-faces" | "individual-faces") | undefined;
  source_file_path?: string | undefined;
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
    face_mappings: z
      .array(Schemas$V1FaceSwapPhotoCreateBodyAssetsFaceMappingsItem.in)
      .optional(),
    face_swap_mode: z.enum(["all-faces", "individual-faces"]).optional(),
    source_file_path: z.string().optional(),
    target_file_path: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      face_mappings: "faceMappings",
      face_swap_mode: "faceSwapMode",
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
    faceMappings: z
      .array(Schemas$V1FaceSwapPhotoCreateBodyAssetsFaceMappingsItem.out)
      .optional(),
    faceSwapMode: z.enum(["all-faces", "individual-faces"]).optional(),
    sourceFilePath: z.string().optional(),
    targetFilePath: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      faceMappings: "face_mappings",
      faceSwapMode: "face_swap_mode",
      sourceFilePath: "source_file_path",
      targetFilePath: "target_file_path",
    });
  });

export const Schemas$V1FaceSwapPhotoCreateBodyAssets = {
  in: SchemaIn$V1FaceSwapPhotoCreateBodyAssets,
  out: SchemaOut$V1FaceSwapPhotoCreateBodyAssets,
};
