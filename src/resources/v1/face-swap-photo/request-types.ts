import { zodTransform } from "magic-hour/core";
import {
  External$PostV1FaceSwapPhotoBodyAssets,
  PostV1FaceSwapPhotoBodyAssets,
  Schemas$PostV1FaceSwapPhotoBodyAssets,
} from "magic-hour/types/post-v1-face-swap-photo-body-assets";
import * as z from "zod";

/**
 * CreateRequest
 */
export type CreateRequest = {
  /**
   * Provide the assets for face swap photo
   */
  assets: PostV1FaceSwapPhotoBodyAssets;
  /**
   * The name of image
   */
  name?: string | undefined;
};

/**
 * @internal
 * CreateRequest without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$CreateRequest = {
  assets: External$PostV1FaceSwapPhotoBodyAssets;
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
    assets: Schemas$PostV1FaceSwapPhotoBodyAssets.in,
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
    assets: Schemas$PostV1FaceSwapPhotoBodyAssets.out,
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
