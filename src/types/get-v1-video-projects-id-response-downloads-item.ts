import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * The download url and expiration date of the image project
 */
export type GetV1VideoProjectsIdResponseDownloadsItem = {
  expiresAt: string;
  url: string;
};

/**
 * @internal
 * GetV1VideoProjectsIdResponseDownloadsItem without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$GetV1VideoProjectsIdResponseDownloadsItem = {
  expires_at: string;
  url: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object GetV1VideoProjectsIdResponseDownloadsItem
 */
const SchemaIn$GetV1VideoProjectsIdResponseDownloadsItem: z.ZodType<
  GetV1VideoProjectsIdResponseDownloadsItem, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$GetV1VideoProjectsIdResponseDownloadsItem
 */
const SchemaOut$GetV1VideoProjectsIdResponseDownloadsItem: z.ZodType<
  External$GetV1VideoProjectsIdResponseDownloadsItem, // output type of this zod object
  z.ZodTypeDef,
  GetV1VideoProjectsIdResponseDownloadsItem // the object to be transformed
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

export const Schemas$GetV1VideoProjectsIdResponseDownloadsItem = {
  in: SchemaIn$GetV1VideoProjectsIdResponseDownloadsItem,
  out: SchemaOut$GetV1VideoProjectsIdResponseDownloadsItem,
};
