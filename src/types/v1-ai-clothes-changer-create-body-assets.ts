import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * Provide the assets for clothes changer
 */
export type V1AiClothesChangerCreateBodyAssets = {
  /**
   * The image of the outfit. This value is either
   * - a direct URL to the video file
   * - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).
   *
   * Please refer to the [Input File documentation](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) to learn more.
   *
   */
  garmentFilePath: string;
  /**
   * The type of the outfit.
   */
  garmentType: "dresses" | "lower_body" | "upper_body";
  /**
   * The image with the person. This value is either
   * - a direct URL to the video file
   * - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).
   *
   * Please refer to the [Input File documentation](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) to learn more.
   *
   */
  personFilePath: string;
};

/**
 * @internal
 * V1AiClothesChangerCreateBodyAssets without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiClothesChangerCreateBodyAssets = {
  garment_file_path: string;
  garment_type: "dresses" | "lower_body" | "upper_body";
  person_file_path: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiClothesChangerCreateBodyAssets
 */
const SchemaIn$V1AiClothesChangerCreateBodyAssets: z.ZodType<
  V1AiClothesChangerCreateBodyAssets, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiClothesChangerCreateBodyAssets
 */
const SchemaOut$V1AiClothesChangerCreateBodyAssets: z.ZodType<
  External$V1AiClothesChangerCreateBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  V1AiClothesChangerCreateBodyAssets // the object to be transformed
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

export const Schemas$V1AiClothesChangerCreateBodyAssets = {
  in: SchemaIn$V1AiClothesChangerCreateBodyAssets,
  out: SchemaOut$V1AiClothesChangerCreateBodyAssets,
};
