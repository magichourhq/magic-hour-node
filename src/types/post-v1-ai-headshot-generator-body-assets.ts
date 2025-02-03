import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Provide the assets for headshot photo
 */
export type PostV1AiHeadshotGeneratorBodyAssets = {
  /**
   * The image used to generate the headshot. This image must contain one detectable face. This is the `file_path` field from the response of the [upload urls API](/docs/api/tag/files/post/v1/files/upload-urls)
   */
  imageFilePath: string;
};

/**
 * @internal
 * PostV1AiHeadshotGeneratorBodyAssets without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1AiHeadshotGeneratorBodyAssets = {
  image_file_path: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1AiHeadshotGeneratorBodyAssets
 */
const SchemaIn$PostV1AiHeadshotGeneratorBodyAssets: z.ZodType<
  PostV1AiHeadshotGeneratorBodyAssets, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1AiHeadshotGeneratorBodyAssets
 */
const SchemaOut$PostV1AiHeadshotGeneratorBodyAssets: z.ZodType<
  External$PostV1AiHeadshotGeneratorBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  PostV1AiHeadshotGeneratorBodyAssets // the object to be transformed
> = z
  .object({
    imageFilePath: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      imageFilePath: "image_file_path",
    });
  });

export const Schemas$PostV1AiHeadshotGeneratorBodyAssets = {
  in: SchemaIn$PostV1AiHeadshotGeneratorBodyAssets,
  out: SchemaOut$PostV1AiHeadshotGeneratorBodyAssets,
};
