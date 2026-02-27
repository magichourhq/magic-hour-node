import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1AiImageGeneratorCreateBodyStyle,
  Schemas$V1AiImageGeneratorCreateBodyStyle,
  V1AiImageGeneratorCreateBodyStyle,
} from "./v1-ai-image-generator-create-body-style";

/**
 * V1AiImageGeneratorCreateBody
 */
export type V1AiImageGeneratorCreateBody = {
  /**
   * The aspect ratio of the output image(s). If not specified, defaults to `1:1` (square).
   */
  aspectRatio?: ("16:9" | "1:1" | "9:16") | undefined;
  /**
   * Number of images to generate. Maximum varies by model.
   */
  imageCount: number;
  /**
   * The AI model to use for image generation. Each model has different capabilities and costs.
   *
   * **Models:**
   * - `default` - Use the model we recommend, which will change over time. This is recommended unless you need a specific model. This is the default behavior.
   * - `flux-schnell` - 5 credits/image
   *   - Supported resolutions: auto
   *   - Available for tiers: free, creator, pro, business
   *   - Image count allowed: 1, 2, 3, 4
   * - `z-image-turbo` - 5 credits/image
   *   - Supported resolutions: auto, 2k
   *   - Available for tiers: free, creator, pro, business
   *   - Image count allowed: 1, 2, 3, 4
   * - `seedream` - 30 credits/image
   *   - Supported resolutions: auto, 2k, 4k
   *   - Available for tiers: free, creator, pro, business
   *   - Image count allowed: 1, 2, 3, 4
   * - `nano-banana` - 50 credits/image
   *   - Supported resolutions: auto
   *   - Available for tiers: free, creator, pro, business
   *   - Image count allowed: 1, 2, 3, 4
   * - `nano-banana-2` - 100 credits/image
   *   - Supported resolutions: auto
   *   - Available for tiers: free, creator, pro, business
   *   - Image count allowed: 1, 2, 3, 4
   * - `nano-banana-pro` - 150 credits/image
   *   - Supported resolutions: auto
   *   - Available for tiers: creator, pro, business
   *   - Image count allowed: 1, 4, 9, 16
   *
   */
  model?:
    | (
        | "default"
        | "flux-schnell"
        | "nano-banana"
        | "nano-banana-2"
        | "nano-banana-pro"
        | "seedream"
        | "z-image-turbo"
      )
    | undefined;
  /**
   * Give your image a custom name for easy identification.
   */
  name?: string | undefined;
  /**
   * DEPRECATED: Use `aspect_ratio` instead.
   *
   * The orientation of the output image(s). `aspect_ratio` takes precedence when `orientation` if both are provided.
   */
  orientation?: ("landscape" | "portrait" | "square") | undefined;
  /**
   * Maximum resolution for the generated image.
   *
   * **Options:**
   * - `auto` - Automatic resolution (all tiers, default)
   * - `2k` - Up to 2048px (requires Pro or Business tier)
   * - `4k` - Up to 4096px (requires Business tier)
   *
   * Note: Resolution availability depends on the model and your subscription tier. See `model` field for which resolutions each model supports. Defaults to `auto` if not specified.
   */
  resolution?: ("2k" | "4k" | "auto") | undefined;
  /**
   * The art style to use for image generation.
   */
  style: V1AiImageGeneratorCreateBodyStyle;
};

/**
 * @internal
 * V1AiImageGeneratorCreateBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiImageGeneratorCreateBody = {
  aspect_ratio?: ("16:9" | "1:1" | "9:16") | undefined;
  image_count: number;
  model?:
    | (
        | "default"
        | "flux-schnell"
        | "nano-banana"
        | "nano-banana-2"
        | "nano-banana-pro"
        | "seedream"
        | "z-image-turbo"
      )
    | undefined;
  name?: string | undefined;
  orientation?: ("landscape" | "portrait" | "square") | undefined;
  resolution?: ("2k" | "4k" | "auto") | undefined;
  style: External$V1AiImageGeneratorCreateBodyStyle;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiImageGeneratorCreateBody
 */
const SchemaIn$V1AiImageGeneratorCreateBody: z.ZodType<
  V1AiImageGeneratorCreateBody, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    aspect_ratio: z.enum(["16:9", "1:1", "9:16"]).optional(),
    image_count: z.number().int(),
    model: z
      .enum([
        "default",
        "flux-schnell",
        "nano-banana",
        "nano-banana-2",
        "nano-banana-pro",
        "seedream",
        "z-image-turbo",
      ])
      .optional(),
    name: z.string().optional(),
    orientation: z.enum(["landscape", "portrait", "square"]).optional(),
    resolution: z.enum(["2k", "4k", "auto"]).optional(),
    style: Schemas$V1AiImageGeneratorCreateBodyStyle.in,
  })
  .transform((obj) => {
    return zodTransform(obj, {
      aspect_ratio: "aspectRatio",
      image_count: "imageCount",
      model: "model",
      name: "name",
      orientation: "orientation",
      resolution: "resolution",
      style: "style",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiImageGeneratorCreateBody
 */
const SchemaOut$V1AiImageGeneratorCreateBody: z.ZodType<
  External$V1AiImageGeneratorCreateBody, // output type of this zod object
  z.ZodTypeDef,
  V1AiImageGeneratorCreateBody // the object to be transformed
> = z
  .object({
    aspectRatio: z.enum(["16:9", "1:1", "9:16"]).optional(),
    imageCount: z.number().int(),
    model: z
      .enum([
        "default",
        "flux-schnell",
        "nano-banana",
        "nano-banana-2",
        "nano-banana-pro",
        "seedream",
        "z-image-turbo",
      ])
      .optional(),
    name: z.string().optional(),
    orientation: z.enum(["landscape", "portrait", "square"]).optional(),
    resolution: z.enum(["2k", "4k", "auto"]).optional(),
    style: Schemas$V1AiImageGeneratorCreateBodyStyle.out,
  })
  .transform((obj) => {
    return zodTransform(obj, {
      aspectRatio: "aspect_ratio",
      imageCount: "image_count",
      model: "model",
      name: "name",
      orientation: "orientation",
      resolution: "resolution",
      style: "style",
    });
  });

export const Schemas$V1AiImageGeneratorCreateBody = {
  in: SchemaIn$V1AiImageGeneratorCreateBody,
  out: SchemaOut$V1AiImageGeneratorCreateBody,
};
