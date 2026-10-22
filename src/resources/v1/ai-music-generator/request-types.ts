import { zodRequiredAny, zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1AiMusicGeneratorCreateBodyStyle,
  Schemas$V1AiMusicGeneratorCreateBodyStyle,
  V1AiMusicGeneratorCreateBodyStyle,
} from "magic-hour/types/v1-ai-music-generator-create-body-style";

/**
 * CreateRequest
 */
export type CreateRequest = {
  /**
   * Requested track duration in seconds, from 15 to 300. Determines credits charged.
   */
  duration: number;
  /**
   * Give your audio a custom name for easy identification.
   */
  name?: string | undefined;
  style: V1AiMusicGeneratorCreateBodyStyle;

  // Index types must also accommodate all defined properties if present (typescript limitation)
  // In reality all additional properties should only have type `any`
  // (there might be some duplication here)
  [additionalProperty: string]:
    | number
    | (string | undefined)
    | V1AiMusicGeneratorCreateBodyStyle
    | any
    | null
    | undefined;
};

/**
 * @internal
 * CreateRequest without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$CreateRequest = {
  duration: number;
  name?: string | undefined;
  style: External$V1AiMusicGeneratorCreateBodyStyle;

  [additionalProperty: string]:
    | number
    | (string | undefined)
    | External$V1AiMusicGeneratorCreateBodyStyle
    | External$CreateRequest
    | null
    | undefined;
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
    duration: z.number().int(),
    name: z.string().optional(),
    style: Schemas$V1AiMusicGeneratorCreateBodyStyle.in,
  })
  .catchall(zodRequiredAny)
  .transform((obj) => {
    return zodTransform(obj, {
      duration: "duration",
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
    duration: z.number().int(),
    name: z.string().optional(),
    style: Schemas$V1AiMusicGeneratorCreateBodyStyle.out,
  })
  .catchall(zodRequiredAny)
  .transform((obj) => {
    return zodTransform(obj, {
      duration: "duration",
      name: "name",
      style: "style",
    });
  });

export const Schemas$CreateRequest = {
  in: SchemaIn$CreateRequest,
  out: SchemaOut$CreateRequest,
};
