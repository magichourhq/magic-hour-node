import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1FaceSwapCreateBodyAssetsFaceMappingsItem,
  Schemas$V1FaceSwapCreateBodyAssetsFaceMappingsItem,
  V1FaceSwapCreateBodyAssetsFaceMappingsItem,
} from "./v1-face-swap-create-body-assets-face-mappings-item";

/**
 * Provide the assets for face swap. For video, The `video_source` field determines whether `video_file_path` or `youtube_url` field is used
 */
export type V1FaceSwapCreateBodyAssets = {
  /**
   * This is the array of face mappings used for multiple face swap. The value is required if `face_swap_mode` is `individual-faces`.
   */
  faceMappings?: V1FaceSwapCreateBodyAssetsFaceMappingsItem[] | undefined;
  /**
   * Choose how to swap faces:
   * **all-faces** (recommended) — swap all detected faces using one source image (`source_file_path` required)
   * +- **individual-faces** — specify exact mappings using `face_mappings`
   */
  faceSwapMode?: ("all-faces" | "individual-faces") | undefined;
  /**
   * The path of the input image with the face to be swapped.  The value is required if `face_swap_mode` is `all-faces`.
   *
   * This value is either
   * - a direct URL to the video file
   * - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).
   *
   * See the [file upload guide](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) for details.
   *
   */
  imageFilePath?: string | undefined;
  /**
   * Your video file. Required if `video_source` is `file`. This value is either
   * - a direct URL to the video file
   * - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).
   *
   * See the [file upload guide](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) for details.
   *
   */
  videoFilePath?: string | undefined;
  /**
   * Choose your video source.
   */
  videoSource: "file" | "youtube";
  /**
   * YouTube URL (required if `video_source` is `youtube`).
   */
  youtubeUrl?: string | undefined;
};

/**
 * @internal
 * V1FaceSwapCreateBodyAssets without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1FaceSwapCreateBodyAssets = {
  face_mappings?:
    | External$V1FaceSwapCreateBodyAssetsFaceMappingsItem[]
    | undefined;
  face_swap_mode?: ("all-faces" | "individual-faces") | undefined;
  image_file_path?: string | undefined;
  video_file_path?: string | undefined;
  video_source: "file" | "youtube";
  youtube_url?: string | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1FaceSwapCreateBodyAssets
 */
const SchemaIn$V1FaceSwapCreateBodyAssets: z.ZodType<
  V1FaceSwapCreateBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    face_mappings: z
      .array(Schemas$V1FaceSwapCreateBodyAssetsFaceMappingsItem.in)
      .optional(),
    face_swap_mode: z.enum(["all-faces", "individual-faces"]).optional(),
    image_file_path: z.string().optional(),
    video_file_path: z.string().optional(),
    video_source: z.enum(["file", "youtube"]),
    youtube_url: z.string().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      face_mappings: "faceMappings",
      face_swap_mode: "faceSwapMode",
      image_file_path: "imageFilePath",
      video_file_path: "videoFilePath",
      video_source: "videoSource",
      youtube_url: "youtubeUrl",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1FaceSwapCreateBodyAssets
 */
const SchemaOut$V1FaceSwapCreateBodyAssets: z.ZodType<
  External$V1FaceSwapCreateBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  V1FaceSwapCreateBodyAssets // the object to be transformed
> = z
  .object({
    faceMappings: z
      .array(Schemas$V1FaceSwapCreateBodyAssetsFaceMappingsItem.out)
      .optional(),
    faceSwapMode: z.enum(["all-faces", "individual-faces"]).optional(),
    imageFilePath: z.string().optional(),
    videoFilePath: z.string().optional(),
    videoSource: z.enum(["file", "youtube"]),
    youtubeUrl: z.string().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      faceMappings: "face_mappings",
      faceSwapMode: "face_swap_mode",
      imageFilePath: "image_file_path",
      videoFilePath: "video_file_path",
      videoSource: "video_source",
      youtubeUrl: "youtube_url",
    });
  });

export const Schemas$V1FaceSwapCreateBodyAssets = {
  in: SchemaIn$V1FaceSwapCreateBodyAssets,
  out: SchemaOut$V1FaceSwapCreateBodyAssets,
};
