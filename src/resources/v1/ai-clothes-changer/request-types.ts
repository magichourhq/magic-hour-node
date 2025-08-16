import { zodTransform } from "magic-hour/core";
import {
  External$V1AiClothesChangerCreateBodyAssets,
  Schemas$V1AiClothesChangerCreateBodyAssets,
  V1AiClothesChangerCreateBodyAssets,
} from "magic-hour/types/v1-ai-clothes-changer-create-body-assets";
import * as z from "zod";

/**
 * CreateRequest
 */
export type CreateRequest = {
  /**
   * Provide the assets for clothes changer
   */
  assets: V1AiClothesChangerCreateBodyAssets;
  /**
   * The name of image. This value is mainly used for your own identification of the image.
   */
  name?: string | undefined;
};

/**
 * @internal
 * CreateRequest without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$CreateRequest = {
  assets: External$V1AiClothesChangerCreateBodyAssets;
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$CreateRequest
 */
const SchemaOut$CreateRequest: z.ZodType<
  External$CreateRequest, // output type of this zod object
  z.ZodTypeDef,
  CreateRequest // the object to be transformed
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

export const Schemas$CreateRequest = {
  in: SchemaIn$CreateRequest,
  out: SchemaOut$CreateRequest,
};
