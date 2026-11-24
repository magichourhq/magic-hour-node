import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * V1AccountCheckoutCreateResponse
 */
export type V1AccountCheckoutCreateResponse = {
  /**
   * Open in a browser to complete the purchase.
   */
  checkoutUrl: string;
};

/**
 * @internal
 * V1AccountCheckoutCreateResponse without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AccountCheckoutCreateResponse = {
  checkout_url: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AccountCheckoutCreateResponse
 */
const SchemaIn$V1AccountCheckoutCreateResponse: z.ZodType<
  V1AccountCheckoutCreateResponse, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    checkout_url: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      checkout_url: "checkoutUrl",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AccountCheckoutCreateResponse
 */
const SchemaOut$V1AccountCheckoutCreateResponse: z.ZodType<
  External$V1AccountCheckoutCreateResponse, // output type of this zod object
  z.ZodTypeDef,
  V1AccountCheckoutCreateResponse // the object to be transformed
> = z
  .object({
    checkoutUrl: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      checkoutUrl: "checkout_url",
    });
  });

export const Schemas$V1AccountCheckoutCreateResponse = {
  in: SchemaIn$V1AccountCheckoutCreateResponse,
  out: SchemaOut$V1AccountCheckoutCreateResponse,
};
