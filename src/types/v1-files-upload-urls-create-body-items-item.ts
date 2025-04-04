import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * V1FilesUploadUrlsCreateBodyItemsItem
 */
export type V1FilesUploadUrlsCreateBodyItemsItem = {
  /**
   * the extension of the file to upload. Do not include the dot (.) before the extension.
   */
  extension: string;
  /**
   * The type of asset to upload
   */
  type: "audio" | "image" | "video";
};

/**
 * @internal
 * V1FilesUploadUrlsCreateBodyItemsItem without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1FilesUploadUrlsCreateBodyItemsItem = {
  extension: string;
  type: "audio" | "image" | "video";
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1FilesUploadUrlsCreateBodyItemsItem
 */
const SchemaIn$V1FilesUploadUrlsCreateBodyItemsItem: z.ZodType<
  V1FilesUploadUrlsCreateBodyItemsItem, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    extension: z.string(),
    type: z.enum(["audio", "image", "video"]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      extension: "extension",
      type: "type",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1FilesUploadUrlsCreateBodyItemsItem
 */
const SchemaOut$V1FilesUploadUrlsCreateBodyItemsItem: z.ZodType<
  External$V1FilesUploadUrlsCreateBodyItemsItem, // output type of this zod object
  z.ZodTypeDef,
  V1FilesUploadUrlsCreateBodyItemsItem // the object to be transformed
> = z
  .object({
    extension: z.string(),
    type: z.enum(["audio", "image", "video"]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      extension: "extension",
      type: "type",
    });
  });

export const Schemas$V1FilesUploadUrlsCreateBodyItemsItem = {
  in: SchemaIn$V1FilesUploadUrlsCreateBodyItemsItem,
  out: SchemaOut$V1FilesUploadUrlsCreateBodyItemsItem,
};
