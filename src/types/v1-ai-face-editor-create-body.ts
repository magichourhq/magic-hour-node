import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1AiFaceEditorCreateBodyAssets,
  Schemas$V1AiFaceEditorCreateBodyAssets,
  V1AiFaceEditorCreateBodyAssets,
} from "./v1-ai-face-editor-create-body-assets";
import {
  External$V1AiFaceEditorCreateBodyStyle,
  Schemas$V1AiFaceEditorCreateBodyStyle,
  V1AiFaceEditorCreateBodyStyle,
} from "./v1-ai-face-editor-create-body-style";

/**
 * V1AiFaceEditorCreateBody
 */
export type V1AiFaceEditorCreateBody = {
  /**
   * Provide the assets for face editor
   */
  assets: V1AiFaceEditorCreateBodyAssets;
  /**
   * Give your image a custom name for easy identification.
   */
  name?: string | undefined;
  /**
   * Face editing parameters
   */
  style: V1AiFaceEditorCreateBodyStyle;
};

/**
 * @internal
 * V1AiFaceEditorCreateBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiFaceEditorCreateBody = {
  assets: External$V1AiFaceEditorCreateBodyAssets;
  name?: string | undefined;
  style: External$V1AiFaceEditorCreateBodyStyle;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiFaceEditorCreateBody
 */
const SchemaIn$V1AiFaceEditorCreateBody: z.ZodType<
  V1AiFaceEditorCreateBody, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiFaceEditorCreateBody
 */
const SchemaOut$V1AiFaceEditorCreateBody: z.ZodType<
  External$V1AiFaceEditorCreateBody, // output type of this zod object
  z.ZodTypeDef,
  V1AiFaceEditorCreateBody // the object to be transformed
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

export const Schemas$V1AiFaceEditorCreateBody = {
  in: SchemaIn$V1AiFaceEditorCreateBody,
  out: SchemaOut$V1AiFaceEditorCreateBody,
};
