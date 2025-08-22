import * as z from "zod";

import { zodTransform } from "magic-hour/core";

/**
 * V1FilesUploadUrlsCreateResponseItemsItem
 */
export type V1FilesUploadUrlsCreateResponseItemsItem = {
  /**
   * when the upload url expires, and will need to request a new one.
   */
  expiresAt: string;
  /**
   * this value is used in APIs that needs assets, such as image_file_path, video_file_path, and audio_file_path
   */
  filePath: string;
  /**
   * Used to upload the file to storage, send a PUT request with the file as data to upload.
   */
  uploadUrl: string;
};

/**
 * @internal
 * V1FilesUploadUrlsCreateResponseItemsItem without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1FilesUploadUrlsCreateResponseItemsItem = {
  expires_at: string;
  file_path: string;
  upload_url: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1FilesUploadUrlsCreateResponseItemsItem
 */
const SchemaIn$V1FilesUploadUrlsCreateResponseItemsItem: z.ZodType<
  V1FilesUploadUrlsCreateResponseItemsItem, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    expires_at: z.string(),
    file_path: z.string(),
    upload_url: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      expires_at: "expiresAt",
      file_path: "filePath",
      upload_url: "uploadUrl",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1FilesUploadUrlsCreateResponseItemsItem
 */
const SchemaOut$V1FilesUploadUrlsCreateResponseItemsItem: z.ZodType<
  External$V1FilesUploadUrlsCreateResponseItemsItem, // output type of this zod object
  z.ZodTypeDef,
  V1FilesUploadUrlsCreateResponseItemsItem // the object to be transformed
> = z
  .object({
    expiresAt: z.string(),
    filePath: z.string(),
    uploadUrl: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      expiresAt: "expires_at",
      filePath: "file_path",
      uploadUrl: "upload_url",
    });
  });

export const Schemas$V1FilesUploadUrlsCreateResponseItemsItem = {
  in: SchemaIn$V1FilesUploadUrlsCreateResponseItemsItem,
  out: SchemaOut$V1FilesUploadUrlsCreateResponseItemsItem,
};
