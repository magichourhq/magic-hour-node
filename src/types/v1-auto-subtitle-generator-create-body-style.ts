import {
  External$V1AutoSubtitleGeneratorCreateBodyStyleCustomConfig,
  Schemas$V1AutoSubtitleGeneratorCreateBodyStyleCustomConfig,
  V1AutoSubtitleGeneratorCreateBodyStyleCustomConfig,
} from "./v1-auto-subtitle-generator-create-body-style-custom-config";
import { zodTransform } from "magic-hour/core";
import * as z from "zod";

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
export type V1AutoSubtitleGeneratorCreateBodyStyle = {
  /**
   * Custom subtitle configuration.
   */
  customConfig?: V1AutoSubtitleGeneratorCreateBodyStyleCustomConfig | undefined;
  /**
   * Preset subtitle templates. Please visit https://magichour.ai/create/auto-subtitle-generator to see the style of the existing templates.
   */
  template?: ("cinematic" | "highlight" | "karaoke" | "minimalist") | undefined;
};

/**
 * @internal
 * V1AutoSubtitleGeneratorCreateBodyStyle without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AutoSubtitleGeneratorCreateBodyStyle = {
  custom_config?:
    | External$V1AutoSubtitleGeneratorCreateBodyStyleCustomConfig
    | undefined;
  template?: ("cinematic" | "highlight" | "karaoke" | "minimalist") | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AutoSubtitleGeneratorCreateBodyStyle
 */
const SchemaIn$V1AutoSubtitleGeneratorCreateBodyStyle: z.ZodType<
  V1AutoSubtitleGeneratorCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    custom_config:
      Schemas$V1AutoSubtitleGeneratorCreateBodyStyleCustomConfig.in.optional(),
    template: z
      .enum(["cinematic", "highlight", "karaoke", "minimalist"])
      .optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      custom_config: "customConfig",
      template: "template",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AutoSubtitleGeneratorCreateBodyStyle
 */
const SchemaOut$V1AutoSubtitleGeneratorCreateBodyStyle: z.ZodType<
  External$V1AutoSubtitleGeneratorCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  V1AutoSubtitleGeneratorCreateBodyStyle // the object to be transformed
> = z
  .object({
    customConfig:
      Schemas$V1AutoSubtitleGeneratorCreateBodyStyleCustomConfig.out.optional(),
    template: z
      .enum(["cinematic", "highlight", "karaoke", "minimalist"])
      .optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      customConfig: "custom_config",
      template: "template",
    });
  });

export const Schemas$V1AutoSubtitleGeneratorCreateBodyStyle = {
  in: SchemaIn$V1AutoSubtitleGeneratorCreateBodyStyle,
  out: SchemaOut$V1AutoSubtitleGeneratorCreateBodyStyle,
};
