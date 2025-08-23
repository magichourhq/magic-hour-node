import * as z from "zod";

import { zodTransform } from "magic-hour/core";

/**
 * Deprecated: Please use `.downloads` instead. The download url and expiration date of the video project
 */
export type V1VideoProjectsGetResponseDownload = {
  expiresAt: string;
  url: string;
};

/**
 * @internal
 * V1VideoProjectsGetResponseDownload without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1VideoProjectsGetResponseDownload = {
  expires_at: string;
  url: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1VideoProjectsGetResponseDownload
 */
const SchemaIn$V1VideoProjectsGetResponseDownload: z.ZodType<
  V1VideoProjectsGetResponseDownload, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1VideoProjectsGetResponseDownload
 */
const SchemaOut$V1VideoProjectsGetResponseDownload: z.ZodType<
  External$V1VideoProjectsGetResponseDownload, // output type of this zod object
  z.ZodTypeDef,
  V1VideoProjectsGetResponseDownload // the object to be transformed
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

export const Schemas$V1VideoProjectsGetResponseDownload = {
  in: SchemaIn$V1VideoProjectsGetResponseDownload,
  out: SchemaOut$V1VideoProjectsGetResponseDownload,
};
