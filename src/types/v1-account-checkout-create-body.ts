import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * V1AccountCheckoutCreateBody
 */
export type V1AccountCheckoutCreateBody = {
  /**
   * Credits a blocked request is missing, e.g. `credit_shortfall` from a 402 response. The checkout starts with enough packs to cover it. Defaults to one pack.
   */
  creditShortfall?: number | undefined;
  /**
   * Number of credit packs the checkout starts with. Takes priority over `credit_shortfall`.
   */
  packCount?: number | undefined;
  /**
   * What to buy. `credit_pack` is a one-time credit purchase.
   */
  type: "credit_pack";
};

/**
 * @internal
 * V1AccountCheckoutCreateBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AccountCheckoutCreateBody = {
  credit_shortfall?: number | undefined;
  pack_count?: number | undefined;
  type: "credit_pack";
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AccountCheckoutCreateBody
 */
const SchemaIn$V1AccountCheckoutCreateBody: z.ZodType<
  V1AccountCheckoutCreateBody, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    credit_shortfall: z.number().optional(),
    pack_count: z.number().int().optional(),
    type: z.enum(["credit_pack"]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      credit_shortfall: "creditShortfall",
      pack_count: "packCount",
      type: "type",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AccountCheckoutCreateBody
 */
const SchemaOut$V1AccountCheckoutCreateBody: z.ZodType<
  External$V1AccountCheckoutCreateBody, // output type of this zod object
  z.ZodTypeDef,
  V1AccountCheckoutCreateBody // the object to be transformed
> = z
  .object({
    creditShortfall: z.number().optional(),
    packCount: z.number().int().optional(),
    type: z.enum(["credit_pack"]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      creditShortfall: "credit_shortfall",
      packCount: "pack_count",
      type: "type",
    });
  });

export const Schemas$V1AccountCheckoutCreateBody = {
  in: SchemaIn$V1AccountCheckoutCreateBody,
  out: SchemaOut$V1AccountCheckoutCreateBody,
};
