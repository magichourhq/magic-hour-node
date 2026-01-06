import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * Provide the assets for headshot photo
 */
export type V1AiHeadshotGeneratorCreateBodyAssets = {
  /**
   * The image used to generate the headshot. This image must contain one detectable face. This value is either
   * - a direct URL to the video file
   * - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).
   *
   * See the [file upload guide](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) for details.
   *
   */
  imageFilePath: string;
};

/**
 * @internal
 * V1AiHeadshotGeneratorCreateBodyAssets without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiHeadshotGeneratorCreateBodyAssets = {
  image_file_path: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiHeadshotGeneratorCreateBodyAssets
 */
const SchemaIn$V1AiHeadshotGeneratorCreateBodyAssets: z.ZodType<
  V1AiHeadshotGeneratorCreateBodyAssets, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiHeadshotGeneratorCreateBodyAssets
 */
const SchemaOut$V1AiHeadshotGeneratorCreateBodyAssets: z.ZodType<
  External$V1AiHeadshotGeneratorCreateBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  V1AiHeadshotGeneratorCreateBodyAssets // the object to be transformed
> = z
  .object({
    imageFilePath: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      imageFilePath: "image_file_path",
    });
  });

export const Schemas$V1AiHeadshotGeneratorCreateBodyAssets = {
  in: SchemaIn$V1AiHeadshotGeneratorCreateBodyAssets,
  out: SchemaOut$V1AiHeadshotGeneratorCreateBodyAssets,
};
