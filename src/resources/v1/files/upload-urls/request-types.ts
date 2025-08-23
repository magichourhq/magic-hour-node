import * as z from "zod";

import { zodTransform } from "magic-hour/core";
import {
  External$V1FilesUploadUrlsCreateBodyItemsItem,
  Schemas$V1FilesUploadUrlsCreateBodyItemsItem,
  V1FilesUploadUrlsCreateBodyItemsItem,
} from "magic-hour/types/v1-files-upload-urls-create-body-items-item";

/**
 * CreateRequest
 */
export type CreateRequest = {
  /**
   * The list of assets to upload. The response array will match the order of items in the request body.
   */
  items: V1FilesUploadUrlsCreateBodyItemsItem[];
};

/**
 * @internal
 * CreateRequest without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$CreateRequest = {
  items: External$V1FilesUploadUrlsCreateBodyItemsItem[];
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
    items: z.array(Schemas$V1FilesUploadUrlsCreateBodyItemsItem.in),
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
    items: z.array(Schemas$V1FilesUploadUrlsCreateBodyItemsItem.out),
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
