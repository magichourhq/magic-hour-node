import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Provide the assets for background removal
 */
export type V1ImageBackgroundRemoverCreateBodyAssets = {
  /**
   * The image used as the new background for the image_file_path. This image will be resized to match the image in image_file_path. Please make sure the resolution between the images are similar.
   *
   * This value is either
   * - a direct URL to the video file
   * - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).
   *
   * Please refer to the [Input File documentation](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) to learn more.
   *
   */
  backgroundImageFilePath?: string | undefined;
  /**
   * The image to remove the background. This value is either
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
 * V1ImageBackgroundRemoverCreateBodyAssets without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1ImageBackgroundRemoverCreateBodyAssets = {
  background_image_file_path?: string | undefined;
  image_file_path: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1ImageBackgroundRemoverCreateBodyAssets
 */
const SchemaIn$V1ImageBackgroundRemoverCreateBodyAssets: z.ZodType<
  V1ImageBackgroundRemoverCreateBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    background_image_file_path: z.string().optional(),
    image_file_path: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      background_image_file_path: "backgroundImageFilePath",
      image_file_path: "imageFilePath",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1ImageBackgroundRemoverCreateBodyAssets
 */
const SchemaOut$V1ImageBackgroundRemoverCreateBodyAssets: z.ZodType<
  External$V1ImageBackgroundRemoverCreateBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  V1ImageBackgroundRemoverCreateBodyAssets // the object to be transformed
> = z
  .object({
    backgroundImageFilePath: z.string().optional(),
    imageFilePath: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      backgroundImageFilePath: "background_image_file_path",
      imageFilePath: "image_file_path",
    });
  });

export const Schemas$V1ImageBackgroundRemoverCreateBodyAssets = {
  in: SchemaIn$V1ImageBackgroundRemoverCreateBodyAssets,
  out: SchemaOut$V1ImageBackgroundRemoverCreateBodyAssets,
};
