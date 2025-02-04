import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * The download url and expiration date of the image project
 */
export type V1ImageProjectsgetResponseDownloadsItem = {
  expiresAt: string;
  url: string;
};

/**
 * @internal
 * V1ImageProjectsgetResponseDownloadsItem without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1ImageProjectsgetResponseDownloadsItem = {
  expires_at: string;
  url: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1ImageProjectsgetResponseDownloadsItem
 */
const SchemaIn$V1ImageProjectsgetResponseDownloadsItem: z.ZodType<
  V1ImageProjectsgetResponseDownloadsItem, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    expires_at: z.string(),
    url: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      expires_at: "expiresAt",
      url: "url",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1ImageProjectsgetResponseDownloadsItem
 */
const SchemaOut$V1ImageProjectsgetResponseDownloadsItem: z.ZodType<
  External$V1ImageProjectsgetResponseDownloadsItem, // output type of this zod object
  z.ZodTypeDef,
  V1ImageProjectsgetResponseDownloadsItem // the object to be transformed
> = z
  .object({
    expiresAt: z.string(),
    url: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      expiresAt: "expires_at",
      url: "url",
    });
  });

export const Schemas$V1ImageProjectsgetResponseDownloadsItem = {
  in: SchemaIn$V1ImageProjectsgetResponseDownloadsItem,
  out: SchemaOut$V1ImageProjectsgetResponseDownloadsItem,
};
