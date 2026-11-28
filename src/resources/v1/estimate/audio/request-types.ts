import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * ListRequest
 */
export type ListRequest = {
  /**
   * The create endpoint to price, named by its path. For example `ai-voice-generator` for `POST /v1/ai-voice-generator`.
   */
  tool: "ai-music-generator" | "ai-voice-cloner" | "ai-voice-generator";
  /**
   * The number of characters in the `style.prompt` of the create request. Used by `ai-voice-generator`, `ai-voice-cloner`.
   */
  characterCount?: number | undefined;
  /**
   * The `duration` of the create request. Used by `ai-music-generator`.
   */
  duration?: number | undefined;
};

/**
 * @internal
 * ListRequest without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$ListRequest = {
  tool: "ai-music-generator" | "ai-voice-cloner" | "ai-voice-generator";
  character_count?: number | undefined;
  duration?: number | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object ListRequest
 */
const SchemaIn$ListRequest: z.ZodType<
  ListRequest, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    tool: z.enum([
      "ai-music-generator",
      "ai-voice-cloner",
      "ai-voice-generator",
    ]),
    character_count: z.number().int().optional(),
    duration: z.number().int().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      tool: "tool",
      character_count: "characterCount",
      duration: "duration",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$ListRequest
 */
const SchemaOut$ListRequest: z.ZodType<
  External$ListRequest, // output type of this zod object
  z.ZodTypeDef,
  ListRequest // the object to be transformed
> = z
  .object({
    tool: z.enum([
      "ai-music-generator",
      "ai-voice-cloner",
      "ai-voice-generator",
    ]),
    characterCount: z.number().int().optional(),
    duration: z.number().int().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      tool: "tool",
      characterCount: "character_count",
      duration: "duration",
    });
  });

export const Schemas$ListRequest = {
  in: SchemaIn$ListRequest,
  out: SchemaOut$ListRequest,
};
