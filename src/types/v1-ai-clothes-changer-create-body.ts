import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1AiClothesChangerCreateBodyAssets,
  Schemas$V1AiClothesChangerCreateBodyAssets,
  V1AiClothesChangerCreateBodyAssets,
} from "./v1-ai-clothes-changer-create-body-assets";

/**
 * V1AiClothesChangerCreateBody
 */
export type V1AiClothesChangerCreateBody = {
  /**
   * Provide the assets for clothes changer
   */
  assets: V1AiClothesChangerCreateBodyAssets;
  /**
   * Give your image a custom name for easy identification.
   */
  name?: string | undefined;
};

/**
 * @internal
 * V1AiClothesChangerCreateBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiClothesChangerCreateBody = {
  assets: External$V1AiClothesChangerCreateBodyAssets;
  name?: string | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiClothesChangerCreateBody
 */
const SchemaIn$V1AiClothesChangerCreateBody: z.ZodType<
  V1AiClothesChangerCreateBody, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    assets: Schemas$V1AiClothesChangerCreateBodyAssets.in,
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiClothesChangerCreateBody
 */
const SchemaOut$V1AiClothesChangerCreateBody: z.ZodType<
  External$V1AiClothesChangerCreateBody, // output type of this zod object
  z.ZodTypeDef,
  V1AiClothesChangerCreateBody // the object to be transformed
> = z
  .object({
    assets: Schemas$V1AiClothesChangerCreateBodyAssets.out,
    name: z.string().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      name: "name",
    });
  });

export const Schemas$V1AiClothesChangerCreateBody = {
  in: SchemaIn$V1AiClothesChangerCreateBody,
  out: SchemaOut$V1AiClothesChangerCreateBody,
};
