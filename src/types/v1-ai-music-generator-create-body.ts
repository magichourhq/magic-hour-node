import { zodRequiredAny, zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1AiMusicGeneratorCreateBodyStyle,
  Schemas$V1AiMusicGeneratorCreateBodyStyle,
  V1AiMusicGeneratorCreateBodyStyle,
} from "./v1-ai-music-generator-create-body-style";

/**
 * V1AiMusicGeneratorCreateBody
 */
export type V1AiMusicGeneratorCreateBody = {
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
 * V1AiMusicGeneratorCreateBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiMusicGeneratorCreateBody = {
  duration: number;
  name?: string | undefined;
  style: External$V1AiMusicGeneratorCreateBodyStyle;

  [additionalProperty: string]:
    | number
    | (string | undefined)
    | External$V1AiMusicGeneratorCreateBodyStyle
    | External$V1AiMusicGeneratorCreateBody
    | null
    | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiMusicGeneratorCreateBody
 */
const SchemaIn$V1AiMusicGeneratorCreateBody: z.ZodType<
  V1AiMusicGeneratorCreateBody, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiMusicGeneratorCreateBody
 */
const SchemaOut$V1AiMusicGeneratorCreateBody: z.ZodType<
  External$V1AiMusicGeneratorCreateBody, // output type of this zod object
  z.ZodTypeDef,
  V1AiMusicGeneratorCreateBody // the object to be transformed
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

export const Schemas$V1AiMusicGeneratorCreateBody = {
  in: SchemaIn$V1AiMusicGeneratorCreateBody,
  out: SchemaOut$V1AiMusicGeneratorCreateBody,
};
