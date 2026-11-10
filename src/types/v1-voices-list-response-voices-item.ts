import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * V1VoicesListResponseVoicesItem
 */
export type V1VoicesListResponseVoicesItem = {
  /**
   * URL of the voice's avatar image, or null when the voice has no avatar.
   */
  avatarUrl: string | null;
  /**
   * Unique ID of the voice. Pass it as `style.voice_name` when generating speech. Names are not unique, so use the ID.
   */
  id: string;
  /**
   * Display name of the voice.
   */
  name: string;
  /**
   * URL of an audio sample of the voice.
   */
  previewUrl: string;
};

/**
 * @internal
 * V1VoicesListResponseVoicesItem without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1VoicesListResponseVoicesItem = {
  avatar_url: string | null;
  id: string;
  name: string;
  preview_url: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1VoicesListResponseVoicesItem
 */
const SchemaIn$V1VoicesListResponseVoicesItem: z.ZodType<
  V1VoicesListResponseVoicesItem, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    avatar_url: z.string().nullable(),
    id: z.string(),
    name: z.string(),
    preview_url: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      avatar_url: "avatarUrl",
      id: "id",
      name: "name",
      preview_url: "previewUrl",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1VoicesListResponseVoicesItem
 */
const SchemaOut$V1VoicesListResponseVoicesItem: z.ZodType<
  External$V1VoicesListResponseVoicesItem, // output type of this zod object
  z.ZodTypeDef,
  V1VoicesListResponseVoicesItem // the object to be transformed
> = z
  .object({
    avatarUrl: z.string().nullable(),
    id: z.string(),
    name: z.string(),
    previewUrl: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      avatarUrl: "avatar_url",
      id: "id",
      name: "name",
      previewUrl: "preview_url",
    });
  });

export const Schemas$V1VoicesListResponseVoicesItem = {
  in: SchemaIn$V1VoicesListResponseVoicesItem,
  out: SchemaOut$V1VoicesListResponseVoicesItem,
};
