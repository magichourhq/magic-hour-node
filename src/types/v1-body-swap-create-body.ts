import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1BodySwapCreateBodyAssets,
  Schemas$V1BodySwapCreateBodyAssets,
  V1BodySwapCreateBodyAssets,
} from "./v1-body-swap-create-body-assets";

/**
 * V1BodySwapCreateBody
 */
export type V1BodySwapCreateBody = {
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
 * V1BodySwapCreateBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1BodySwapCreateBody = {
  assets: External$V1BodySwapCreateBodyAssets;
  name?: string | undefined;
  resolution: "1k" | "2k" | "4k" | "640px";
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1BodySwapCreateBody
 */
const SchemaIn$V1BodySwapCreateBody: z.ZodType<
  V1BodySwapCreateBody, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1BodySwapCreateBody
 */
const SchemaOut$V1BodySwapCreateBody: z.ZodType<
  External$V1BodySwapCreateBody, // output type of this zod object
  z.ZodTypeDef,
  V1BodySwapCreateBody // the object to be transformed
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

export const Schemas$V1BodySwapCreateBody = {
  in: SchemaIn$V1BodySwapCreateBody,
  out: SchemaOut$V1BodySwapCreateBody,
};
