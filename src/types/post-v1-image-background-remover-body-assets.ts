import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Provide the assets for background removal
 */
export type PostV1ImageBackgroundRemoverBodyAssets = {
  /**
   * The image used to generate the image. This value can be either the `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls), or the url of the file.
   */
  imageFilePath: string;
};

/**
 * @internal
 * PostV1ImageBackgroundRemoverBodyAssets without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1ImageBackgroundRemoverBodyAssets = {
  image_file_path: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1ImageBackgroundRemoverBodyAssets
 */
const SchemaIn$PostV1ImageBackgroundRemoverBodyAssets: z.ZodType<
  PostV1ImageBackgroundRemoverBodyAssets, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1ImageBackgroundRemoverBodyAssets
 */
const SchemaOut$PostV1ImageBackgroundRemoverBodyAssets: z.ZodType<
  External$PostV1ImageBackgroundRemoverBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  PostV1ImageBackgroundRemoverBodyAssets // the object to be transformed
> = z
  .object({
    imageFilePath: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      imageFilePath: "image_file_path",
    });
  });

export const Schemas$PostV1ImageBackgroundRemoverBodyAssets = {
  in: SchemaIn$PostV1ImageBackgroundRemoverBodyAssets,
  out: SchemaOut$PostV1ImageBackgroundRemoverBodyAssets,
};
