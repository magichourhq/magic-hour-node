import {
  External$V1AiGifGeneratorCreateBodyStyle,
  Schemas$V1AiGifGeneratorCreateBodyStyle,
  V1AiGifGeneratorCreateBodyStyle,
} from "./v1-ai-gif-generator-create-body-style";
import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * V1AiGifGeneratorCreateBody
 */
export type V1AiGifGeneratorCreateBody = {
  /**
   * The name of gif
   */
  name?: string | undefined;
  style: V1AiGifGeneratorCreateBodyStyle;
};

/**
 * @internal
 * V1AiGifGeneratorCreateBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiGifGeneratorCreateBody = {
  name?: string | undefined;
  style: External$V1AiGifGeneratorCreateBodyStyle;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiGifGeneratorCreateBody
 */
const SchemaIn$V1AiGifGeneratorCreateBody: z.ZodType<
  V1AiGifGeneratorCreateBody, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    name: z.string().optional(),
    style: Schemas$V1AiGifGeneratorCreateBodyStyle.in,
  })
  .transform((obj) => {
    return zodTransform(obj, {
      name: "name",
      style: "style",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiGifGeneratorCreateBody
 */
const SchemaOut$V1AiGifGeneratorCreateBody: z.ZodType<
  External$V1AiGifGeneratorCreateBody, // output type of this zod object
  z.ZodTypeDef,
  V1AiGifGeneratorCreateBody // the object to be transformed
> = z
  .object({
    name: z.string().optional(),
    style: Schemas$V1AiGifGeneratorCreateBodyStyle.out,
  })
  .transform((obj) => {
    return zodTransform(obj, {
      name: "name",
      style: "style",
    });
  });

export const Schemas$V1AiGifGeneratorCreateBody = {
  in: SchemaIn$V1AiGifGeneratorCreateBody,
  out: SchemaOut$V1AiGifGeneratorCreateBody,
};
