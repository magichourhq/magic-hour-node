import {
  External$PostV1FaceSwapPhotoBodyAssets,
  PostV1FaceSwapPhotoBodyAssets,
  Schemas$PostV1FaceSwapPhotoBodyAssets,
} from "./post-v1-face-swap-photo-body-assets";
import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * PostV1FaceSwapPhotoBody
 */
export type PostV1FaceSwapPhotoBody = {
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
 * PostV1FaceSwapPhotoBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1FaceSwapPhotoBody = {
  assets: External$PostV1FaceSwapPhotoBodyAssets;
  name?: string | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1FaceSwapPhotoBody
 */
const SchemaIn$PostV1FaceSwapPhotoBody: z.ZodType<
  PostV1FaceSwapPhotoBody, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1FaceSwapPhotoBody
 */
const SchemaOut$PostV1FaceSwapPhotoBody: z.ZodType<
  External$PostV1FaceSwapPhotoBody, // output type of this zod object
  z.ZodTypeDef,
  PostV1FaceSwapPhotoBody // the object to be transformed
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

export const Schemas$PostV1FaceSwapPhotoBody = {
  in: SchemaIn$PostV1FaceSwapPhotoBody,
  out: SchemaOut$PostV1FaceSwapPhotoBody,
};
