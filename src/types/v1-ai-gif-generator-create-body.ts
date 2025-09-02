import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1AiGifGeneratorCreateBodyStyle,
  Schemas$V1AiGifGeneratorCreateBodyStyle,
  V1AiGifGeneratorCreateBodyStyle,
} from "./v1-ai-gif-generator-create-body-style";

/**
 * V1AiGifGeneratorCreateBody
 */
export type V1AiGifGeneratorCreateBody = {
  /**
   * The name of gif. This value is mainly used for your own identification of the gif.
   */
  name?: string | undefined;
  /**
   * The output file format for the generated animation.
   */
  outputFormat?: ("gif" | "mp4" | "webm") | undefined;
  style: V1AiGifGeneratorCreateBodyStyle;
};

/**
 * @internal
 * V1AiGifGeneratorCreateBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiGifGeneratorCreateBody = {
  name?: string | undefined;
  output_format?: ("gif" | "mp4" | "webm") | undefined;
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
    output_format: z.enum(["gif", "mp4", "webm"]).optional(),
    style: Schemas$V1AiGifGeneratorCreateBodyStyle.in,
  })
  .transform((obj) => {
    return zodTransform(obj, {
      name: "name",
      output_format: "outputFormat",
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
    outputFormat: z.enum(["gif", "mp4", "webm"]).optional(),
    style: Schemas$V1AiGifGeneratorCreateBodyStyle.out,
  })
  .transform((obj) => {
    return zodTransform(obj, {
      name: "name",
      outputFormat: "output_format",
      style: "style",
    });
  });

export const Schemas$V1AiGifGeneratorCreateBody = {
  in: SchemaIn$V1AiGifGeneratorCreateBody,
  out: SchemaOut$V1AiGifGeneratorCreateBody,
};
