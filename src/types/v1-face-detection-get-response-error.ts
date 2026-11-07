import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * Why the face detection failed. Present only when `status` is `error`; `null` otherwise.
 */
export type V1FaceDetectionGetResponseError = {
  /**
   * An error code to indicate why a failure happened.
   */
  code: string;
  /**
   * Details on the reason why a failure happened.
   */
  message: string;
};

/**
 * @internal
 * V1FaceDetectionGetResponseError without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1FaceDetectionGetResponseError = {
  code: string;
  message: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1FaceDetectionGetResponseError
 */
const SchemaIn$V1FaceDetectionGetResponseError: z.ZodType<
  V1FaceDetectionGetResponseError, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    code: z.string(),
    message: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      code: "code",
      message: "message",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1FaceDetectionGetResponseError
 */
const SchemaOut$V1FaceDetectionGetResponseError: z.ZodType<
  External$V1FaceDetectionGetResponseError, // output type of this zod object
  z.ZodTypeDef,
  V1FaceDetectionGetResponseError // the object to be transformed
> = z
  .object({
    code: z.string(),
    message: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      code: "code",
      message: "message",
    });
  });

export const Schemas$V1FaceDetectionGetResponseError = {
  in: SchemaIn$V1FaceDetectionGetResponseError,
  out: SchemaOut$V1FaceDetectionGetResponseError,
};
