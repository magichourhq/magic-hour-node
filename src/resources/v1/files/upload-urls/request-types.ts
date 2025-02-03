import { zodTransform } from "magic-hour/core";
import {
  External$PostV1FilesUploadUrlsBodyItemsItem,
  PostV1FilesUploadUrlsBodyItemsItem,
  Schemas$PostV1FilesUploadUrlsBodyItemsItem,
} from "magic-hour/types/post-v1-files-upload-urls-body-items-item";
import * as z from "zod";

/**
 * CreateRequest
 */
export type CreateRequest = {
  items: PostV1FilesUploadUrlsBodyItemsItem[];
};

/**
 * @internal
 * CreateRequest without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$CreateRequest = {
  items: External$PostV1FilesUploadUrlsBodyItemsItem[];
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object CreateRequest
 */
const SchemaIn$CreateRequest: z.ZodType<
  CreateRequest, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$CreateRequest
 */
const SchemaOut$CreateRequest: z.ZodType<
  External$CreateRequest, // output type of this zod object
  z.ZodTypeDef,
  CreateRequest // the object to be transformed
> = z
  .object({
    items: z.array(Schemas$PostV1FilesUploadUrlsBodyItemsItem.out),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      items: "items",
    });
  });

export const Schemas$CreateRequest = {
  in: SchemaIn$CreateRequest,
  out: SchemaOut$CreateRequest,
};
