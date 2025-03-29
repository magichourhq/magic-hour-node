import {
  External$V1FilesUploadUrlsCreateBodyItemsItem,
  Schemas$V1FilesUploadUrlsCreateBodyItemsItem,
  V1FilesUploadUrlsCreateBodyItemsItem,
} from "./v1-files-upload-urls-create-body-items-item";
import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * V1FilesUploadUrlsCreateBody
 */
export type V1FilesUploadUrlsCreateBody = {
  items: V1FilesUploadUrlsCreateBodyItemsItem[];
};

/**
 * @internal
 * V1FilesUploadUrlsCreateBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1FilesUploadUrlsCreateBody = {
  items: External$V1FilesUploadUrlsCreateBodyItemsItem[];
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1FilesUploadUrlsCreateBody
 */
const SchemaIn$V1FilesUploadUrlsCreateBody: z.ZodType<
  V1FilesUploadUrlsCreateBody, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    items: z.array(Schemas$V1FilesUploadUrlsCreateBodyItemsItem.in),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      items: "items",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1FilesUploadUrlsCreateBody
 */
const SchemaOut$V1FilesUploadUrlsCreateBody: z.ZodType<
  External$V1FilesUploadUrlsCreateBody, // output type of this zod object
  z.ZodTypeDef,
  V1FilesUploadUrlsCreateBody // the object to be transformed
> = z
  .object({
    items: z.array(Schemas$V1FilesUploadUrlsCreateBodyItemsItem.out),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      items: "items",
    });
  });

export const Schemas$V1FilesUploadUrlsCreateBody = {
  in: SchemaIn$V1FilesUploadUrlsCreateBody,
  out: SchemaOut$V1FilesUploadUrlsCreateBody,
};
