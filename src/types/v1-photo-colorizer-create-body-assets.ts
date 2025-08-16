import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Provide the assets for photo colorization
 */
export type V1PhotoColorizerCreateBodyAssets = {
  /**
   * The image used to generate the colorized image. This value is either
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
 * V1PhotoColorizerCreateBodyAssets without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1PhotoColorizerCreateBodyAssets = {
  image_file_path: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1PhotoColorizerCreateBodyAssets
 */
const SchemaIn$V1PhotoColorizerCreateBodyAssets: z.ZodType<
  V1PhotoColorizerCreateBodyAssets, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1PhotoColorizerCreateBodyAssets
 */
const SchemaOut$V1PhotoColorizerCreateBodyAssets: z.ZodType<
  External$V1PhotoColorizerCreateBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  V1PhotoColorizerCreateBodyAssets // the object to be transformed
> = z
  .object({
    imageFilePath: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      imageFilePath: "image_file_path",
    });
  });

export const Schemas$V1PhotoColorizerCreateBodyAssets = {
  in: SchemaIn$V1PhotoColorizerCreateBodyAssets,
  out: SchemaOut$V1PhotoColorizerCreateBodyAssets,
};
