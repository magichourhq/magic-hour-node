import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1FilesUploadUrlsCreateResponseItemsItem,
  Schemas$V1FilesUploadUrlsCreateResponseItemsItem,
  V1FilesUploadUrlsCreateResponseItemsItem,
} from "./v1-files-upload-urls-create-response-items-item";

/**
 * Success
 */
export type V1FilesUploadUrlsCreateResponse = {
  /**
   * The list of upload URLs and file paths for the assets. The response array will match the order of items in the request body. Refer to the [Input Files Guide](/integration/input-files) for more details.
   */
  items: V1FilesUploadUrlsCreateResponseItemsItem[];
};

/**
 * @internal
 * V1FilesUploadUrlsCreateResponse without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1FilesUploadUrlsCreateResponse = {
  items: External$V1FilesUploadUrlsCreateResponseItemsItem[];
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1FilesUploadUrlsCreateResponse
 */
const SchemaIn$V1FilesUploadUrlsCreateResponse: z.ZodType<
  V1FilesUploadUrlsCreateResponse, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    items: z.array(Schemas$V1FilesUploadUrlsCreateResponseItemsItem.in),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      items: "items",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1FilesUploadUrlsCreateResponse
 */
const SchemaOut$V1FilesUploadUrlsCreateResponse: z.ZodType<
  External$V1FilesUploadUrlsCreateResponse, // output type of this zod object
  z.ZodTypeDef,
  V1FilesUploadUrlsCreateResponse // the object to be transformed
> = z
  .object({
    items: z.array(Schemas$V1FilesUploadUrlsCreateResponseItemsItem.out),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      items: "items",
    });
  });

export const Schemas$V1FilesUploadUrlsCreateResponse = {
  in: SchemaIn$V1FilesUploadUrlsCreateResponse,
  out: SchemaOut$V1FilesUploadUrlsCreateResponse,
};
