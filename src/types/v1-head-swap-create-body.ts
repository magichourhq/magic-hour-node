import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1HeadSwapCreateBodyAssets,
  Schemas$V1HeadSwapCreateBodyAssets,
  V1HeadSwapCreateBodyAssets,
} from "./v1-head-swap-create-body-assets";

/**
 * V1HeadSwapCreateBody
 */
export type V1HeadSwapCreateBody = {
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
 * V1HeadSwapCreateBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1HeadSwapCreateBody = {
  assets: External$V1HeadSwapCreateBodyAssets;
  max_resolution?: number | undefined;
  name?: string | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1HeadSwapCreateBody
 */
const SchemaIn$V1HeadSwapCreateBody: z.ZodType<
  V1HeadSwapCreateBody, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1HeadSwapCreateBody
 */
const SchemaOut$V1HeadSwapCreateBody: z.ZodType<
  External$V1HeadSwapCreateBody, // output type of this zod object
  z.ZodTypeDef,
  V1HeadSwapCreateBody // the object to be transformed
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

export const Schemas$V1HeadSwapCreateBody = {
  in: SchemaIn$V1HeadSwapCreateBody,
  out: SchemaOut$V1HeadSwapCreateBody,
};
