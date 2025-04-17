import {
  External$V1AiMemeGeneratorCreateBodyStyle,
  Schemas$V1AiMemeGeneratorCreateBodyStyle,
  V1AiMemeGeneratorCreateBodyStyle,
} from "./v1-ai-meme-generator-create-body-style";
import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * V1AiMemeGeneratorCreateBody
 */
export type V1AiMemeGeneratorCreateBody = {
  /**
   * The name of the meme.
   */
  name?: string | undefined;
  style: V1AiMemeGeneratorCreateBodyStyle;
};

/**
 * @internal
 * V1AiMemeGeneratorCreateBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiMemeGeneratorCreateBody = {
  name?: string | undefined;
  style: External$V1AiMemeGeneratorCreateBodyStyle;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiMemeGeneratorCreateBody
 */
const SchemaIn$V1AiMemeGeneratorCreateBody: z.ZodType<
  V1AiMemeGeneratorCreateBody, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    name: z.string().optional(),
    style: Schemas$V1AiMemeGeneratorCreateBodyStyle.in,
  })
  .transform((obj) => {
    return zodTransform(obj, {
      name: "name",
      style: "style",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiMemeGeneratorCreateBody
 */
const SchemaOut$V1AiMemeGeneratorCreateBody: z.ZodType<
  External$V1AiMemeGeneratorCreateBody, // output type of this zod object
  z.ZodTypeDef,
  V1AiMemeGeneratorCreateBody // the object to be transformed
> = z
  .object({
    name: z.string().optional(),
    style: Schemas$V1AiMemeGeneratorCreateBodyStyle.out,
  })
  .transform((obj) => {
    return zodTransform(obj, {
      name: "name",
      style: "style",
    });
  });

export const Schemas$V1AiMemeGeneratorCreateBody = {
  in: SchemaIn$V1AiMemeGeneratorCreateBody,
  out: SchemaOut$V1AiMemeGeneratorCreateBody,
};
