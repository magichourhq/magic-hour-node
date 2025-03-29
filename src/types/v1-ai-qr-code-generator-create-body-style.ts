import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * V1AiQrCodeGeneratorCreateBodyStyle
 */
export type V1AiQrCodeGeneratorCreateBodyStyle = {
  /**
   * To use our templates, pass in one of Watercolor, Cyberpunk City, Ink Landscape, Interior Painting, Japanese Street, Mech, Minecraft, Picasso Painting, Game Map, Spaceship, Chinese Painting, Winter Village, or pass any custom art style.
   */
  artStyle: string;
};

/**
 * @internal
 * V1AiQrCodeGeneratorCreateBodyStyle without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiQrCodeGeneratorCreateBodyStyle = {
  art_style: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiQrCodeGeneratorCreateBodyStyle
 */
const SchemaIn$V1AiQrCodeGeneratorCreateBodyStyle: z.ZodType<
  V1AiQrCodeGeneratorCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    art_style: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      art_style: "artStyle",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiQrCodeGeneratorCreateBodyStyle
 */
const SchemaOut$V1AiQrCodeGeneratorCreateBodyStyle: z.ZodType<
  External$V1AiQrCodeGeneratorCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  V1AiQrCodeGeneratorCreateBodyStyle // the object to be transformed
> = z
  .object({
    artStyle: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      artStyle: "art_style",
    });
  });

export const Schemas$V1AiQrCodeGeneratorCreateBodyStyle = {
  in: SchemaIn$V1AiQrCodeGeneratorCreateBodyStyle,
  out: SchemaOut$V1AiQrCodeGeneratorCreateBodyStyle,
};
