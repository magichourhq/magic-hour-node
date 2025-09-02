import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1AiPhotoEditorCreateBodyAssets,
  Schemas$V1AiPhotoEditorCreateBodyAssets,
  V1AiPhotoEditorCreateBodyAssets,
} from "./v1-ai-photo-editor-create-body-assets";
import {
  External$V1AiPhotoEditorCreateBodyStyle,
  Schemas$V1AiPhotoEditorCreateBodyStyle,
  V1AiPhotoEditorCreateBodyStyle,
} from "./v1-ai-photo-editor-create-body-style";

/**
 * V1AiPhotoEditorCreateBody
 */
export type V1AiPhotoEditorCreateBody = {
  /**
   * Provide the assets for photo editor
   */
  assets: V1AiPhotoEditorCreateBodyAssets;
  /**
   * The name of image. This value is mainly used for your own identification of the image.
   */
  name?: string | undefined;
  /**
   * The resolution of the final output image. The allowed value is based on your subscription. Please refer to our [pricing page](https://magichour.ai/pricing) for more details
   */
  resolution: number;
  /**
   * Deprecated: Please use `.style.steps` instead. Number of iterations used to generate the output. Higher values improve quality and increase the strength of the prompt but increase processing time.
   */
  steps?: number | undefined;
  style: V1AiPhotoEditorCreateBodyStyle;
};

/**
 * @internal
 * V1AiPhotoEditorCreateBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiPhotoEditorCreateBody = {
  assets: External$V1AiPhotoEditorCreateBodyAssets;
  name?: string | undefined;
  resolution: number;
  steps?: number | undefined;
  style: External$V1AiPhotoEditorCreateBodyStyle;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiPhotoEditorCreateBody
 */
const SchemaIn$V1AiPhotoEditorCreateBody: z.ZodType<
  V1AiPhotoEditorCreateBody, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    assets: Schemas$V1AiPhotoEditorCreateBodyAssets.in,
    name: z.string().optional(),
    resolution: z.number().int(),
    steps: z.number().int().optional(),
    style: Schemas$V1AiPhotoEditorCreateBodyStyle.in,
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      name: "name",
      resolution: "resolution",
      steps: "steps",
      style: "style",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiPhotoEditorCreateBody
 */
const SchemaOut$V1AiPhotoEditorCreateBody: z.ZodType<
  External$V1AiPhotoEditorCreateBody, // output type of this zod object
  z.ZodTypeDef,
  V1AiPhotoEditorCreateBody // the object to be transformed
> = z
  .object({
    assets: Schemas$V1AiPhotoEditorCreateBodyAssets.out,
    name: z.string().optional(),
    resolution: z.number().int(),
    steps: z.number().int().optional(),
    style: Schemas$V1AiPhotoEditorCreateBodyStyle.out,
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      name: "name",
      resolution: "resolution",
      steps: "steps",
      style: "style",
    });
  });

export const Schemas$V1AiPhotoEditorCreateBody = {
  in: SchemaIn$V1AiPhotoEditorCreateBody,
  out: SchemaOut$V1AiPhotoEditorCreateBody,
};
