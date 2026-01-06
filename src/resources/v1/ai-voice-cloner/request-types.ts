import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1AiVoiceClonerCreateBodyAssets,
  Schemas$V1AiVoiceClonerCreateBodyAssets,
  V1AiVoiceClonerCreateBodyAssets,
} from "magic-hour/types/v1-ai-voice-cloner-create-body-assets";
import {
  External$V1AiVoiceClonerCreateBodyStyle,
  Schemas$V1AiVoiceClonerCreateBodyStyle,
  V1AiVoiceClonerCreateBodyStyle,
} from "magic-hour/types/v1-ai-voice-cloner-create-body-style";

/**
 * CreateRequest
 */
export type CreateRequest = {
  /**
   * Provide the assets for voice cloning.
   */
  assets: V1AiVoiceClonerCreateBodyAssets;
  /**
   * Give your audio a custom name for easy identification.
   */
  name?: string | undefined;
  style: V1AiVoiceClonerCreateBodyStyle;
};

/**
 * @internal
 * CreateRequest without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$CreateRequest = {
  assets: External$V1AiVoiceClonerCreateBodyAssets;
  name?: string | undefined;
  style: External$V1AiVoiceClonerCreateBodyStyle;
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$CreateRequest
 */
const SchemaOut$CreateRequest: z.ZodType<
  External$CreateRequest, // output type of this zod object
  z.ZodTypeDef,
  CreateRequest // the object to be transformed
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

export const Schemas$CreateRequest = {
  in: SchemaIn$CreateRequest,
  out: SchemaOut$CreateRequest,
};
