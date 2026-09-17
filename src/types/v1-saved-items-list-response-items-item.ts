import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1SavedItemsListResponseItemsItemAssetsItem,
  Schemas$V1SavedItemsListResponseItemsItemAssetsItem,
  V1SavedItemsListResponseItemsItemAssetsItem,
} from "./v1-saved-items-list-response-items-item-assets-item";

/**
 * V1SavedItemsListResponseItemsItem
 */
export type V1SavedItemsListResponseItemsItem = {
  assets: V1SavedItemsListResponseItemsItemAssetsItem[];
  /**
   * Unique ID of the saved item.
   */
  id: string;
  /**
   * User-provided name of the saved item.
   */
  name: string | null;
  /**
   * Saved item type.
   */
  type: "brand_kit" | "character" | "moodboard" | "reference" | "voice";
};

/**
 * @internal
 * V1SavedItemsListResponseItemsItem without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1SavedItemsListResponseItemsItem = {
  assets: External$V1SavedItemsListResponseItemsItemAssetsItem[];
  id: string;
  name: string | null;
  type: "brand_kit" | "character" | "moodboard" | "reference" | "voice";
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1SavedItemsListResponseItemsItem
 */
const SchemaIn$V1SavedItemsListResponseItemsItem: z.ZodType<
  V1SavedItemsListResponseItemsItem, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    assets: z.array(Schemas$V1SavedItemsListResponseItemsItemAssetsItem.in),
    id: z.string(),
    name: z.string().nullable(),
    type: z.enum(["brand_kit", "character", "moodboard", "reference", "voice"]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      id: "id",
      name: "name",
      type: "type",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1SavedItemsListResponseItemsItem
 */
const SchemaOut$V1SavedItemsListResponseItemsItem: z.ZodType<
  External$V1SavedItemsListResponseItemsItem, // output type of this zod object
  z.ZodTypeDef,
  V1SavedItemsListResponseItemsItem // the object to be transformed
> = z
  .object({
    assets: z.array(Schemas$V1SavedItemsListResponseItemsItemAssetsItem.out),
    id: z.string(),
    name: z.string().nullable(),
    type: z.enum(["brand_kit", "character", "moodboard", "reference", "voice"]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      id: "id",
      name: "name",
      type: "type",
    });
  });

export const Schemas$V1SavedItemsListResponseItemsItem = {
  in: SchemaIn$V1SavedItemsListResponseItemsItem,
  out: SchemaOut$V1SavedItemsListResponseItemsItem,
};
