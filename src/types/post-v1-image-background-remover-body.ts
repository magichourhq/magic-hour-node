import {
  External$PostV1ImageBackgroundRemoverBodyAssets,
  PostV1ImageBackgroundRemoverBodyAssets,
  Schemas$PostV1ImageBackgroundRemoverBodyAssets,
} from "./post-v1-image-background-remover-body-assets";
import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * PostV1ImageBackgroundRemoverBody
 */
export type PostV1ImageBackgroundRemoverBody = {
  /**
   * Provide the assets for background removal
   */
  assets: PostV1ImageBackgroundRemoverBodyAssets;
  /**
   * The name of image
   */
  name?: string | undefined;
};

/**
 * @internal
 * PostV1ImageBackgroundRemoverBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1ImageBackgroundRemoverBody = {
  assets: External$PostV1ImageBackgroundRemoverBodyAssets;
  name?: string | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1ImageBackgroundRemoverBody
 */
const SchemaIn$PostV1ImageBackgroundRemoverBody: z.ZodType<
  PostV1ImageBackgroundRemoverBody, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    assets: Schemas$PostV1ImageBackgroundRemoverBodyAssets.in,
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1ImageBackgroundRemoverBody
 */
const SchemaOut$PostV1ImageBackgroundRemoverBody: z.ZodType<
  External$PostV1ImageBackgroundRemoverBody, // output type of this zod object
  z.ZodTypeDef,
  PostV1ImageBackgroundRemoverBody // the object to be transformed
> = z
  .object({
    assets: Schemas$PostV1ImageBackgroundRemoverBodyAssets.out,
    name: z.string().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      name: "name",
    });
  });

export const Schemas$PostV1ImageBackgroundRemoverBody = {
  in: SchemaIn$PostV1ImageBackgroundRemoverBody,
  out: SchemaOut$PostV1ImageBackgroundRemoverBody,
};
