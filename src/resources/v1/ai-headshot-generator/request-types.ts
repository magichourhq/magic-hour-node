import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1AiHeadshotGeneratorCreateBodyAssets,
  Schemas$V1AiHeadshotGeneratorCreateBodyAssets,
  V1AiHeadshotGeneratorCreateBodyAssets,
} from "magic-hour/types/v1-ai-headshot-generator-create-body-assets";
import {
  External$V1AiHeadshotGeneratorCreateBodyStyle,
  Schemas$V1AiHeadshotGeneratorCreateBodyStyle,
  V1AiHeadshotGeneratorCreateBodyStyle,
} from "magic-hour/types/v1-ai-headshot-generator-create-body-style";

/**
 * CreateRequest
 */
export type CreateRequest = {
  /**
   * Provide the assets for headshot photo
   */
  assets: V1AiHeadshotGeneratorCreateBodyAssets;
  /**
   * The name of image. This value is mainly used for your own identification of the image.
   */
  name?: string | undefined;
  style?: V1AiHeadshotGeneratorCreateBodyStyle | undefined;
};

/**
 * @internal
 * CreateRequest without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$CreateRequest = {
  assets: External$V1AiHeadshotGeneratorCreateBodyAssets;
  name?: string | undefined;
  style?: External$V1AiHeadshotGeneratorCreateBodyStyle | undefined;
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
    assets: Schemas$V1AiHeadshotGeneratorCreateBodyAssets.in,
    name: z.string().optional(),
    style: Schemas$V1AiHeadshotGeneratorCreateBodyStyle.in.optional(),
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
    assets: Schemas$V1AiHeadshotGeneratorCreateBodyAssets.out,
    name: z.string().optional(),
    style: Schemas$V1AiHeadshotGeneratorCreateBodyStyle.out.optional(),
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
