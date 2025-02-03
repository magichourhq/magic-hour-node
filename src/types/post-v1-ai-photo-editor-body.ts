import {
  External$PostV1AiPhotoEditorBodyAssets,
  PostV1AiPhotoEditorBodyAssets,
  Schemas$PostV1AiPhotoEditorBodyAssets,
} from "./post-v1-ai-photo-editor-body-assets";
import {
  External$PostV1AiPhotoEditorBodyStyle,
  PostV1AiPhotoEditorBodyStyle,
  Schemas$PostV1AiPhotoEditorBodyStyle,
} from "./post-v1-ai-photo-editor-body-style";
import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * PostV1AiPhotoEditorBody
 */
export type PostV1AiPhotoEditorBody = {
  /**
   * Provide the assets for photo editor
   */
  assets: PostV1AiPhotoEditorBodyAssets;
  /**
   * The name of image
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
  style: PostV1AiPhotoEditorBodyStyle;
};

/**
 * @internal
 * PostV1AiPhotoEditorBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1AiPhotoEditorBody = {
  assets: External$PostV1AiPhotoEditorBodyAssets;
  name?: string | undefined;
  resolution: number;
  steps?: number | undefined;
  style: External$PostV1AiPhotoEditorBodyStyle;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1AiPhotoEditorBody
 */
const SchemaIn$PostV1AiPhotoEditorBody: z.ZodType<
  PostV1AiPhotoEditorBody, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    assets: Schemas$PostV1AiPhotoEditorBodyAssets.in,
    name: z.string().optional(),
    resolution: z.number().int(),
    steps: z.number().int().optional(),
    style: Schemas$PostV1AiPhotoEditorBodyStyle.in,
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1AiPhotoEditorBody
 */
const SchemaOut$PostV1AiPhotoEditorBody: z.ZodType<
  External$PostV1AiPhotoEditorBody, // output type of this zod object
  z.ZodTypeDef,
  PostV1AiPhotoEditorBody // the object to be transformed
> = z
  .object({
    assets: Schemas$PostV1AiPhotoEditorBodyAssets.out,
    name: z.string().optional(),
    resolution: z.number().int(),
    steps: z.number().int().optional(),
    style: Schemas$PostV1AiPhotoEditorBodyStyle.out,
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

export const Schemas$PostV1AiPhotoEditorBody = {
  in: SchemaIn$PostV1AiPhotoEditorBody,
  out: SchemaOut$PostV1AiPhotoEditorBody,
};
