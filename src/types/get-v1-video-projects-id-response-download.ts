import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Deprecated: Please use `.downloads` instead. The download url and expiration date of the video project
 */
export type GetV1VideoProjectsIdResponseDownload = {
  expiresAt: string;
  url: string;
};

/**
 * @internal
 * GetV1VideoProjectsIdResponseDownload without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$GetV1VideoProjectsIdResponseDownload = {
  expires_at: string;
  url: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object GetV1VideoProjectsIdResponseDownload
 */
const SchemaIn$GetV1VideoProjectsIdResponseDownload: z.ZodType<
  GetV1VideoProjectsIdResponseDownload, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$GetV1VideoProjectsIdResponseDownload
 */
const SchemaOut$GetV1VideoProjectsIdResponseDownload: z.ZodType<
  External$GetV1VideoProjectsIdResponseDownload, // output type of this zod object
  z.ZodTypeDef,
  GetV1VideoProjectsIdResponseDownload // the object to be transformed
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

export const Schemas$GetV1VideoProjectsIdResponseDownload = {
  in: SchemaIn$GetV1VideoProjectsIdResponseDownload,
  out: SchemaOut$GetV1VideoProjectsIdResponseDownload,
};
