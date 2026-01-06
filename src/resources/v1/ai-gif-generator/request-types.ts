import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1AiGifGeneratorCreateBodyStyle,
  Schemas$V1AiGifGeneratorCreateBodyStyle,
  V1AiGifGeneratorCreateBodyStyle,
} from "magic-hour/types/v1-ai-gif-generator-create-body-style";

/**
 * CreateRequest
 */
export type CreateRequest = {
  /**
   * Give your gif a custom name for easy identification.
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
 * CreateRequest without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$CreateRequest = {
  name?: string | undefined;
  output_format?: ("gif" | "mp4" | "webm") | undefined;
  style: External$V1AiGifGeneratorCreateBodyStyle;
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$CreateRequest
 */
const SchemaOut$CreateRequest: z.ZodType<
  External$CreateRequest, // output type of this zod object
  z.ZodTypeDef,
  CreateRequest // the object to be transformed
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

export const Schemas$CreateRequest = {
  in: SchemaIn$CreateRequest,
  out: SchemaOut$CreateRequest,
};
