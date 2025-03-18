import { zodTransform } from "magic-hour/core";
import {
  External$PostV1AiHeadshotGeneratorBodyAssets,
  PostV1AiHeadshotGeneratorBodyAssets,
  Schemas$PostV1AiHeadshotGeneratorBodyAssets,
} from "magic-hour/types/post-v1-ai-headshot-generator-body-assets";
import {
  External$PostV1AiHeadshotGeneratorBodyStyle,
  PostV1AiHeadshotGeneratorBodyStyle,
  Schemas$PostV1AiHeadshotGeneratorBodyStyle,
} from "magic-hour/types/post-v1-ai-headshot-generator-body-style";
import * as z from "zod";

/**
 * CreateRequest
 */
export type CreateRequest = {
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
 * CreateRequest without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$CreateRequest = {
  assets: External$PostV1AiHeadshotGeneratorBodyAssets;
  name?: string | undefined;
  style?: External$PostV1AiHeadshotGeneratorBodyStyle | undefined;
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$CreateRequest
 */
const SchemaOut$CreateRequest: z.ZodType<
  External$CreateRequest, // output type of this zod object
  z.ZodTypeDef,
  CreateRequest // the object to be transformed
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

export const Schemas$CreateRequest = {
  in: SchemaIn$CreateRequest,
  out: SchemaOut$CreateRequest,
};
