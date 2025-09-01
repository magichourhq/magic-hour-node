import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1AiTalkingPhotoCreateBodyAssets,
  Schemas$V1AiTalkingPhotoCreateBodyAssets,
  V1AiTalkingPhotoCreateBodyAssets,
} from "magic-hour/types/v1-ai-talking-photo-create-body-assets";
import {
  External$V1AiTalkingPhotoCreateBodyStyle,
  Schemas$V1AiTalkingPhotoCreateBodyStyle,
  V1AiTalkingPhotoCreateBodyStyle,
} from "magic-hour/types/v1-ai-talking-photo-create-body-style";

/**
 * CreateRequest
 */
export type CreateRequest = {
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
 * CreateRequest without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$CreateRequest = {
  assets: External$V1AiTalkingPhotoCreateBodyAssets;
  end_seconds: number;
  name?: string | undefined;
  start_seconds: number;
  style?: External$V1AiTalkingPhotoCreateBodyStyle | undefined;
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

export const Schemas$CreateRequest = {
  in: SchemaIn$CreateRequest,
  out: SchemaOut$CreateRequest,
};
