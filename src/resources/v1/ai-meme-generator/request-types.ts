import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1AiMemeGeneratorCreateBodyStyle,
  Schemas$V1AiMemeGeneratorCreateBodyStyle,
  V1AiMemeGeneratorCreateBodyStyle,
} from "magic-hour/types/v1-ai-meme-generator-create-body-style";

/**
 * CreateRequest
 */
export type CreateRequest = {
  /**
   * The name of the meme.
   */
  name?: string | undefined;
  style: V1AiMemeGeneratorCreateBodyStyle;
};

/**
 * @internal
 * CreateRequest without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$CreateRequest = {
  name?: string | undefined;
  style: External$V1AiMemeGeneratorCreateBodyStyle;
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$CreateRequest
 */
const SchemaOut$CreateRequest: z.ZodType<
  External$CreateRequest, // output type of this zod object
  z.ZodTypeDef,
  CreateRequest // the object to be transformed
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

export const Schemas$CreateRequest = {
  in: SchemaIn$CreateRequest,
  out: SchemaOut$CreateRequest,
};
