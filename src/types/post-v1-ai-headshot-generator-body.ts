import {
  External$PostV1AiHeadshotGeneratorBodyAssets,
  PostV1AiHeadshotGeneratorBodyAssets,
  Schemas$PostV1AiHeadshotGeneratorBodyAssets,
} from "./post-v1-ai-headshot-generator-body-assets";
import {
  External$PostV1AiHeadshotGeneratorBodyStyle,
  PostV1AiHeadshotGeneratorBodyStyle,
  Schemas$PostV1AiHeadshotGeneratorBodyStyle,
} from "./post-v1-ai-headshot-generator-body-style";
import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * PostV1AiHeadshotGeneratorBody
 */
export type PostV1AiHeadshotGeneratorBody = {
  /**
   * Provide the assets for headshot photo
   */
  assets: PostV1AiHeadshotGeneratorBodyAssets;
  /**
   * The name of image
   */
  name?: string | undefined;
  style?: PostV1AiHeadshotGeneratorBodyStyle | undefined;
};

/**
 * @internal
 * PostV1AiHeadshotGeneratorBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1AiHeadshotGeneratorBody = {
  assets: External$PostV1AiHeadshotGeneratorBodyAssets;
  name?: string | undefined;
  style?: External$PostV1AiHeadshotGeneratorBodyStyle | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1AiHeadshotGeneratorBody
 */
const SchemaIn$PostV1AiHeadshotGeneratorBody: z.ZodType<
  PostV1AiHeadshotGeneratorBody, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    assets: Schemas$PostV1AiHeadshotGeneratorBodyAssets.in,
    name: z.string().optional(),
    style: Schemas$PostV1AiHeadshotGeneratorBodyStyle.in.optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      name: "name",
      style: "style",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1AiHeadshotGeneratorBody
 */
const SchemaOut$PostV1AiHeadshotGeneratorBody: z.ZodType<
  External$PostV1AiHeadshotGeneratorBody, // output type of this zod object
  z.ZodTypeDef,
  PostV1AiHeadshotGeneratorBody // the object to be transformed
> = z
  .object({
    assets: Schemas$PostV1AiHeadshotGeneratorBodyAssets.out,
    name: z.string().optional(),
    style: Schemas$PostV1AiHeadshotGeneratorBodyStyle.out.optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      name: "name",
      style: "style",
    });
  });

export const Schemas$PostV1AiHeadshotGeneratorBody = {
  in: SchemaIn$PostV1AiHeadshotGeneratorBody,
  out: SchemaOut$PostV1AiHeadshotGeneratorBody,
};
