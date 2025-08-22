import * as z from "zod";

import { zodTransform } from "magic-hour/core";

import {
  External$V1AiTalkingPhotoCreateBodyAssets,
  Schemas$V1AiTalkingPhotoCreateBodyAssets,
  V1AiTalkingPhotoCreateBodyAssets,
} from "./v1-ai-talking-photo-create-body-assets";
import {
  External$V1AiTalkingPhotoCreateBodyStyle,
  Schemas$V1AiTalkingPhotoCreateBodyStyle,
  V1AiTalkingPhotoCreateBodyStyle,
} from "./v1-ai-talking-photo-create-body-style";

/**
 * Provide the assets for creating a talking photo
 */
export type V1AiTalkingPhotoCreateBody = {
  /**
   * Provide the assets for creating a talking photo
   */
  assets: V1AiTalkingPhotoCreateBodyAssets;
  /**
   * The end time of the input audio in seconds. The maximum duration allowed is 60 seconds.
   */
  endSeconds: number;
  /**
   * The name of image. This value is mainly used for your own identification of the image.
   */
  name?: string | undefined;
  /**
   * The start time of the input audio in seconds. The maximum duration allowed is 60 seconds.
   */
  startSeconds: number;
  /**
   * Attributes used to dictate the style of the output
   */
  style?: V1AiTalkingPhotoCreateBodyStyle | undefined;
};

/**
 * @internal
 * V1AiTalkingPhotoCreateBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiTalkingPhotoCreateBody = {
  assets: External$V1AiTalkingPhotoCreateBodyAssets;
  end_seconds: number;
  name?: string | undefined;
  start_seconds: number;
  style?: External$V1AiTalkingPhotoCreateBodyStyle | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiTalkingPhotoCreateBody
 */
const SchemaIn$V1AiTalkingPhotoCreateBody: z.ZodType<
  V1AiTalkingPhotoCreateBody, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    assets: Schemas$V1AiTalkingPhotoCreateBodyAssets.in,
    end_seconds: z.number(),
    name: z.string().optional(),
    start_seconds: z.number(),
    style: Schemas$V1AiTalkingPhotoCreateBodyStyle.in.optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      end_seconds: "endSeconds",
      name: "name",
      start_seconds: "startSeconds",
      style: "style",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiTalkingPhotoCreateBody
 */
const SchemaOut$V1AiTalkingPhotoCreateBody: z.ZodType<
  External$V1AiTalkingPhotoCreateBody, // output type of this zod object
  z.ZodTypeDef,
  V1AiTalkingPhotoCreateBody // the object to be transformed
> = z
  .object({
    assets: Schemas$V1AiTalkingPhotoCreateBodyAssets.out,
    endSeconds: z.number(),
    name: z.string().optional(),
    startSeconds: z.number(),
    style: Schemas$V1AiTalkingPhotoCreateBodyStyle.out.optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      endSeconds: "end_seconds",
      name: "name",
      startSeconds: "start_seconds",
      style: "style",
    });
  });

export const Schemas$V1AiTalkingPhotoCreateBody = {
  in: SchemaIn$V1AiTalkingPhotoCreateBody,
  out: SchemaOut$V1AiTalkingPhotoCreateBody,
};
