import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Provide the assets for clothes changer
 */
export type PostV1AiClothesChangerBodyAssets = {
  /**
   * The image of the outfit. This value can be either the `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls), or the url of the file..
   */
  garmentFilePath: string;
  garmentType: "dresses" | "lower_body" | "upper_body";
  /**
   * The image with the person. This value can be either the `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls), or the url of the file..
   */
  personFilePath: string;
};

/**
 * @internal
 * PostV1AiClothesChangerBodyAssets without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1AiClothesChangerBodyAssets = {
  garment_file_path: string;
  garment_type: "dresses" | "lower_body" | "upper_body";
  person_file_path: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1AiClothesChangerBodyAssets
 */
const SchemaIn$PostV1AiClothesChangerBodyAssets: z.ZodType<
  PostV1AiClothesChangerBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    garment_file_path: z.string(),
    garment_type: z.enum(["dresses", "lower_body", "upper_body"]),
    person_file_path: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      garment_file_path: "garmentFilePath",
      garment_type: "garmentType",
      person_file_path: "personFilePath",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1AiClothesChangerBodyAssets
 */
const SchemaOut$PostV1AiClothesChangerBodyAssets: z.ZodType<
  External$PostV1AiClothesChangerBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  PostV1AiClothesChangerBodyAssets // the object to be transformed
> = z
  .object({
    garmentFilePath: z.string(),
    garmentType: z.enum(["dresses", "lower_body", "upper_body"]),
    personFilePath: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      garmentFilePath: "garment_file_path",
      garmentType: "garment_type",
      personFilePath: "person_file_path",
    });
  });

export const Schemas$PostV1AiClothesChangerBodyAssets = {
  in: SchemaIn$PostV1AiClothesChangerBodyAssets,
  out: SchemaOut$PostV1AiClothesChangerBodyAssets,
};
