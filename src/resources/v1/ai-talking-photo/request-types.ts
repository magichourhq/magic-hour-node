import { zodTransform } from "magic-hour/core";
import {
  External$V1AiTalkingPhotoCreateBodyAssets,
  Schemas$V1AiTalkingPhotoCreateBodyAssets,
  V1AiTalkingPhotoCreateBodyAssets,
} from "magic-hour/types/v1-ai-talking-photo-create-body-assets";
import * as z from "zod";

/**
 * CreateRequest
 */
export type CreateRequest = {
  /**
   * Provide the assets for creating a talking photo
   */
  assets: V1AiTalkingPhotoCreateBodyAssets;
  /**
   * The end time of the input video in seconds
   */
  endSeconds: number;
  /**
   * The name of image
   */
  name?: string | undefined;
  /**
   * The start time of the input video in seconds
   */
  startSeconds: number;
};

/**
 * @internal
 * CreateRequest without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$CreateRequest = {
  assets: External$V1AiTalkingPhotoCreateBodyAssets;
  end_seconds: number;
  name?: string | undefined;
  start_seconds: number;
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
    assets: Schemas$V1AiTalkingPhotoCreateBodyAssets.in,
    end_seconds: z.number(),
    name: z.string().optional(),
    start_seconds: z.number(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      end_seconds: "endSeconds",
      name: "name",
      start_seconds: "startSeconds",
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
    assets: Schemas$V1AiTalkingPhotoCreateBodyAssets.out,
    endSeconds: z.number(),
    name: z.string().optional(),
    startSeconds: z.number(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      endSeconds: "end_seconds",
      name: "name",
      startSeconds: "start_seconds",
    });
  });

export const Schemas$CreateRequest = {
  in: SchemaIn$CreateRequest,
  out: SchemaOut$CreateRequest,
};
