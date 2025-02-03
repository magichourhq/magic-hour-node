import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * PostV1FilesUploadUrlsBodyItemsItem
 */
export type PostV1FilesUploadUrlsBodyItemsItem = {
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
 * PostV1FilesUploadUrlsBodyItemsItem without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1FilesUploadUrlsBodyItemsItem = {
  extension: string;
  type: "audio" | "image" | "video";
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1FilesUploadUrlsBodyItemsItem
 */
const SchemaIn$PostV1FilesUploadUrlsBodyItemsItem: z.ZodType<
  PostV1FilesUploadUrlsBodyItemsItem, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1FilesUploadUrlsBodyItemsItem
 */
const SchemaOut$PostV1FilesUploadUrlsBodyItemsItem: z.ZodType<
  External$PostV1FilesUploadUrlsBodyItemsItem, // output type of this zod object
  z.ZodTypeDef,
  PostV1FilesUploadUrlsBodyItemsItem // the object to be transformed
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

export const Schemas$PostV1FilesUploadUrlsBodyItemsItem = {
  in: SchemaIn$PostV1FilesUploadUrlsBodyItemsItem,
  out: SchemaOut$PostV1FilesUploadUrlsBodyItemsItem,
};
