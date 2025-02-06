import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Provide the assets for upscaling
 */
export type PostV1AiImageUpscalerBodyAssets = {
  /**
   * The image to upscale. This value can be either the `file_path` field from the response of the [upload urls API](/docs/api/tag/files/post/v1/files/upload-urls), or the url of the file.
   */
  imageFilePath: string;
};

/**
 * @internal
 * PostV1AiImageUpscalerBodyAssets without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1AiImageUpscalerBodyAssets = {
  image_file_path: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1AiImageUpscalerBodyAssets
 */
const SchemaIn$PostV1AiImageUpscalerBodyAssets: z.ZodType<
  PostV1AiImageUpscalerBodyAssets, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1AiImageUpscalerBodyAssets
 */
const SchemaOut$PostV1AiImageUpscalerBodyAssets: z.ZodType<
  External$PostV1AiImageUpscalerBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  PostV1AiImageUpscalerBodyAssets // the object to be transformed
> = z
  .object({
    imageFilePath: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      imageFilePath: "image_file_path",
    });
  });

export const Schemas$PostV1AiImageUpscalerBodyAssets = {
  in: SchemaIn$PostV1AiImageUpscalerBodyAssets,
  out: SchemaOut$PostV1AiImageUpscalerBodyAssets,
};
