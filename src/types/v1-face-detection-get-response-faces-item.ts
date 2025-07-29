import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * V1FaceDetectionGetResponseFacesItem
 */
export type V1FaceDetectionGetResponseFacesItem = {
  /**
   * The path to the face image. This should be used in face swap photo/video API calls as `.assets.face_mappings.original_face`
   */
  path: string;
  /**
   * The url to the face image. This is used to render the image in your applications.
   */
  url: string;
};

/**
 * @internal
 * V1FaceDetectionGetResponseFacesItem without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1FaceDetectionGetResponseFacesItem = {
  path: string;
  url: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1FaceDetectionGetResponseFacesItem
 */
const SchemaIn$V1FaceDetectionGetResponseFacesItem: z.ZodType<
  V1FaceDetectionGetResponseFacesItem, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    path: z.string(),
    url: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      path: "path",
      url: "url",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1FaceDetectionGetResponseFacesItem
 */
const SchemaOut$V1FaceDetectionGetResponseFacesItem: z.ZodType<
  External$V1FaceDetectionGetResponseFacesItem, // output type of this zod object
  z.ZodTypeDef,
  V1FaceDetectionGetResponseFacesItem // the object to be transformed
> = z
  .object({
    path: z.string(),
    url: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      path: "path",
      url: "url",
    });
  });

export const Schemas$V1FaceDetectionGetResponseFacesItem = {
  in: SchemaIn$V1FaceDetectionGetResponseFacesItem,
  out: SchemaOut$V1FaceDetectionGetResponseFacesItem,
};
