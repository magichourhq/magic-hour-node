import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1BodySwapCreateBodyAssets,
  Schemas$V1BodySwapCreateBodyAssets,
  V1BodySwapCreateBodyAssets,
} from "magic-hour/types/v1-body-swap-create-body-assets";

/**
 * CreateRequest
 */
export type CreateRequest = {
  /**
   * Person image and scene image for body swap
   */
  assets: V1BodySwapCreateBodyAssets;
  /**
   * Give your image a custom name for easy identification.
   */
  name?: string | undefined;
  /**
   * Output resolution. Determines credits charged for the run.
   */
  resolution: "1k" | "2k" | "4k" | "640px";
};

/**
 * @internal
 * CreateRequest without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$CreateRequest = {
  assets: External$V1BodySwapCreateBodyAssets;
  name?: string | undefined;
  resolution: "1k" | "2k" | "4k" | "640px";
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
    assets: Schemas$V1BodySwapCreateBodyAssets.in,
    name: z.string().optional(),
    resolution: z.enum(["1k", "2k", "4k", "640px"]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      name: "name",
      resolution: "resolution",
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
    assets: Schemas$V1BodySwapCreateBodyAssets.out,
    name: z.string().optional(),
    resolution: z.enum(["1k", "2k", "4k", "640px"]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      name: "name",
      resolution: "resolution",
    });
  });

export const Schemas$CreateRequest = {
  in: SchemaIn$CreateRequest,
  out: SchemaOut$CreateRequest,
};
