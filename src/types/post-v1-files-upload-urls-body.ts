import {
  External$PostV1FilesUploadUrlsBodyItemsItem,
  PostV1FilesUploadUrlsBodyItemsItem,
  Schemas$PostV1FilesUploadUrlsBodyItemsItem,
} from "./post-v1-files-upload-urls-body-items-item";
import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * PostV1FilesUploadUrlsBody
 */
export type PostV1FilesUploadUrlsBody = {
  items: PostV1FilesUploadUrlsBodyItemsItem[];
};

/**
 * @internal
 * PostV1FilesUploadUrlsBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1FilesUploadUrlsBody = {
  items: External$PostV1FilesUploadUrlsBodyItemsItem[];
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1FilesUploadUrlsBody
 */
const SchemaIn$PostV1FilesUploadUrlsBody: z.ZodType<
  PostV1FilesUploadUrlsBody, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    items: z.array(Schemas$PostV1FilesUploadUrlsBodyItemsItem.in),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      items: "items",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1FilesUploadUrlsBody
 */
const SchemaOut$PostV1FilesUploadUrlsBody: z.ZodType<
  External$PostV1FilesUploadUrlsBody, // output type of this zod object
  z.ZodTypeDef,
  PostV1FilesUploadUrlsBody // the object to be transformed
> = z
  .object({
    items: z.array(Schemas$PostV1FilesUploadUrlsBodyItemsItem.out),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      items: "items",
    });
  });

export const Schemas$PostV1FilesUploadUrlsBody = {
  in: SchemaIn$PostV1FilesUploadUrlsBody,
  out: SchemaOut$PostV1FilesUploadUrlsBody,
};
