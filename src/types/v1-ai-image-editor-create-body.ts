import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1AiImageEditorCreateBodyAssets,
  Schemas$V1AiImageEditorCreateBodyAssets,
  V1AiImageEditorCreateBodyAssets,
} from "./v1-ai-image-editor-create-body-assets";
import {
  External$V1AiImageEditorCreateBodyStyle,
  Schemas$V1AiImageEditorCreateBodyStyle,
  V1AiImageEditorCreateBodyStyle,
} from "./v1-ai-image-editor-create-body-style";

/**
 * V1AiImageEditorCreateBody
 */
export type V1AiImageEditorCreateBody = {
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
   * - `qwen-edit` - from 10 credits/image
   *   - Supported resolutions: 640px, 1k, 2k
   *   - Available for tiers: free, creator, pro, business
   *   - Max additional input images: 2
   * - `nano-banana` - from 50 credits/image
   *   - Supported resolutions: 640px, 1k
   *   - Available for tiers: free, creator, pro, business
   *   - Max additional input images: 9
   * - `nano-banana-2` - from 100 credits/image
   *   - Supported resolutions: 640px, 1k, 2k, 4k
   *   - Available for tiers: free, creator, pro, business
   *   - Max additional input images: 9
   * - `seedream-v4` - from 40 credits/image
   *   - Supported resolutions: 640px, 1k, 2k, 4k
   *   - Available for tiers: free, creator, pro, business
   *   - Max additional input images: 9
   * - `nano-banana-pro` - from 150 credits/image
   *   - Supported resolutions: 1k, 2k, 4k
   *   - Available for tiers: creator, pro, business
   *   - Max additional input images: 9
   * - `seedream-v4.5` - from 50 credits/image
   *   - Supported resolutions: 640px, 1k, 2k, 4k
   *   - Available for tiers: creator, pro, business
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
  /**
   * Maximum resolution (longest edge) for the output image.
   *
   * **Options:**
   * - `640px` — up to 640px
   * - `1k` — up to 1024px
   * - `2k` — up to 2048px
   * - `4k` — up to 4096px
   * - `auto` — **Deprecated.** Mapped server-side from your subscription tier to the best matching resolution the model supports
   *
   * **Per-model support:**
   * - `qwen-edit` - 640px, 1k, 2k
   * - `nano-banana` - 640px, 1k
   * - `nano-banana-2` - 640px, 1k, 2k, 4k
   * - `seedream-v4` - 640px, 1k, 2k, 4k
   * - `nano-banana-pro` - 1k, 2k, 4k
   * - `seedream-v4.5` - 640px, 1k, 2k, 4k
   *
   * Note: Resolution availability depends on the model and your subscription tier.
   */
  resolution?: ("1k" | "2k" | "4k" | "640px" | "auto") | undefined;
  style: V1AiImageEditorCreateBodyStyle;
};

/**
 * @internal
 * V1AiImageEditorCreateBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiImageEditorCreateBody = {
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
  resolution?: ("1k" | "2k" | "4k" | "640px" | "auto") | undefined;
  style: External$V1AiImageEditorCreateBodyStyle;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiImageEditorCreateBody
 */
const SchemaIn$V1AiImageEditorCreateBody: z.ZodType<
  V1AiImageEditorCreateBody, // output type of this zod object
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
    resolution: z.enum(["1k", "2k", "4k", "640px", "auto"]).optional(),
    style: Schemas$V1AiImageEditorCreateBodyStyle.in,
  })
  .transform((obj) => {
    return zodTransform(obj, {
      aspect_ratio: "aspectRatio",
      assets: "assets",
      image_count: "imageCount",
      model: "model",
      name: "name",
      resolution: "resolution",
      style: "style",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiImageEditorCreateBody
 */
const SchemaOut$V1AiImageEditorCreateBody: z.ZodType<
  External$V1AiImageEditorCreateBody, // output type of this zod object
  z.ZodTypeDef,
  V1AiImageEditorCreateBody // the object to be transformed
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
    resolution: z.enum(["1k", "2k", "4k", "640px", "auto"]).optional(),
    style: Schemas$V1AiImageEditorCreateBodyStyle.out,
  })
  .transform((obj) => {
    return zodTransform(obj, {
      aspectRatio: "aspect_ratio",
      assets: "assets",
      imageCount: "image_count",
      model: "model",
      name: "name",
      resolution: "resolution",
      style: "style",
    });
  });

export const Schemas$V1AiImageEditorCreateBody = {
  in: SchemaIn$V1AiImageEditorCreateBody,
  out: SchemaOut$V1AiImageEditorCreateBody,
};
