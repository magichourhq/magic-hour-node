import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * PostV1AiQrCodeGeneratorBodyStyle
 */
export type PostV1AiQrCodeGeneratorBodyStyle = {
  /**
   * To use our templates, pass in one of Watercolor, Cyberpunk City, Ink Landscape, Interior Painting, Japanese Street, Mech, Minecraft, Picasso Painting, Game Map, Spaceship, Chinese Painting, Winter Village, or pass any custom art style.
   */
  artStyle: string;
};

/**
 * @internal
 * PostV1AiQrCodeGeneratorBodyStyle without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1AiQrCodeGeneratorBodyStyle = {
  art_style: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1AiQrCodeGeneratorBodyStyle
 */
const SchemaIn$PostV1AiQrCodeGeneratorBodyStyle: z.ZodType<
  PostV1AiQrCodeGeneratorBodyStyle, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1AiQrCodeGeneratorBodyStyle
 */
const SchemaOut$PostV1AiQrCodeGeneratorBodyStyle: z.ZodType<
  External$PostV1AiQrCodeGeneratorBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  PostV1AiQrCodeGeneratorBodyStyle // the object to be transformed
> = z
  .object({
    artStyle: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      artStyle: "art_style",
    });
  });

export const Schemas$PostV1AiQrCodeGeneratorBodyStyle = {
  in: SchemaIn$PostV1AiQrCodeGeneratorBodyStyle,
  out: SchemaOut$PostV1AiQrCodeGeneratorBodyStyle,
};
