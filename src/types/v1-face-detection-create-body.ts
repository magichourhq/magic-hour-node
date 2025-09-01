import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1FaceDetectionCreateBodyAssets,
  Schemas$V1FaceDetectionCreateBodyAssets,
  V1FaceDetectionCreateBodyAssets,
} from "./v1-face-detection-create-body-assets";

/**
 * V1FaceDetectionCreateBody
 */
export type V1FaceDetectionCreateBody = {
  /**
   * Provide the assets for face detection
   */
  assets: V1FaceDetectionCreateBodyAssets;
  /**
   * Confidence threshold for filtering detected faces.
   * * Higher values (e.g., 0.9) include only faces detected with high certainty, reducing false positives.
   * * Lower values (e.g., 0.3) include more faces, but may increase the chance of incorrect detections.
   */
  confidenceScore?: number | undefined;
};

/**
 * @internal
 * V1FaceDetectionCreateBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1FaceDetectionCreateBody = {
  assets: External$V1FaceDetectionCreateBodyAssets;
  confidence_score?: number | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1FaceDetectionCreateBody
 */
const SchemaIn$V1FaceDetectionCreateBody: z.ZodType<
  V1FaceDetectionCreateBody, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    assets: Schemas$V1FaceDetectionCreateBodyAssets.in,
    confidence_score: z.number().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      confidence_score: "confidenceScore",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1FaceDetectionCreateBody
 */
const SchemaOut$V1FaceDetectionCreateBody: z.ZodType<
  External$V1FaceDetectionCreateBody, // output type of this zod object
  z.ZodTypeDef,
  V1FaceDetectionCreateBody // the object to be transformed
> = z
  .object({
    assets: Schemas$V1FaceDetectionCreateBodyAssets.out,
    confidenceScore: z.number().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      confidenceScore: "confidence_score",
    });
  });

export const Schemas$V1FaceDetectionCreateBody = {
  in: SchemaIn$V1FaceDetectionCreateBody,
  out: SchemaOut$V1FaceDetectionCreateBody,
};
