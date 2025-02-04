import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Deprecated: Please use `.downloads` instead. The download url and expiration date of the video project
 */
export type V1VideoProjectsgetResponseDownload = {
  expiresAt: string;
  url: string;
};

/**
 * @internal
 * V1VideoProjectsgetResponseDownload without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1VideoProjectsgetResponseDownload = {
  expires_at: string;
  url: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1VideoProjectsgetResponseDownload
 */
const SchemaIn$V1VideoProjectsgetResponseDownload: z.ZodType<
  V1VideoProjectsgetResponseDownload, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1VideoProjectsgetResponseDownload
 */
const SchemaOut$V1VideoProjectsgetResponseDownload: z.ZodType<
  External$V1VideoProjectsgetResponseDownload, // output type of this zod object
  z.ZodTypeDef,
  V1VideoProjectsgetResponseDownload // the object to be transformed
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

export const Schemas$V1VideoProjectsgetResponseDownload = {
  in: SchemaIn$V1VideoProjectsgetResponseDownload,
  out: SchemaOut$V1VideoProjectsgetResponseDownload,
};
