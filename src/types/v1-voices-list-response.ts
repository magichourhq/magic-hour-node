import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1VoicesListResponseVoicesItem,
  Schemas$V1VoicesListResponseVoicesItem,
  V1VoicesListResponseVoicesItem,
} from "./v1-voices-list-response-voices-item";

/**
 * V1VoicesListResponse
 */
export type V1VoicesListResponse = {
  /**
   * Cursor for the next page, or null when there are no more voices.
   */
  nextCursor: string | null;
  voices: V1VoicesListResponseVoicesItem[];
};

/**
 * @internal
 * V1VoicesListResponse without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1VoicesListResponse = {
  next_cursor: string | null;
  voices: External$V1VoicesListResponseVoicesItem[];
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1VoicesListResponse
 */
const SchemaIn$V1VoicesListResponse: z.ZodType<
  V1VoicesListResponse, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    next_cursor: z.string().nullable(),
    voices: z.array(Schemas$V1VoicesListResponseVoicesItem.in),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      next_cursor: "nextCursor",
      voices: "voices",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1VoicesListResponse
 */
const SchemaOut$V1VoicesListResponse: z.ZodType<
  External$V1VoicesListResponse, // output type of this zod object
  z.ZodTypeDef,
  V1VoicesListResponse // the object to be transformed
> = z
  .object({
    nextCursor: z.string().nullable(),
    voices: z.array(Schemas$V1VoicesListResponseVoicesItem.out),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      nextCursor: "next_cursor",
      voices: "voices",
    });
  });

export const Schemas$V1VoicesListResponse = {
  in: SchemaIn$V1VoicesListResponse,
  out: SchemaOut$V1VoicesListResponse,
};
