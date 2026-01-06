import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1FaceSwapPhotoCreateBodyAssets,
  Schemas$V1FaceSwapPhotoCreateBodyAssets,
  V1FaceSwapPhotoCreateBodyAssets,
} from "magic-hour/types/v1-face-swap-photo-create-body-assets";

/**
 * CreateRequest
 */
export type CreateRequest = {
  /**
   * Provide the assets for face swap photo
   */
  assets: V1FaceSwapPhotoCreateBodyAssets;
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
  assets: External$V1FaceSwapPhotoCreateBodyAssets;
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
    assets: Schemas$V1FaceSwapPhotoCreateBodyAssets.in,
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
    assets: Schemas$V1FaceSwapPhotoCreateBodyAssets.out,
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
