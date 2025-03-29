import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * The download url and expiration date of the image project
 */
export type V1ImageProjectsGetResponseDownloadsItem = {
  expiresAt: string;
  url: string;
};

/**
 * @internal
 * V1ImageProjectsGetResponseDownloadsItem without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1ImageProjectsGetResponseDownloadsItem = {
  expires_at: string;
  url: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1ImageProjectsGetResponseDownloadsItem
 */
const SchemaIn$V1ImageProjectsGetResponseDownloadsItem: z.ZodType<
  V1ImageProjectsGetResponseDownloadsItem, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1ImageProjectsGetResponseDownloadsItem
 */
const SchemaOut$V1ImageProjectsGetResponseDownloadsItem: z.ZodType<
  External$V1ImageProjectsGetResponseDownloadsItem, // output type of this zod object
  z.ZodTypeDef,
  V1ImageProjectsGetResponseDownloadsItem // the object to be transformed
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

export const Schemas$V1ImageProjectsGetResponseDownloadsItem = {
  in: SchemaIn$V1ImageProjectsGetResponseDownloadsItem,
  out: SchemaOut$V1ImageProjectsGetResponseDownloadsItem,
};
