import { zodTransform } from "magic-hour/core";
import {
  External$PostV1AiPhotoEditorBodyAssets,
  PostV1AiPhotoEditorBodyAssets,
  Schemas$PostV1AiPhotoEditorBodyAssets,
} from "magic-hour/types/post-v1-ai-photo-editor-body-assets";
import {
  External$PostV1AiPhotoEditorBodyStyle,
  PostV1AiPhotoEditorBodyStyle,
  Schemas$PostV1AiPhotoEditorBodyStyle,
} from "magic-hour/types/post-v1-ai-photo-editor-body-style";
import * as z from "zod";

/**
 * CreateRequest
 */
export type CreateRequest = {
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
 * CreateRequest without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$CreateRequest = {
  assets: External$PostV1AiPhotoEditorBodyAssets;
  name?: string | undefined;
  resolution: number;
  steps?: number | undefined;
  style: External$PostV1AiPhotoEditorBodyStyle;
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$CreateRequest
 */
const SchemaOut$CreateRequest: z.ZodType<
  External$CreateRequest, // output type of this zod object
  z.ZodTypeDef,
  CreateRequest // the object to be transformed
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

export const Schemas$CreateRequest = {
  in: SchemaIn$CreateRequest,
  out: SchemaOut$CreateRequest,
};
