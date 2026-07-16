import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1AiVideoEditorCreateBodyAssets,
  Schemas$V1AiVideoEditorCreateBodyAssets,
  V1AiVideoEditorCreateBodyAssets,
} from "./v1-ai-video-editor-create-body-assets";
import {
  External$V1AiVideoEditorCreateBodyStyle,
  Schemas$V1AiVideoEditorCreateBodyStyle,
  V1AiVideoEditorCreateBodyStyle,
} from "./v1-ai-video-editor-create-body-style";

/**
 * V1AiVideoEditorCreateBody
 */
export type V1AiVideoEditorCreateBody = {
  /**
   * Provide the assets for video editing.
   */
  assets: V1AiVideoEditorCreateBodyAssets;
  /**
   * End time of your clip in seconds. Must be greater than `start_seconds`. Duration must be between 3 and 10 seconds.
   */
  endSeconds: number;
  /**
   * Give your video a custom name for easy identification.
   */
  name?: string | undefined;
  /**
   * Start time of your clip (seconds). Must be ≥ 0.
   */
  startSeconds?: number | undefined;
  style: V1AiVideoEditorCreateBodyStyle;
};

/**
 * @internal
 * V1AiVideoEditorCreateBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiVideoEditorCreateBody = {
  assets: External$V1AiVideoEditorCreateBodyAssets;
  end_seconds: number;
  name?: string | undefined;
  start_seconds?: number | undefined;
  style: External$V1AiVideoEditorCreateBodyStyle;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiVideoEditorCreateBody
 */
const SchemaIn$V1AiVideoEditorCreateBody: z.ZodType<
  V1AiVideoEditorCreateBody, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    assets: Schemas$V1AiVideoEditorCreateBodyAssets.in,
    end_seconds: z.number(),
    name: z.string().optional(),
    start_seconds: z.number().optional(),
    style: Schemas$V1AiVideoEditorCreateBodyStyle.in,
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      end_seconds: "endSeconds",
      name: "name",
      start_seconds: "startSeconds",
      style: "style",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiVideoEditorCreateBody
 */
const SchemaOut$V1AiVideoEditorCreateBody: z.ZodType<
  External$V1AiVideoEditorCreateBody, // output type of this zod object
  z.ZodTypeDef,
  V1AiVideoEditorCreateBody // the object to be transformed
> = z
  .object({
    assets: Schemas$V1AiVideoEditorCreateBodyAssets.out,
    endSeconds: z.number(),
    name: z.string().optional(),
    startSeconds: z.number().optional(),
    style: Schemas$V1AiVideoEditorCreateBodyStyle.out,
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      endSeconds: "end_seconds",
      name: "name",
      startSeconds: "start_seconds",
      style: "style",
    });
  });

export const Schemas$V1AiVideoEditorCreateBody = {
  in: SchemaIn$V1AiVideoEditorCreateBody,
  out: SchemaOut$V1AiVideoEditorCreateBody,
};
