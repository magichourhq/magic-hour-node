import {
  External$V1FaceSwapPhotoCreateBodyAssets,
  Schemas$V1FaceSwapPhotoCreateBodyAssets,
  V1FaceSwapPhotoCreateBodyAssets,
} from "./v1-face-swap-photo-create-body-assets";
import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * V1FaceSwapPhotoCreateBody
 */
export type V1FaceSwapPhotoCreateBody = {
  /**
   * Provide the assets for face swap photo
   */
  assets: V1FaceSwapPhotoCreateBodyAssets;
  /**
   * The name of image. This value is mainly used for your own identification of the image.
   */
  name?: string | undefined;
};

/**
 * @internal
 * V1FaceSwapPhotoCreateBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1FaceSwapPhotoCreateBody = {
  assets: External$V1FaceSwapPhotoCreateBodyAssets;
  name?: string | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1FaceSwapPhotoCreateBody
 */
const SchemaIn$V1FaceSwapPhotoCreateBody: z.ZodType<
  V1FaceSwapPhotoCreateBody, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1FaceSwapPhotoCreateBody
 */
const SchemaOut$V1FaceSwapPhotoCreateBody: z.ZodType<
  External$V1FaceSwapPhotoCreateBody, // output type of this zod object
  z.ZodTypeDef,
  V1FaceSwapPhotoCreateBody // the object to be transformed
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

export const Schemas$V1FaceSwapPhotoCreateBody = {
  in: SchemaIn$V1FaceSwapPhotoCreateBody,
  out: SchemaOut$V1FaceSwapPhotoCreateBody,
};
