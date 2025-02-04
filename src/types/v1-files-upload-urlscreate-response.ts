import {
  External$V1FilesUploadUrlscreateResponseItemsItem,
  Schemas$V1FilesUploadUrlscreateResponseItemsItem,
  V1FilesUploadUrlscreateResponseItemsItem,
} from "./v1-files-upload-urlscreate-response-items-item";
import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Success
 */
export type V1FilesUploadUrlscreateResponse = {
  items: V1FilesUploadUrlscreateResponseItemsItem[];
};

/**
 * @internal
 * V1FilesUploadUrlscreateResponse without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1FilesUploadUrlscreateResponse = {
  items: External$V1FilesUploadUrlscreateResponseItemsItem[];
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1FilesUploadUrlscreateResponse
 */
const SchemaIn$V1FilesUploadUrlscreateResponse: z.ZodType<
  V1FilesUploadUrlscreateResponse, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    items: z.array(Schemas$V1FilesUploadUrlscreateResponseItemsItem.in),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      items: "items",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1FilesUploadUrlscreateResponse
 */
const SchemaOut$V1FilesUploadUrlscreateResponse: z.ZodType<
  External$V1FilesUploadUrlscreateResponse, // output type of this zod object
  z.ZodTypeDef,
  V1FilesUploadUrlscreateResponse // the object to be transformed
> = z
  .object({
    items: z.array(Schemas$V1FilesUploadUrlscreateResponseItemsItem.out),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      items: "items",
    });
  });

export const Schemas$V1FilesUploadUrlscreateResponse = {
  in: SchemaIn$V1FilesUploadUrlscreateResponse,
  out: SchemaOut$V1FilesUploadUrlscreateResponse,
};
