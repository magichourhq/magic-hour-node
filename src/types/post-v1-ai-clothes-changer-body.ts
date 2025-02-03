import {
  External$PostV1AiClothesChangerBodyAssets,
  PostV1AiClothesChangerBodyAssets,
  Schemas$PostV1AiClothesChangerBodyAssets,
} from "./post-v1-ai-clothes-changer-body-assets";
import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * PostV1AiClothesChangerBody
 */
export type PostV1AiClothesChangerBody = {
  /**
   * Provide the assets for clothes changer
   */
  assets: PostV1AiClothesChangerBodyAssets;
  /**
   * The name of image
   */
  name?: string | undefined;
};

/**
 * @internal
 * PostV1AiClothesChangerBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1AiClothesChangerBody = {
  assets: External$PostV1AiClothesChangerBodyAssets;
  name?: string | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1AiClothesChangerBody
 */
const SchemaIn$PostV1AiClothesChangerBody: z.ZodType<
  PostV1AiClothesChangerBody, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    assets: Schemas$PostV1AiClothesChangerBodyAssets.in,
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1AiClothesChangerBody
 */
const SchemaOut$PostV1AiClothesChangerBody: z.ZodType<
  External$PostV1AiClothesChangerBody, // output type of this zod object
  z.ZodTypeDef,
  PostV1AiClothesChangerBody // the object to be transformed
> = z
  .object({
    assets: Schemas$PostV1AiClothesChangerBodyAssets.out,
    name: z.string().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      name: "name",
    });
  });

export const Schemas$PostV1AiClothesChangerBody = {
  in: SchemaIn$PostV1AiClothesChangerBody,
  out: SchemaOut$PostV1AiClothesChangerBody,
};
