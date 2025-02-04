import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * The download url and expiration date of the image project
 */
export type V1VideoProjectsgetResponseDownloadsItem = {
  expiresAt: string;
  url: string;
};

/**
 * @internal
 * V1VideoProjectsgetResponseDownloadsItem without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1VideoProjectsgetResponseDownloadsItem = {
  expires_at: string;
  url: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1VideoProjectsgetResponseDownloadsItem
 */
const SchemaIn$V1VideoProjectsgetResponseDownloadsItem: z.ZodType<
  V1VideoProjectsgetResponseDownloadsItem, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1VideoProjectsgetResponseDownloadsItem
 */
const SchemaOut$V1VideoProjectsgetResponseDownloadsItem: z.ZodType<
  External$V1VideoProjectsgetResponseDownloadsItem, // output type of this zod object
  z.ZodTypeDef,
  V1VideoProjectsgetResponseDownloadsItem // the object to be transformed
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

export const Schemas$V1VideoProjectsgetResponseDownloadsItem = {
  in: SchemaIn$V1VideoProjectsgetResponseDownloadsItem,
  out: SchemaOut$V1VideoProjectsgetResponseDownloadsItem,
};
