import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1FaceDetectionGetResponseFacesItem,
  Schemas$V1FaceDetectionGetResponseFacesItem,
  V1FaceDetectionGetResponseFacesItem,
} from "./v1-face-detection-get-response-faces-item";

/**
 * V1FaceDetectionGetResponse
 */
export type V1FaceDetectionGetResponse = {
  /**
   * The credits charged for the task.
   */
  creditsCharged: number;
  /**
   * The faces detected in the image or video. The list is populated as faces are detected.
   */
  faces: V1FaceDetectionGetResponseFacesItem[];
  /**
   * The id of the task. This value is returned by the [face detection API](/api-reference/files/face-detection#response-id).
   */
  id: string;
  /**
   * The status of the detection.
   */
  status: "complete" | "error" | "queued" | "rendering";
};

/**
 * @internal
 * V1FaceDetectionGetResponse without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1FaceDetectionGetResponse = {
  credits_charged: number;
  faces: External$V1FaceDetectionGetResponseFacesItem[];
  id: string;
  status: "complete" | "error" | "queued" | "rendering";
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1FaceDetectionGetResponse
 */
const SchemaIn$V1FaceDetectionGetResponse: z.ZodType<
  V1FaceDetectionGetResponse, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    credits_charged: z.number().int(),
    faces: z.array(Schemas$V1FaceDetectionGetResponseFacesItem.in),
    id: z.string(),
    status: z.enum(["complete", "error", "queued", "rendering"]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      credits_charged: "creditsCharged",
      faces: "faces",
      id: "id",
      status: "status",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1FaceDetectionGetResponse
 */
const SchemaOut$V1FaceDetectionGetResponse: z.ZodType<
  External$V1FaceDetectionGetResponse, // output type of this zod object
  z.ZodTypeDef,
  V1FaceDetectionGetResponse // the object to be transformed
> = z
  .object({
    creditsCharged: z.number().int(),
    faces: z.array(Schemas$V1FaceDetectionGetResponseFacesItem.out),
    id: z.string(),
    status: z.enum(["complete", "error", "queued", "rendering"]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      creditsCharged: "credits_charged",
      faces: "faces",
      id: "id",
      status: "status",
    });
  });

export const Schemas$V1FaceDetectionGetResponse = {
  in: SchemaIn$V1FaceDetectionGetResponse,
  out: SchemaOut$V1FaceDetectionGetResponse,
};
