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
   * Maximum number of voices to return. Defaults to 20.
   */
  limit?: number | undefined;
};

/**
 * @internal
 * ListRequest without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$ListRequest = {
  cursor?: string | undefined;
  limit?: number | undefined;
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
  })
  .transform((obj) => {
    return zodTransform(obj, {
      cursor: "cursor",
      limit: "limit",
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
  })
  .transform((obj) => {
    return zodTransform(obj, {
      cursor: "cursor",
      limit: "limit",
    });
  });

export const Schemas$ListRequest = {
  in: SchemaIn$ListRequest,
  out: SchemaOut$ListRequest,
};
