import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * V1FaceDetectionCreateResponse
 */
export type V1FaceDetectionCreateResponse = {
  /**
   * The credits charged for the task.
   */
  creditsCharged: number;
  /**
   * The id of the task. Use this value in the [get face detection details API](/api-reference/files/get-face-detection-details) to get the details of the face detection task.
   */
  id: string;
};

/**
 * @internal
 * V1FaceDetectionCreateResponse without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1FaceDetectionCreateResponse = {
  credits_charged: number;
  id: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1FaceDetectionCreateResponse
 */
const SchemaIn$V1FaceDetectionCreateResponse: z.ZodType<
  V1FaceDetectionCreateResponse, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    credits_charged: z.number().int(),
    id: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      credits_charged: "creditsCharged",
      id: "id",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1FaceDetectionCreateResponse
 */
const SchemaOut$V1FaceDetectionCreateResponse: z.ZodType<
  External$V1FaceDetectionCreateResponse, // output type of this zod object
  z.ZodTypeDef,
  V1FaceDetectionCreateResponse // the object to be transformed
> = z
  .object({
    creditsCharged: z.number().int(),
    id: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      creditsCharged: "credits_charged",
      id: "id",
    });
  });

export const Schemas$V1FaceDetectionCreateResponse = {
  in: SchemaIn$V1FaceDetectionCreateResponse,
  out: SchemaOut$V1FaceDetectionCreateResponse,
};
