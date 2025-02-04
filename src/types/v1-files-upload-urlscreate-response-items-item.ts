import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * V1FilesUploadUrlscreateResponseItemsItem
 */
export type V1FilesUploadUrlscreateResponseItemsItem = {
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
 * V1FilesUploadUrlscreateResponseItemsItem without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1FilesUploadUrlscreateResponseItemsItem = {
  expires_at: string;
  file_path: string;
  upload_url: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1FilesUploadUrlscreateResponseItemsItem
 */
const SchemaIn$V1FilesUploadUrlscreateResponseItemsItem: z.ZodType<
  V1FilesUploadUrlscreateResponseItemsItem, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1FilesUploadUrlscreateResponseItemsItem
 */
const SchemaOut$V1FilesUploadUrlscreateResponseItemsItem: z.ZodType<
  External$V1FilesUploadUrlscreateResponseItemsItem, // output type of this zod object
  z.ZodTypeDef,
  V1FilesUploadUrlscreateResponseItemsItem // the object to be transformed
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

export const Schemas$V1FilesUploadUrlscreateResponseItemsItem = {
  in: SchemaIn$V1FilesUploadUrlscreateResponseItemsItem,
  out: SchemaOut$V1FilesUploadUrlscreateResponseItemsItem,
};
