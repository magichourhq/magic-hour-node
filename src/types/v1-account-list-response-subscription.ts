import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1AccountListResponseSubscriptionDiscount,
  Schemas$V1AccountListResponseSubscriptionDiscount,
  V1AccountListResponseSubscriptionDiscount,
} from "./v1-account-list-response-subscription-discount";
import {
  External$V1AccountListResponseSubscriptionPrice,
  Schemas$V1AccountListResponseSubscriptionPrice,
  V1AccountListResponseSubscriptionPrice,
} from "./v1-account-list-response-subscription-price";

/**
 * Details of the account's subscription plan. `null` if the account has no subscription, e.g. a free account, an account that only purchased credit packs, or an account on usage-based API pricing.
 *
 * Reflects the plan currently configured on the subscription. If a plan change is scheduled, `tier` stays on the current plan until the next payment succeeds, so `tier` and `name` can briefly disagree.
 */
export type V1AccountListResponseSubscription = {
  /**
   * How often the subscription is billed. `null` if unknown.
   */
  billingInterval: ("month" | "year") | null;
  /**
   * Whether the subscription is scheduled to end at `current_period_end` instead of renewing. The subscription stays usable until then.
   */
  cancelAtPeriodEnd: boolean;
  /**
   * End of the current billing period, in ISO 8601 format. The subscription renews at this time, or ends if `cancel_at_period_end` is `true`.
   */
  currentPeriodEnd: string | null;
  /**
   * Discount applied to the subscription. `null` if no discount is applied.
   */
  discount: V1AccountListResponseSubscriptionDiscount | null;
  /**
   * Name of the current subscription plan, e.g. `Creator`, `Pro`, `Pro Plus`, `Business`. `null` if the plan cannot be determined. Use `tier` for a machine-readable value.
   */
  name: string | null;
  price: V1AccountListResponseSubscriptionPrice;
  /**
   * Status of the subscription.
   * - `active`: payments are up to date.
   * - `past_due`: the latest payment failed. `tier` is `free` until payment succeeds. The subscription is canceled if payment keeps failing.
   */
  status: "active" | "past_due";
};

/**
 * @internal
 * V1AccountListResponseSubscription without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AccountListResponseSubscription = {
  billing_interval: ("month" | "year") | null;
  cancel_at_period_end: boolean;
  current_period_end: string | null;
  discount: External$V1AccountListResponseSubscriptionDiscount | null;
  name: string | null;
  price: External$V1AccountListResponseSubscriptionPrice;
  status: "active" | "past_due";
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AccountListResponseSubscription
 */
const SchemaIn$V1AccountListResponseSubscription: z.ZodType<
  V1AccountListResponseSubscription, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    billing_interval: z.enum(["month", "year"]).nullable(),
    cancel_at_period_end: z.boolean(),
    current_period_end: z.string().nullable(),
    discount: Schemas$V1AccountListResponseSubscriptionDiscount.in.nullable(),
    name: z.string().nullable(),
    price: Schemas$V1AccountListResponseSubscriptionPrice.in,
    status: z.enum(["active", "past_due"]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      billing_interval: "billingInterval",
      cancel_at_period_end: "cancelAtPeriodEnd",
      current_period_end: "currentPeriodEnd",
      discount: "discount",
      name: "name",
      price: "price",
      status: "status",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AccountListResponseSubscription
 */
const SchemaOut$V1AccountListResponseSubscription: z.ZodType<
  External$V1AccountListResponseSubscription, // output type of this zod object
  z.ZodTypeDef,
  V1AccountListResponseSubscription // the object to be transformed
> = z
  .object({
    billingInterval: z.enum(["month", "year"]).nullable(),
    cancelAtPeriodEnd: z.boolean(),
    currentPeriodEnd: z.string().nullable(),
    discount: Schemas$V1AccountListResponseSubscriptionDiscount.out.nullable(),
    name: z.string().nullable(),
    price: Schemas$V1AccountListResponseSubscriptionPrice.out,
    status: z.enum(["active", "past_due"]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      billingInterval: "billing_interval",
      cancelAtPeriodEnd: "cancel_at_period_end",
      currentPeriodEnd: "current_period_end",
      discount: "discount",
      name: "name",
      price: "price",
      status: "status",
    });
  });

export const Schemas$V1AccountListResponseSubscription = {
  in: SchemaIn$V1AccountListResponseSubscription,
  out: SchemaOut$V1AccountListResponseSubscription,
};
