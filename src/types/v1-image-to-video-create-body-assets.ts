import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Provide the assets for image-to-video.
 */
export type V1ImageToVideoCreateBodyAssets = {
  /**
   * The path of the image file. This value can be either the `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls), or the url of the file.
   */
  imageFilePath: string;
};

/**
 * @internal
 * V1ImageToVideoCreateBodyAssets without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1ImageToVideoCreateBodyAssets = {
  image_file_path: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1ImageToVideoCreateBodyAssets
 */
const SchemaIn$V1ImageToVideoCreateBodyAssets: z.ZodType<
  V1ImageToVideoCreateBodyAssets, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1ImageToVideoCreateBodyAssets
 */
const SchemaOut$V1ImageToVideoCreateBodyAssets: z.ZodType<
  External$V1ImageToVideoCreateBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  V1ImageToVideoCreateBodyAssets // the object to be transformed
> = z
  .object({
    imageFilePath: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      imageFilePath: "image_file_path",
    });
  });

export const Schemas$V1ImageToVideoCreateBodyAssets = {
  in: SchemaIn$V1ImageToVideoCreateBodyAssets,
  out: SchemaOut$V1ImageToVideoCreateBodyAssets,
};
