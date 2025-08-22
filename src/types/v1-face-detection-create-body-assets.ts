import * as z from "zod";

import { zodTransform } from "magic-hour/core";

/**
 * Provide the assets for face detection
 */
export type V1FaceDetectionCreateBodyAssets = {
  /**
   * This is the image or video where the face will be detected. This value is either
   * - a direct URL to the video file
   * - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).
   *
   * Please refer to the [Input File documentation](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) to learn more.
   *
   */
  targetFilePath: string;
};

/**
 * @internal
 * V1FaceDetectionCreateBodyAssets without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1FaceDetectionCreateBodyAssets = {
  target_file_path: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1FaceDetectionCreateBodyAssets
 */
const SchemaIn$V1FaceDetectionCreateBodyAssets: z.ZodType<
  V1FaceDetectionCreateBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    target_file_path: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      target_file_path: "targetFilePath",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1FaceDetectionCreateBodyAssets
 */
const SchemaOut$V1FaceDetectionCreateBodyAssets: z.ZodType<
  External$V1FaceDetectionCreateBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  V1FaceDetectionCreateBodyAssets // the object to be transformed
> = z
  .object({
    targetFilePath: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      targetFilePath: "target_file_path",
    });
  });

export const Schemas$V1FaceDetectionCreateBodyAssets = {
  in: SchemaIn$V1FaceDetectionCreateBodyAssets,
  out: SchemaOut$V1FaceDetectionCreateBodyAssets,
};
