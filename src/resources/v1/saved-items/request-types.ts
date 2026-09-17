import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * ListRequest
 */
export type ListRequest = {
  /**
   * Opaque pagination cursor from the previous response's next_cursor.
   */
  cursor?: string | undefined;
  /**
   * Maximum number of saved items to return. Defaults to 20.
   */
  limit?: number | undefined;
  /**
   * Only return saved items of this type.
   */
  type?:
    | ("brand_kit" | "character" | "moodboard" | "reference" | "voice")
    | undefined;
};

/**
 * @internal
 * ListRequest without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$ListRequest = {
  cursor?: string | undefined;
  limit?: number | undefined;
  type?:
    | ("brand_kit" | "character" | "moodboard" | "reference" | "voice")
    | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object ListRequest
 */
const SchemaIn$ListRequest: z.ZodType<
  ListRequest, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    cursor: z.string().optional(),
    limit: z.number().int().optional(),
    type: z
      .enum(["brand_kit", "character", "moodboard", "reference", "voice"])
      .optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      cursor: "cursor",
      limit: "limit",
      type: "type",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$ListRequest
 */
const SchemaOut$ListRequest: z.ZodType<
  External$ListRequest, // output type of this zod object
  z.ZodTypeDef,
  ListRequest // the object to be transformed
> = z
  .object({
    cursor: z.string().optional(),
    limit: z.number().int().optional(),
    type: z
      .enum(["brand_kit", "character", "moodboard", "reference", "voice"])
      .optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      cursor: "cursor",
      limit: "limit",
      type: "type",
    });
  });

export const Schemas$ListRequest = {
  in: SchemaIn$ListRequest,
  out: SchemaOut$ListRequest,
};
