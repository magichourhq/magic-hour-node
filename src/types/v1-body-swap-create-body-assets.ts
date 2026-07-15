import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * Person image and scene image for body swap
 */
export type V1BodySwapCreateBodyAssets = {
  /**
   * Image of the person to place into the scene. This value is either
   * - a direct URL to the video file
   * - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).
   *
   * See the [file upload guide](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) for details.
   *
   */
  personFilePath: string;
  /**
   * Original scene image (background). This value is either
   * - a direct URL to the video file
   * - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).
   *
   * See the [file upload guide](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) for details.
   *
   */
  sceneFilePath: string;
};

/**
 * @internal
 * V1BodySwapCreateBodyAssets without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1BodySwapCreateBodyAssets = {
  person_file_path: string;
  scene_file_path: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1BodySwapCreateBodyAssets
 */
const SchemaIn$V1BodySwapCreateBodyAssets: z.ZodType<
  V1BodySwapCreateBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    person_file_path: z.string(),
    scene_file_path: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      person_file_path: "personFilePath",
      scene_file_path: "sceneFilePath",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1BodySwapCreateBodyAssets
 */
const SchemaOut$V1BodySwapCreateBodyAssets: z.ZodType<
  External$V1BodySwapCreateBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  V1BodySwapCreateBodyAssets // the object to be transformed
> = z
  .object({
    personFilePath: z.string(),
    sceneFilePath: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      personFilePath: "person_file_path",
      sceneFilePath: "scene_file_path",
    });
  });

export const Schemas$V1BodySwapCreateBodyAssets = {
  in: SchemaIn$V1BodySwapCreateBodyAssets,
  out: SchemaOut$V1BodySwapCreateBodyAssets,
};
