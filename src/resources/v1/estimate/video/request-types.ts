import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * ListRequest
 */
export type ListRequest = {
  /**
   * The `end_seconds` of the create request. Used by every tool.
   */
  endSeconds: number;
  /**
   * The create endpoint to price, named by its path. For example `image-to-video` for `POST /v1/image-to-video`.
   */
  tool:
    | "ai-ugc-ad"
    | "ai-video-editor"
    | "ai-video-translator"
    | "ai-video-upscaler"
    | "audio-to-video"
    | "auto-subtitle-generator"
    | "character-replace"
    | "face-swap"
    | "image-to-video"
    | "text-to-video";
  /**
   * The `audio` of the create request. Used by `image-to-video`, `text-to-video`. Defaults to `false`.
   */
  audio?: boolean | undefined;
  /**
   * Whether any of the create request's `references` is a video. Used by `text-to-video`. Defaults to `false`.
   */
  hasVideoReference?: boolean | undefined;
  /**
   * The `model` of the create request. Used by `image-to-video`, `text-to-video`, `ai-ugc-ad`, `ai-video-editor`, `character-replace`.
   */
  model?: string | undefined;
  /**
   * The `resolution` of the create request. Used by `image-to-video`, `text-to-video`, `ai-ugc-ad`, `ai-video-editor`, `character-replace`, `audio-to-video`, `ai-video-translator`, `ai-video-upscaler`. `ai-video-translator` defaults to `480p`.
   */
  resolution?: string | undefined;
  /**
   * The `start_seconds` of the create request, for tools whose create request has it. Defaults to 0.
   */
  startSeconds?: number | undefined;
};

/**
 * @internal
 * ListRequest without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$ListRequest = {
  end_seconds: number;
  tool:
    | "ai-ugc-ad"
    | "ai-video-editor"
    | "ai-video-translator"
    | "ai-video-upscaler"
    | "audio-to-video"
    | "auto-subtitle-generator"
    | "character-replace"
    | "face-swap"
    | "image-to-video"
    | "text-to-video";
  audio?: boolean | undefined;
  has_video_reference?: boolean | undefined;
  model?: string | undefined;
  resolution?: string | undefined;
  start_seconds?: number | undefined;
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
    end_seconds: z.number(),
    tool: z.enum([
      "ai-ugc-ad",
      "ai-video-editor",
      "ai-video-translator",
      "ai-video-upscaler",
      "audio-to-video",
      "auto-subtitle-generator",
      "character-replace",
      "face-swap",
      "image-to-video",
      "text-to-video",
    ]),
    audio: z.boolean().optional(),
    has_video_reference: z.boolean().optional(),
    model: z.string().optional(),
    resolution: z.string().optional(),
    start_seconds: z.number().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      end_seconds: "endSeconds",
      tool: "tool",
      audio: "audio",
      has_video_reference: "hasVideoReference",
      model: "model",
      resolution: "resolution",
      start_seconds: "startSeconds",
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
    endSeconds: z.number(),
    tool: z.enum([
      "ai-ugc-ad",
      "ai-video-editor",
      "ai-video-translator",
      "ai-video-upscaler",
      "audio-to-video",
      "auto-subtitle-generator",
      "character-replace",
      "face-swap",
      "image-to-video",
      "text-to-video",
    ]),
    audio: z.boolean().optional(),
    hasVideoReference: z.boolean().optional(),
    model: z.string().optional(),
    resolution: z.string().optional(),
    startSeconds: z.number().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      endSeconds: "end_seconds",
      tool: "tool",
      audio: "audio",
      hasVideoReference: "has_video_reference",
      model: "model",
      resolution: "resolution",
      startSeconds: "start_seconds",
    });
  });

export const Schemas$ListRequest = {
  in: SchemaIn$ListRequest,
  out: SchemaOut$ListRequest,
};
