import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1AccountListResponseSubscription,
  Schemas$V1AccountListResponseSubscription,
  V1AccountListResponseSubscription,
} from "./v1-account-list-response-subscription";

/**
 * V1AccountListResponse
 */
export type V1AccountListResponse = {
  /**
   * Credits currently available to spend. Includes subscription credits and any purchased credit packs.
   */
  credits: number;
  /**
   * Email address of the account.
   */
  email: string | null;
  /**
   * Unique ID of the account that owns the API key.
   */
  id: string;
  /**
   * Details of the account's subscription plan. `null` if the account has no subscription, e.g. a free account, an account that only purchased credit packs, or an account on usage-based API pricing.
   *
   * Reflects the plan currently configured on the subscription. If a plan change is scheduled, `tier` stays on the current plan until the next payment succeeds, so `tier` and `name` can briefly disagree.
   */
  subscription: V1AccountListResponseSubscription | null;
  /**
   * Subscription tier in effect for the account. `free` if there is no active subscription, including while a subscription is `past_due`.
   */
  tier: "business" | "creator" | "free" | "pro";
};

/**
 * @internal
 * V1AccountListResponse without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AccountListResponse = {
  credits: number;
  email: string | null;
  id: string;
  subscription: External$V1AccountListResponseSubscription | null;
  tier: "business" | "creator" | "free" | "pro";
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AccountListResponse
 */
const SchemaIn$V1AccountListResponse: z.ZodType<
  V1AccountListResponse, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    credits: z.number().int(),
    email: z.string().nullable(),
    id: z.string(),
    subscription: Schemas$V1AccountListResponseSubscription.in.nullable(),
    tier: z.enum(["business", "creator", "free", "pro"]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      credits: "credits",
      email: "email",
      id: "id",
      subscription: "subscription",
      tier: "tier",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AccountListResponse
 */
const SchemaOut$V1AccountListResponse: z.ZodType<
  External$V1AccountListResponse, // output type of this zod object
  z.ZodTypeDef,
  V1AccountListResponse // the object to be transformed
> = z
  .object({
    credits: z.number().int(),
    email: z.string().nullable(),
    id: z.string(),
    subscription: Schemas$V1AccountListResponseSubscription.out.nullable(),
    tier: z.enum(["business", "creator", "free", "pro"]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      credits: "credits",
      email: "email",
      id: "id",
      subscription: "subscription",
      tier: "tier",
    });
  });

export const Schemas$V1AccountListResponse = {
  in: SchemaIn$V1AccountListResponse,
  out: SchemaOut$V1AccountListResponse,
};
