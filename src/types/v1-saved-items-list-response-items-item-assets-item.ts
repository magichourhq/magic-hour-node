import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * V1SavedItemsListResponseItemsItemAssetsItem
 */
export type V1SavedItemsListResponseItemsItemAssetsItem = {
  /**
   * Durable asset path. Pass it to a compatible API asset field without uploading it again.
   */
  filePath: string;
  /**
   * Whether this asset is the saved item's primary asset.
   */
  isPrimary: boolean;
  /**
   * Media type of the asset.
   */
  mediaKind: "AUDIO" | "IMAGE" | "VIDEO";
  /**
   * Signed URL for previewing or downloading the asset. Expires after 24 hours.
   */
  url: string;
  /**
   * When the signed URL expires. The saved asset and file_path do not expire.
   */
  urlExpiresAt: string;
};

/**
 * @internal
 * V1SavedItemsListResponseItemsItemAssetsItem without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1SavedItemsListResponseItemsItemAssetsItem = {
  file_path: string;
  is_primary: boolean;
  media_kind: "AUDIO" | "IMAGE" | "VIDEO";
  url: string;
  url_expires_at: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1SavedItemsListResponseItemsItemAssetsItem
 */
const SchemaIn$V1SavedItemsListResponseItemsItemAssetsItem: z.ZodType<
  V1SavedItemsListResponseItemsItemAssetsItem, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    file_path: z.string(),
    is_primary: z.boolean(),
    media_kind: z.enum(["AUDIO", "IMAGE", "VIDEO"]),
    url: z.string(),
    url_expires_at: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      file_path: "filePath",
      is_primary: "isPrimary",
      media_kind: "mediaKind",
      url: "url",
      url_expires_at: "urlExpiresAt",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1SavedItemsListResponseItemsItemAssetsItem
 */
const SchemaOut$V1SavedItemsListResponseItemsItemAssetsItem: z.ZodType<
  External$V1SavedItemsListResponseItemsItemAssetsItem, // output type of this zod object
  z.ZodTypeDef,
  V1SavedItemsListResponseItemsItemAssetsItem // the object to be transformed
> = z
  .object({
    filePath: z.string(),
    isPrimary: z.boolean(),
    mediaKind: z.enum(["AUDIO", "IMAGE", "VIDEO"]),
    url: z.string(),
    urlExpiresAt: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      filePath: "file_path",
      isPrimary: "is_primary",
      mediaKind: "media_kind",
      url: "url",
      urlExpiresAt: "url_expires_at",
    });
  });

export const Schemas$V1SavedItemsListResponseItemsItemAssetsItem = {
  in: SchemaIn$V1SavedItemsListResponseItemsItemAssetsItem,
  out: SchemaOut$V1SavedItemsListResponseItemsItemAssetsItem,
};
