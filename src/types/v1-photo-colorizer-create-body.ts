import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1PhotoColorizerCreateBodyAssets,
  Schemas$V1PhotoColorizerCreateBodyAssets,
  V1PhotoColorizerCreateBodyAssets,
} from "./v1-photo-colorizer-create-body-assets";

/**
 * V1PhotoColorizerCreateBody
 */
export type V1PhotoColorizerCreateBody = {
  /**
   * Provide the assets for photo colorization
   */
  assets: V1PhotoColorizerCreateBodyAssets;
  /**
   * Give your image a custom name for easy identification.
   */
  name?: string | undefined;
};

/**
 * @internal
 * V1PhotoColorizerCreateBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1PhotoColorizerCreateBody = {
  assets: External$V1PhotoColorizerCreateBodyAssets;
  name?: string | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1PhotoColorizerCreateBody
 */
const SchemaIn$V1PhotoColorizerCreateBody: z.ZodType<
  V1PhotoColorizerCreateBody, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    assets: Schemas$V1PhotoColorizerCreateBodyAssets.in,
    name: z.string().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      name: "name",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1PhotoColorizerCreateBody
 */
const SchemaOut$V1PhotoColorizerCreateBody: z.ZodType<
  External$V1PhotoColorizerCreateBody, // output type of this zod object
  z.ZodTypeDef,
  V1PhotoColorizerCreateBody // the object to be transformed
> = z
  .object({
    assets: Schemas$V1PhotoColorizerCreateBodyAssets.out,
    name: z.string().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      name: "name",
    });
  });

export const Schemas$V1PhotoColorizerCreateBody = {
  in: SchemaIn$V1PhotoColorizerCreateBody,
  out: SchemaOut$V1PhotoColorizerCreateBody,
};
