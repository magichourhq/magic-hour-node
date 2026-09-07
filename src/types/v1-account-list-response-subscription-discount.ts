import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * Discount applied to the subscription. `null` if no discount is applied.
 */
export type V1AccountListResponseSubscriptionDiscount = {
  /**
   * Fixed amount taken off `price.amount` each billing interval, in the smallest unit of the currency. `null` if the discount is a percentage.
   */
  amountOff: number | null;
  /**
   * Percentage taken off `price.amount` each billing interval. `null` if the discount is a fixed amount.
   */
  percentOff: number | null;
};

/**
 * @internal
 * V1AccountListResponseSubscriptionDiscount without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AccountListResponseSubscriptionDiscount = {
  amount_off: number | null;
  percent_off: number | null;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AccountListResponseSubscriptionDiscount
 */
const SchemaIn$V1AccountListResponseSubscriptionDiscount: z.ZodType<
  V1AccountListResponseSubscriptionDiscount, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    amount_off: z.number().int().nullable(),
    percent_off: z.number().nullable(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      amount_off: "amountOff",
      percent_off: "percentOff",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AccountListResponseSubscriptionDiscount
 */
const SchemaOut$V1AccountListResponseSubscriptionDiscount: z.ZodType<
  External$V1AccountListResponseSubscriptionDiscount, // output type of this zod object
  z.ZodTypeDef,
  V1AccountListResponseSubscriptionDiscount // the object to be transformed
> = z
  .object({
    amountOff: z.number().int().nullable(),
    percentOff: z.number().nullable(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      amountOff: "amount_off",
      percentOff: "percent_off",
    });
  });

export const Schemas$V1AccountListResponseSubscriptionDiscount = {
  in: SchemaIn$V1AccountListResponseSubscriptionDiscount,
  out: SchemaOut$V1AccountListResponseSubscriptionDiscount,
};
