import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1HeadSwapCreateBodyAssets,
  Schemas$V1HeadSwapCreateBodyAssets,
  V1HeadSwapCreateBodyAssets,
} from "magic-hour/types/v1-head-swap-create-body-assets";

/**
 * CreateRequest
 */
export type CreateRequest = {
  /**
   * Provide the body and head images for head swap
   */
  assets: V1HeadSwapCreateBodyAssets;
  /**
   * Constrains the larger dimension (height or width) of the output. Omit to use the maximum allowed for your plan (capped at 2048px). Values above your plan maximum are clamped down to your plan's maximum.
   */
  maxResolution?: number | undefined;
  /**
   * Give your image a custom name for easy identification.
   */
  name?: string | undefined;
};

/**
 * @internal
 * CreateRequest without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$CreateRequest = {
  assets: External$V1HeadSwapCreateBodyAssets;
  max_resolution?: number | undefined;
  name?: string | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object CreateRequest
 */
const SchemaIn$CreateRequest: z.ZodType<
  CreateRequest, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    assets: Schemas$V1HeadSwapCreateBodyAssets.in,
    max_resolution: z.number().int().optional(),
    name: z.string().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      max_resolution: "maxResolution",
      name: "name",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$CreateRequest
 */
const SchemaOut$CreateRequest: z.ZodType<
  External$CreateRequest, // output type of this zod object
  z.ZodTypeDef,
  CreateRequest // the object to be transformed
> = z
  .object({
    assets: Schemas$V1HeadSwapCreateBodyAssets.out,
    maxResolution: z.number().int().optional(),
    name: z.string().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      maxResolution: "max_resolution",
      name: "name",
    });
  });

export const Schemas$CreateRequest = {
  in: SchemaIn$CreateRequest,
  out: SchemaOut$CreateRequest,
};
