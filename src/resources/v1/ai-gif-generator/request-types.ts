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
   * The name of gif. This value is mainly used for your own identification of the gif.
   */
  name?: string | undefined;
  style: V1AiGifGeneratorCreateBodyStyle;
};

/**
 * @internal
 * CreateRequest without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$CreateRequest = {
  name?: string | undefined;
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$CreateRequest
 */
const SchemaOut$CreateRequest: z.ZodType<
  External$CreateRequest, // output type of this zod object
  z.ZodTypeDef,
  CreateRequest // the object to be transformed
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

export const Schemas$CreateRequest = {
  in: SchemaIn$CreateRequest,
  out: SchemaOut$CreateRequest,
};
