import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1AiFaceEditorCreateBodyAssets,
  Schemas$V1AiFaceEditorCreateBodyAssets,
  V1AiFaceEditorCreateBodyAssets,
} from "magic-hour/types/v1-ai-face-editor-create-body-assets";
import {
  External$V1AiFaceEditorCreateBodyStyle,
  Schemas$V1AiFaceEditorCreateBodyStyle,
  V1AiFaceEditorCreateBodyStyle,
} from "magic-hour/types/v1-ai-face-editor-create-body-style";

/**
 * CreateRequest
 */
export type CreateRequest = {
  /**
   * Provide the assets for face editor
   */
  assets: V1AiFaceEditorCreateBodyAssets;
  /**
   * The name of image. This value is mainly used for your own identification of the image.
   */
  name?: string | undefined;
  /**
   * Face editing parameters
   */
  style: V1AiFaceEditorCreateBodyStyle;
};

/**
 * @internal
 * CreateRequest without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$CreateRequest = {
  assets: External$V1AiFaceEditorCreateBodyAssets;
  name?: string | undefined;
  style: External$V1AiFaceEditorCreateBodyStyle;
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
    assets: Schemas$V1AiFaceEditorCreateBodyAssets.in,
    name: z.string().optional(),
    style: Schemas$V1AiFaceEditorCreateBodyStyle.in,
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
    assets: Schemas$V1AiFaceEditorCreateBodyAssets.out,
    name: z.string().optional(),
    style: Schemas$V1AiFaceEditorCreateBodyStyle.out,
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
