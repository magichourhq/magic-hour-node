import { zodTransform } from "magic-hour/core";
import {
  External$V1FaceDetectionCreateBodyAssets,
  Schemas$V1FaceDetectionCreateBodyAssets,
  V1FaceDetectionCreateBodyAssets,
} from "magic-hour/types/v1-face-detection-create-body-assets";
import * as z from "zod";

/**
 * GetRequest
 */
export type GetRequest = {
  /**
   * The id of the task
   */
  id: string;
};

/**
 * @internal
 * GetRequest without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$GetRequest = {
  id: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object GetRequest
 */
const SchemaIn$GetRequest: z.ZodType<
  GetRequest, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    id: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      id: "id",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$GetRequest
 */
const SchemaOut$GetRequest: z.ZodType<
  External$GetRequest, // output type of this zod object
  z.ZodTypeDef,
  GetRequest // the object to be transformed
> = z
  .object({
    id: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      id: "id",
    });
  });

export const Schemas$GetRequest = {
  in: SchemaIn$GetRequest,
  out: SchemaOut$GetRequest,
};

/**
 * CreateRequest
 */
export type CreateRequest = {
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
 * CreateRequest without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$CreateRequest = {
  assets: External$V1FaceDetectionCreateBodyAssets;
  confidence_score?: number | undefined;
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$CreateRequest
 */
const SchemaOut$CreateRequest: z.ZodType<
  External$CreateRequest, // output type of this zod object
  z.ZodTypeDef,
  CreateRequest // the object to be transformed
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

export const Schemas$CreateRequest = {
  in: SchemaIn$CreateRequest,
  out: SchemaOut$CreateRequest,
};
