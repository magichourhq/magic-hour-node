import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * Custom subtitle configuration.
 */
export type V1AutoSubtitleGeneratorCreateBodyStyleCustomConfig = {
  /**
   * Font name from Google Fonts. Not all fonts support all languages or character sets.
   * We recommend verifying language support and appearance directly on https://fonts.google.com before use.
   */
  font?: string | undefined;
  /**
   * Font size in pixels. If not provided, the font size is automatically calculated based on the video resolution.
   */
  fontSize?: number | undefined;
  /**
   * Font style (e.g., normal, italic, bold)
   */
  fontStyle?: string | undefined;
  /**
   * Color used to highlight the current spoken text
   */
  highlightedTextColor?: string | undefined;
  /**
   * Horizontal alignment of the text (e.g., left, center, right)
   */
  horizontalPosition?: string | undefined;
  /**
   * Stroke (outline) color of the text
   */
  strokeColor?: string | undefined;
  /**
   * Width of the text stroke in pixels. If `stroke_color` is provided, but `stroke_width` is not, the `stroke_width` will be calculated automatically based on the font size.
   */
  strokeWidth?: number | undefined;
  /**
   * Primary text color in hex format
   */
  textColor?: string | undefined;
  /**
   * Vertical alignment of the text (e.g., top, center, bottom)
   */
  verticalPosition?: string | undefined;
};

/**
 * @internal
 * V1AutoSubtitleGeneratorCreateBodyStyleCustomConfig without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AutoSubtitleGeneratorCreateBodyStyleCustomConfig = {
  font?: string | undefined;
  font_size?: number | undefined;
  font_style?: string | undefined;
  highlighted_text_color?: string | undefined;
  horizontal_position?: string | undefined;
  stroke_color?: string | undefined;
  stroke_width?: number | undefined;
  text_color?: string | undefined;
  vertical_position?: string | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AutoSubtitleGeneratorCreateBodyStyleCustomConfig
 */
const SchemaIn$V1AutoSubtitleGeneratorCreateBodyStyleCustomConfig: z.ZodType<
  V1AutoSubtitleGeneratorCreateBodyStyleCustomConfig, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    font: z.string().optional(),
    font_size: z.number().optional(),
    font_style: z.string().optional(),
    highlighted_text_color: z.string().optional(),
    horizontal_position: z.string().optional(),
    stroke_color: z.string().optional(),
    stroke_width: z.number().optional(),
    text_color: z.string().optional(),
    vertical_position: z.string().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      font: "font",
      font_size: "fontSize",
      font_style: "fontStyle",
      highlighted_text_color: "highlightedTextColor",
      horizontal_position: "horizontalPosition",
      stroke_color: "strokeColor",
      stroke_width: "strokeWidth",
      text_color: "textColor",
      vertical_position: "verticalPosition",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AutoSubtitleGeneratorCreateBodyStyleCustomConfig
 */
const SchemaOut$V1AutoSubtitleGeneratorCreateBodyStyleCustomConfig: z.ZodType<
  External$V1AutoSubtitleGeneratorCreateBodyStyleCustomConfig, // output type of this zod object
  z.ZodTypeDef,
  V1AutoSubtitleGeneratorCreateBodyStyleCustomConfig // the object to be transformed
> = z
  .object({
    font: z.string().optional(),
    fontSize: z.number().optional(),
    fontStyle: z.string().optional(),
    highlightedTextColor: z.string().optional(),
    horizontalPosition: z.string().optional(),
    strokeColor: z.string().optional(),
    strokeWidth: z.number().optional(),
    textColor: z.string().optional(),
    verticalPosition: z.string().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      font: "font",
      fontSize: "font_size",
      fontStyle: "font_style",
      highlightedTextColor: "highlighted_text_color",
      horizontalPosition: "horizontal_position",
      strokeColor: "stroke_color",
      strokeWidth: "stroke_width",
      textColor: "text_color",
      verticalPosition: "vertical_position",
    });
  });

export const Schemas$V1AutoSubtitleGeneratorCreateBodyStyleCustomConfig = {
  in: SchemaIn$V1AutoSubtitleGeneratorCreateBodyStyleCustomConfig,
  out: SchemaOut$V1AutoSubtitleGeneratorCreateBodyStyleCustomConfig,
};
