/**
 * Status of the subscription.
 * - `active`: payments are up to date.
 * - `past_due`: the latest payment failed. `tier` is `free` until payment succeeds. The subscription is canceled if payment keeps failing.
 */
export type V1AccountListResponseSubscriptionStatusEnum = "active" | "past_due";
