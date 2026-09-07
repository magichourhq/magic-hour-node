/**
 * Subscription tier in effect for the account. `free` if there is no active subscription, including while a subscription is `past_due`.
 */
export type V1AccountListResponseTierEnum =
  | "business"
  | "creator"
  | "free"
  | "pro";
