import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1AiImageEditorCreateBodyAssets,
  Schemas$V1AiImageEditorCreateBodyAssets,
  V1AiImageEditorCreateBodyAssets,
} from "magic-hour/types/v1-ai-image-editor-create-body-assets";
import {
  External$V1AiImageEditorCreateBodyStyle,
  Schemas$V1AiImageEditorCreateBodyStyle,
  V1AiImageEditorCreateBodyStyle,
} from "magic-hour/types/v1-ai-image-editor-create-body-style";

/**
 * CreateRequest
 */
export type CreateRequest = {
  /**
   * Provide the assets for image edit
   */
  assets: V1AiImageEditorCreateBodyAssets;
  /**
   * Give your image a custom name for easy identification.
   */
  name?: string | undefined;
  style: V1AiImageEditorCreateBodyStyle;
};

/**
 * @internal
 * CreateRequest without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$CreateRequest = {
  assets: External$V1AiImageEditorCreateBodyAssets;
  name?: string | undefined;
  style: External$V1AiImageEditorCreateBodyStyle;
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
    assets: Schemas$V1AiImageEditorCreateBodyAssets.in,
    name: z.string().optional(),
    style: Schemas$V1AiImageEditorCreateBodyStyle.in,
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
    assets: Schemas$V1AiImageEditorCreateBodyAssets.out,
    name: z.string().optional(),
    style: Schemas$V1AiImageEditorCreateBodyStyle.out,
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
