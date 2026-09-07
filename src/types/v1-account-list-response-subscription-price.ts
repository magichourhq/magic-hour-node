import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * V1AccountListResponseSubscriptionPrice
 */
export type V1AccountListResponseSubscriptionPrice = {
  /**
   * Price charged per billing interval, in the smallest unit of the currency (e.g. 4900 is $49.00 for `usd`). Discounts are not applied.
   */
  amount: number;
  /**
   * Three-letter ISO 4217 currency code, lowercase.
   */
  currency: string;
};

/**
 * @internal
 * V1AccountListResponseSubscriptionPrice without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AccountListResponseSubscriptionPrice = {
  amount: number;
  currency: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AccountListResponseSubscriptionPrice
 */
const SchemaIn$V1AccountListResponseSubscriptionPrice: z.ZodType<
  V1AccountListResponseSubscriptionPrice, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    amount: z.number().int(),
    currency: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      amount: "amount",
      currency: "currency",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AccountListResponseSubscriptionPrice
 */
const SchemaOut$V1AccountListResponseSubscriptionPrice: z.ZodType<
  External$V1AccountListResponseSubscriptionPrice, // output type of this zod object
  z.ZodTypeDef,
  V1AccountListResponseSubscriptionPrice // the object to be transformed
> = z
  .object({
    amount: z.number().int(),
    currency: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      amount: "amount",
      currency: "currency",
    });
  });

export const Schemas$V1AccountListResponseSubscriptionPrice = {
  in: SchemaIn$V1AccountListResponseSubscriptionPrice,
  out: SchemaOut$V1AccountListResponseSubscriptionPrice,
};
