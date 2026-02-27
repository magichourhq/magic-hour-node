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
   * The aspect ratio of the output image(s). If not specified, defaults to `auto`.
   */
  aspectRatio?:
    | ("16:9" | "1:1" | "2:3" | "3:2" | "4:3" | "4:5" | "9:16" | "auto")
    | undefined;
  /**
   * Provide the assets for image edit
   */
  assets: V1AiImageEditorCreateBodyAssets;
  /**
   * Number of images to generate. Maximum varies by model. Defaults to 1 if not specified.
   */
  imageCount?: number | undefined;
  /**
   * The AI model to use for image editing. Each model has different capabilities and costs.
   *
   * **Models:**
   * - `default` - Use the model we recommend, which will change over time. This is recommended unless you need a specific model. This is the default behavior.
   * - `qwen-edit` - 10 credits/image
   *   - Available for tiers: free, creator, pro, business
   *   - Image count allowed: 1
   *   - Max additional input images: 2
   * - `nano-banana` - 50 credits/image
   *   - Available for tiers: free, creator, pro, business
   *   - Image count allowed: 1
   *   - Max additional input images: 9
   * - `nano-banana-2` - 100 credits/image
   *   - Available for tiers: free, creator, pro, business
   *   - Image count allowed: 1
   *   - Max additional input images: 9
   * - `seedream-v4` - 50 credits/image
   *   - Available for tiers: free, creator, pro, business
   *   - Image count allowed: 1
   *   - Max additional input images: 9
   * - `nano-banana-pro` - 150 credits/image
   *   - Available for tiers: creator, pro, business
   *   - Image count allowed: 1, 4, 9, 16
   *   - Max additional input images: 9
   * - `seedream-v4.5` - 100 credits/image
   *   - Available for tiers: creator, pro, business
   *   - Image count allowed: 1
   *   - Max additional input images: 9
   *
   */
  model?:
    | (
        | "default"
        | "nano-banana"
        | "nano-banana-2"
        | "nano-banana-pro"
        | "qwen-edit"
        | "seedream-v4"
        | "seedream-v4.5"
      )
    | undefined;
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
  aspect_ratio?:
    | ("16:9" | "1:1" | "2:3" | "3:2" | "4:3" | "4:5" | "9:16" | "auto")
    | undefined;
  assets: External$V1AiImageEditorCreateBodyAssets;
  image_count?: number | undefined;
  model?:
    | (
        | "default"
        | "nano-banana"
        | "nano-banana-2"
        | "nano-banana-pro"
        | "qwen-edit"
        | "seedream-v4"
        | "seedream-v4.5"
      )
    | undefined;
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
    aspect_ratio: z
      .enum(["16:9", "1:1", "2:3", "3:2", "4:3", "4:5", "9:16", "auto"])
      .optional(),
    assets: Schemas$V1AiImageEditorCreateBodyAssets.in,
    image_count: z.number().optional(),
    model: z
      .enum([
        "default",
        "nano-banana",
        "nano-banana-2",
        "nano-banana-pro",
        "qwen-edit",
        "seedream-v4",
        "seedream-v4.5",
      ])
      .optional(),
    name: z.string().optional(),
    style: Schemas$V1AiImageEditorCreateBodyStyle.in,
  })
  .transform((obj) => {
    return zodTransform(obj, {
      aspect_ratio: "aspectRatio",
      assets: "assets",
      image_count: "imageCount",
      model: "model",
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
    aspectRatio: z
      .enum(["16:9", "1:1", "2:3", "3:2", "4:3", "4:5", "9:16", "auto"])
      .optional(),
    assets: Schemas$V1AiImageEditorCreateBodyAssets.out,
    imageCount: z.number().optional(),
    model: z
      .enum([
        "default",
        "nano-banana",
        "nano-banana-2",
        "nano-banana-pro",
        "qwen-edit",
        "seedream-v4",
        "seedream-v4.5",
      ])
      .optional(),
    name: z.string().optional(),
    style: Schemas$V1AiImageEditorCreateBodyStyle.out,
  })
  .transform((obj) => {
    return zodTransform(obj, {
      aspectRatio: "aspect_ratio",
      assets: "assets",
      imageCount: "image_count",
      model: "model",
      name: "name",
      style: "style",
    });
  });

export const Schemas$CreateRequest = {
  in: SchemaIn$CreateRequest,
  out: SchemaOut$CreateRequest,
};
