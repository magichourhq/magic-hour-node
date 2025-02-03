import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * The download url and expiration date of the image project
 */
export type GetV1ImageProjectsIdResponseDownloadsItem = {
  expiresAt: string;
  url: string;
};

/**
 * @internal
 * GetV1ImageProjectsIdResponseDownloadsItem without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$GetV1ImageProjectsIdResponseDownloadsItem = {
  expires_at: string;
  url: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object GetV1ImageProjectsIdResponseDownloadsItem
 */
const SchemaIn$GetV1ImageProjectsIdResponseDownloadsItem: z.ZodType<
  GetV1ImageProjectsIdResponseDownloadsItem, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$GetV1ImageProjectsIdResponseDownloadsItem
 */
const SchemaOut$GetV1ImageProjectsIdResponseDownloadsItem: z.ZodType<
  External$GetV1ImageProjectsIdResponseDownloadsItem, // output type of this zod object
  z.ZodTypeDef,
  GetV1ImageProjectsIdResponseDownloadsItem // the object to be transformed
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

export const Schemas$GetV1ImageProjectsIdResponseDownloadsItem = {
  in: SchemaIn$GetV1ImageProjectsIdResponseDownloadsItem,
  out: SchemaOut$GetV1ImageProjectsIdResponseDownloadsItem,
};
