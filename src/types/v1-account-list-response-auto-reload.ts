import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * V1AccountListResponseAutoReload
 */
export type V1AccountListResponseAutoReload = {
  /**
   * State of Auto Reload on the account.
   * - `disabled`: off or never set up.
   * - `active`: on, with no refill processing or blocked.
   * - `auto_reload_pending`: a refill is processing. Check again shortly.
   * - `payment_failed`: the last refill payment failed and paused Auto Reload until the payment method is updated.
   * - `spending_limit_reached`: the monthly limit blocked the last refill.
   *
   * After an `insufficient_credits` rejection, resubmit the same request once `credits` reaches that rejection's `credits_required`.
   */
  status:
    | "active"
    | "auto_reload_pending"
    | "disabled"
    | "payment_failed"
    | "spending_limit_reached";
};

/**
 * @internal
 * V1AccountListResponseAutoReload without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AccountListResponseAutoReload = {
  status:
    | "active"
    | "auto_reload_pending"
    | "disabled"
    | "payment_failed"
    | "spending_limit_reached";
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AccountListResponseAutoReload
 */
const SchemaIn$V1AccountListResponseAutoReload: z.ZodType<
  V1AccountListResponseAutoReload, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    status: z.enum([
      "active",
      "auto_reload_pending",
      "disabled",
      "payment_failed",
      "spending_limit_reached",
    ]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      status: "status",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AccountListResponseAutoReload
 */
const SchemaOut$V1AccountListResponseAutoReload: z.ZodType<
  External$V1AccountListResponseAutoReload, // output type of this zod object
  z.ZodTypeDef,
  V1AccountListResponseAutoReload // the object to be transformed
> = z
  .object({
    status: z.enum([
      "active",
      "auto_reload_pending",
      "disabled",
      "payment_failed",
      "spending_limit_reached",
    ]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      status: "status",
    });
  });

export const Schemas$V1AccountListResponseAutoReload = {
  in: SchemaIn$V1AccountListResponseAutoReload,
  out: SchemaOut$V1AccountListResponseAutoReload,
};
