import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * Provide the body and head images for head swap
 */
export type V1HeadSwapCreateBodyAssets = {
  /**
   * Image that receives the swapped head. This value is either
   * - a direct URL to the video file
   * - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).
   *
   * See the [file upload guide](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) for details.
   *
   */
  bodyFilePath: string;
  /**
   * Image of the head to place on the body. This value is either
   * - a direct URL to the video file
   * - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).
   *
   * See the [file upload guide](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) for details.
   *
   */
  headFilePath: string;
};

/**
 * @internal
 * V1HeadSwapCreateBodyAssets without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1HeadSwapCreateBodyAssets = {
  body_file_path: string;
  head_file_path: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1HeadSwapCreateBodyAssets
 */
const SchemaIn$V1HeadSwapCreateBodyAssets: z.ZodType<
  V1HeadSwapCreateBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    body_file_path: z.string(),
    head_file_path: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      body_file_path: "bodyFilePath",
      head_file_path: "headFilePath",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1HeadSwapCreateBodyAssets
 */
const SchemaOut$V1HeadSwapCreateBodyAssets: z.ZodType<
  External$V1HeadSwapCreateBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  V1HeadSwapCreateBodyAssets // the object to be transformed
> = z
  .object({
    bodyFilePath: z.string(),
    headFilePath: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      bodyFilePath: "body_file_path",
      headFilePath: "head_file_path",
    });
  });

export const Schemas$V1HeadSwapCreateBodyAssets = {
  in: SchemaIn$V1HeadSwapCreateBodyAssets,
  out: SchemaOut$V1HeadSwapCreateBodyAssets,
};
