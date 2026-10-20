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
   * The end time of the input audio in seconds. Maximum clip length depends on style.generation_mode: realistic 300s, prompted 45s.
   */
  endSeconds: number;
  /**
   * Deprecated: use `resolution`. Still accepted as a larger-dimension cap, limited by your plan. Ignored when `resolution` is provided.
   *
   * After plan capping:
   * * Below 1280 maps to `480p` (intermediate values round down).
   * * 1280 or above maps to `720p`.
   */
  maxResolution?: number | undefined;
  /**
   * Give your video a custom name for easy identification.
   */
  name?: string | undefined;
  /**
   * Output preset. Overrides `max_resolution`. Defaults to 480p in prompted mode; realistic mode uses the mapped plan maximum.
   */
  resolution?: ("480p" | "720p") | undefined;
  /**
   * The start time of the input audio in seconds. Maximum clip length depends on style.generation_mode: realistic 300s, prompted 45s.
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
  max_resolution?: number | undefined;
  name?: string | undefined;
  resolution?: ("480p" | "720p") | undefined;
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
    max_resolution: z.number().int().optional(),
    name: z.string().optional(),
    resolution: z.enum(["480p", "720p"]).optional(),
    start_seconds: z.number(),
    style: Schemas$V1AiTalkingPhotoCreateBodyStyle.in.optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      end_seconds: "endSeconds",
      max_resolution: "maxResolution",
      name: "name",
      resolution: "resolution",
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
    maxResolution: z.number().int().optional(),
    name: z.string().optional(),
    resolution: z.enum(["480p", "720p"]).optional(),
    startSeconds: z.number(),
    style: Schemas$V1AiTalkingPhotoCreateBodyStyle.out.optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      endSeconds: "end_seconds",
      maxResolution: "max_resolution",
      name: "name",
      resolution: "resolution",
      startSeconds: "start_seconds",
      style: "style",
    });
  });

export const Schemas$CreateRequest = {
  in: SchemaIn$CreateRequest,
  out: SchemaOut$CreateRequest,
};
