import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1AutoSubtitleGeneratorCreateBodyAssets,
  Schemas$V1AutoSubtitleGeneratorCreateBodyAssets,
  V1AutoSubtitleGeneratorCreateBodyAssets,
} from "./v1-auto-subtitle-generator-create-body-assets";
import {
  External$V1AutoSubtitleGeneratorCreateBodyStyle,
  Schemas$V1AutoSubtitleGeneratorCreateBodyStyle,
  V1AutoSubtitleGeneratorCreateBodyStyle,
} from "./v1-auto-subtitle-generator-create-body-style";

/**
 * V1AutoSubtitleGeneratorCreateBody
 */
export type V1AutoSubtitleGeneratorCreateBody = {
  /**
   * Provide the assets for auto subtitle generator
   */
  assets: V1AutoSubtitleGeneratorCreateBodyAssets;
  /**
   * The end time of the input video in seconds. This value is used to trim the input video. The value must be greater than 0.1, and more than the start_seconds.
   */
  endSeconds: number;
  /**
   * The name of video. This value is mainly used for your own identification of the video.
   */
  name?: string | undefined;
  /**
   * The start time of the input video in seconds. This value is used to trim the input video. The value must be greater than 0.
   */
  startSeconds: number;
  /**
   * Style of the subtitle. At least one of `.style.template` or `.style.custom_config` must be provided.
   * * If only `.style.template` is provided, default values for the template will be used.
   * * If both are provided, the fields in `.style.custom_config` will be used to overwrite the fields in `.style.template`.
   * * If only `.style.custom_config` is provided, then all fields in `.style.custom_config` will be used.
   *
   * To use custom config only, the following `custom_config` params are required:
   * * `.style.custom_config.font`
   * * `.style.custom_config.text_color`
   * * `.style.custom_config.vertical_position`
   * * `.style.custom_config.horizontal_position`
   *
   */
  style: V1AutoSubtitleGeneratorCreateBodyStyle;
};

/**
 * @internal
 * V1AutoSubtitleGeneratorCreateBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AutoSubtitleGeneratorCreateBody = {
  assets: External$V1AutoSubtitleGeneratorCreateBodyAssets;
  end_seconds: number;
  name?: string | undefined;
  start_seconds: number;
  style: External$V1AutoSubtitleGeneratorCreateBodyStyle;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AutoSubtitleGeneratorCreateBody
 */
const SchemaIn$V1AutoSubtitleGeneratorCreateBody: z.ZodType<
  V1AutoSubtitleGeneratorCreateBody, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    assets: Schemas$V1AutoSubtitleGeneratorCreateBodyAssets.in,
    end_seconds: z.number(),
    name: z.string().optional(),
    start_seconds: z.number(),
    style: Schemas$V1AutoSubtitleGeneratorCreateBodyStyle.in,
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AutoSubtitleGeneratorCreateBody
 */
const SchemaOut$V1AutoSubtitleGeneratorCreateBody: z.ZodType<
  External$V1AutoSubtitleGeneratorCreateBody, // output type of this zod object
  z.ZodTypeDef,
  V1AutoSubtitleGeneratorCreateBody // the object to be transformed
> = z
  .object({
    assets: Schemas$V1AutoSubtitleGeneratorCreateBodyAssets.out,
    endSeconds: z.number(),
    name: z.string().optional(),
    startSeconds: z.number(),
    style: Schemas$V1AutoSubtitleGeneratorCreateBodyStyle.out,
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

export const Schemas$V1AutoSubtitleGeneratorCreateBody = {
  in: SchemaIn$V1AutoSubtitleGeneratorCreateBody,
  out: SchemaOut$V1AutoSubtitleGeneratorCreateBody,
};
