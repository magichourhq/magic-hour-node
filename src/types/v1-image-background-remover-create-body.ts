import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1ImageBackgroundRemoverCreateBodyAssets,
  Schemas$V1ImageBackgroundRemoverCreateBodyAssets,
  V1ImageBackgroundRemoverCreateBodyAssets,
} from "./v1-image-background-remover-create-body-assets";

/**
 * V1ImageBackgroundRemoverCreateBody
 */
export type V1ImageBackgroundRemoverCreateBody = {
  /**
   * Provide the assets for background removal
   */
  assets: V1ImageBackgroundRemoverCreateBodyAssets;
  /**
   * The name of image. This value is mainly used for your own identification of the image.
   */
  name?: string | undefined;
};

/**
 * @internal
 * V1ImageBackgroundRemoverCreateBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1ImageBackgroundRemoverCreateBody = {
  assets: External$V1ImageBackgroundRemoverCreateBodyAssets;
  name?: string | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1ImageBackgroundRemoverCreateBody
 */
const SchemaIn$V1ImageBackgroundRemoverCreateBody: z.ZodType<
  V1ImageBackgroundRemoverCreateBody, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    assets: Schemas$V1ImageBackgroundRemoverCreateBodyAssets.in,
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1ImageBackgroundRemoverCreateBody
 */
const SchemaOut$V1ImageBackgroundRemoverCreateBody: z.ZodType<
  External$V1ImageBackgroundRemoverCreateBody, // output type of this zod object
  z.ZodTypeDef,
  V1ImageBackgroundRemoverCreateBody // the object to be transformed
> = z
  .object({
    assets: Schemas$V1ImageBackgroundRemoverCreateBodyAssets.out,
    name: z.string().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      name: "name",
    });
  });

export const Schemas$V1ImageBackgroundRemoverCreateBody = {
  in: SchemaIn$V1ImageBackgroundRemoverCreateBody,
  out: SchemaOut$V1ImageBackgroundRemoverCreateBody,
};
