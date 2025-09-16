import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * The download url and expiration date of the audio project
 */
export type V1AudioProjectsGetResponseDownloadsItem = {
  expiresAt: string;
  url: string;
};

/**
 * @internal
 * V1AudioProjectsGetResponseDownloadsItem without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AudioProjectsGetResponseDownloadsItem = {
  expires_at: string;
  url: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AudioProjectsGetResponseDownloadsItem
 */
const SchemaIn$V1AudioProjectsGetResponseDownloadsItem: z.ZodType<
  V1AudioProjectsGetResponseDownloadsItem, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AudioProjectsGetResponseDownloadsItem
 */
const SchemaOut$V1AudioProjectsGetResponseDownloadsItem: z.ZodType<
  External$V1AudioProjectsGetResponseDownloadsItem, // output type of this zod object
  z.ZodTypeDef,
  V1AudioProjectsGetResponseDownloadsItem // the object to be transformed
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

export const Schemas$V1AudioProjectsGetResponseDownloadsItem = {
  in: SchemaIn$V1AudioProjectsGetResponseDownloadsItem,
  out: SchemaOut$V1AudioProjectsGetResponseDownloadsItem,
};
