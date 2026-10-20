import { zodRequiredAny, zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * V1AiUgcAdCreateBodyAssets
 */
export type V1AiUgcAdCreateBodyAssets = {
  /**
   * Prepared image to animate. This value is either
   * - a direct URL to the video file
   * - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).
   *
   * See the [file upload guide](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) for details.
   *
   */
  imageFilePath: string;

  // Index types must also accommodate all defined properties if present (typescript limitation)
  // In reality all additional properties should only have type `any`
  // (there might be some duplication here)
  [additionalProperty: string]: string | any | null | undefined;
};

/**
 * @internal
 * V1AiUgcAdCreateBodyAssets without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiUgcAdCreateBodyAssets = {
  image_file_path: string;

  [additionalProperty: string]:
    | string
    | External$V1AiUgcAdCreateBodyAssets
    | null
    | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiUgcAdCreateBodyAssets
 */
const SchemaIn$V1AiUgcAdCreateBodyAssets: z.ZodType<
  V1AiUgcAdCreateBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    image_file_path: z.string(),
  })
  .catchall(zodRequiredAny)
  .transform((obj) => {
    return zodTransform(obj, {
      image_file_path: "imageFilePath",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiUgcAdCreateBodyAssets
 */
const SchemaOut$V1AiUgcAdCreateBodyAssets: z.ZodType<
  External$V1AiUgcAdCreateBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  V1AiUgcAdCreateBodyAssets // the object to be transformed
> = z
  .object({
    imageFilePath: z.string(),
  })
  .catchall(zodRequiredAny)
  .transform((obj) => {
    return zodTransform(obj, {
      imageFilePath: "image_file_path",
    });
  });

export const Schemas$V1AiUgcAdCreateBodyAssets = {
  in: SchemaIn$V1AiUgcAdCreateBodyAssets,
  out: SchemaOut$V1AiUgcAdCreateBodyAssets,
};
