import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1AiVoiceClonerCreateBodyAssets,
  Schemas$V1AiVoiceClonerCreateBodyAssets,
  V1AiVoiceClonerCreateBodyAssets,
} from "./v1-ai-voice-cloner-create-body-assets";
import {
  External$V1AiVoiceClonerCreateBodyStyle,
  Schemas$V1AiVoiceClonerCreateBodyStyle,
  V1AiVoiceClonerCreateBodyStyle,
} from "./v1-ai-voice-cloner-create-body-style";

/**
 * V1AiVoiceClonerCreateBody
 */
export type V1AiVoiceClonerCreateBody = {
  /**
   * Provide the assets for voice cloning.
   */
  assets: V1AiVoiceClonerCreateBodyAssets;
  /**
   * The name of audio. This value is mainly used for your own identification of the audio.
   */
  name?: string | undefined;
  style: V1AiVoiceClonerCreateBodyStyle;
};

/**
 * @internal
 * V1AiVoiceClonerCreateBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiVoiceClonerCreateBody = {
  assets: External$V1AiVoiceClonerCreateBodyAssets;
  name?: string | undefined;
  style: External$V1AiVoiceClonerCreateBodyStyle;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiVoiceClonerCreateBody
 */
const SchemaIn$V1AiVoiceClonerCreateBody: z.ZodType<
  V1AiVoiceClonerCreateBody, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    assets: Schemas$V1AiVoiceClonerCreateBodyAssets.in,
    name: z.string().optional(),
    style: Schemas$V1AiVoiceClonerCreateBodyStyle.in,
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      name: "name",
      style: "style",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiVoiceClonerCreateBody
 */
const SchemaOut$V1AiVoiceClonerCreateBody: z.ZodType<
  External$V1AiVoiceClonerCreateBody, // output type of this zod object
  z.ZodTypeDef,
  V1AiVoiceClonerCreateBody // the object to be transformed
> = z
  .object({
    assets: Schemas$V1AiVoiceClonerCreateBodyAssets.out,
    name: z.string().optional(),
    style: Schemas$V1AiVoiceClonerCreateBodyStyle.out,
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      name: "name",
      style: "style",
    });
  });

export const Schemas$V1AiVoiceClonerCreateBody = {
  in: SchemaIn$V1AiVoiceClonerCreateBody,
  out: SchemaOut$V1AiVoiceClonerCreateBody,
};
