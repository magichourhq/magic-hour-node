import * as z from "zod";

import { zodTransform } from "magic-hour/core";

/**
 * The download url and expiration date of the image project
 */
export type V1VideoProjectsGetResponseDownloadsItem = {
  expiresAt: string;
  url: string;
};

/**
 * @internal
 * V1VideoProjectsGetResponseDownloadsItem without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1VideoProjectsGetResponseDownloadsItem = {
  expires_at: string;
  url: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1VideoProjectsGetResponseDownloadsItem
 */
const SchemaIn$V1VideoProjectsGetResponseDownloadsItem: z.ZodType<
  V1VideoProjectsGetResponseDownloadsItem, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1VideoProjectsGetResponseDownloadsItem
 */
const SchemaOut$V1VideoProjectsGetResponseDownloadsItem: z.ZodType<
  External$V1VideoProjectsGetResponseDownloadsItem, // output type of this zod object
  z.ZodTypeDef,
  V1VideoProjectsGetResponseDownloadsItem // the object to be transformed
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

export const Schemas$V1VideoProjectsGetResponseDownloadsItem = {
  in: SchemaIn$V1VideoProjectsGetResponseDownloadsItem,
  out: SchemaOut$V1VideoProjectsGetResponseDownloadsItem,
};
