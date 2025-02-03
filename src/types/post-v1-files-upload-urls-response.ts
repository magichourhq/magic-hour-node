import {
  External$PostV1FilesUploadUrlsResponseItemsItem,
  PostV1FilesUploadUrlsResponseItemsItem,
  Schemas$PostV1FilesUploadUrlsResponseItemsItem,
} from "./post-v1-files-upload-urls-response-items-item";
import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Success
 */
export type PostV1FilesUploadUrlsResponse = {
  items: PostV1FilesUploadUrlsResponseItemsItem[];
};

/**
 * @internal
 * PostV1FilesUploadUrlsResponse without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1FilesUploadUrlsResponse = {
  items: External$PostV1FilesUploadUrlsResponseItemsItem[];
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1FilesUploadUrlsResponse
 */
const SchemaIn$PostV1FilesUploadUrlsResponse: z.ZodType<
  PostV1FilesUploadUrlsResponse, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    items: z.array(Schemas$PostV1FilesUploadUrlsResponseItemsItem.in),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      items: "items",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1FilesUploadUrlsResponse
 */
const SchemaOut$PostV1FilesUploadUrlsResponse: z.ZodType<
  External$PostV1FilesUploadUrlsResponse, // output type of this zod object
  z.ZodTypeDef,
  PostV1FilesUploadUrlsResponse // the object to be transformed
> = z
  .object({
    items: z.array(Schemas$PostV1FilesUploadUrlsResponseItemsItem.out),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      items: "items",
    });
  });

export const Schemas$PostV1FilesUploadUrlsResponse = {
  in: SchemaIn$PostV1FilesUploadUrlsResponse,
  out: SchemaOut$PostV1FilesUploadUrlsResponse,
};
