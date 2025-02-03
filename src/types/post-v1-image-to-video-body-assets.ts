import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Provide the assets for image-to-video.
 */
export type PostV1ImageToVideoBodyAssets = {
  /**
   * The path of the image file. This is the `file_path` field from the response of the [upload urls API](/docs/api/tag/files/post/v1/files/upload-urls)
   */
  imageFilePath: string;
};

/**
 * @internal
 * PostV1ImageToVideoBodyAssets without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1ImageToVideoBodyAssets = {
  image_file_path: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1ImageToVideoBodyAssets
 */
const SchemaIn$PostV1ImageToVideoBodyAssets: z.ZodType<
  PostV1ImageToVideoBodyAssets, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1ImageToVideoBodyAssets
 */
const SchemaOut$PostV1ImageToVideoBodyAssets: z.ZodType<
  External$PostV1ImageToVideoBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  PostV1ImageToVideoBodyAssets // the object to be transformed
> = z
  .object({
    imageFilePath: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      imageFilePath: "image_file_path",
    });
  });

export const Schemas$PostV1ImageToVideoBodyAssets = {
  in: SchemaIn$PostV1ImageToVideoBodyAssets,
  out: SchemaOut$PostV1ImageToVideoBodyAssets,
};
