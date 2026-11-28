import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * ListRequest
 */
export type ListRequest = {
  /**
   * The create endpoint to price, named by its path. For example `ai-image-editor` for `POST /v1/ai-image-editor`.
   */
  tool:
    | "ai-clothes-changer"
    | "ai-face-editor"
    | "ai-gif-generator"
    | "ai-headshot-generator"
    | "ai-image-editor"
    | "ai-image-generator"
    | "ai-image-upscaler"
    | "ai-meme-generator"
    | "ai-qr-code-generator"
    | "body-swap"
    | "face-swap-photo"
    | "head-swap"
    | "image-background-remover"
    | "photo-colorizer";
  /**
   * The `image_count` of the create request. Used by `ai-image-generator`, `ai-image-editor`. Defaults to 1.
   */
  imageCount?: number | undefined;
  /**
   * The `style.mode` of the create request. Used by `ai-image-upscaler`. One of `preserve`, `balanced`, `creative`. Defaults to `balanced`.
   */
  mode?: string | undefined;
  /**
   * The `model` of the create request. Used by `ai-image-generator`, `ai-image-editor`.
   */
  model?: string | undefined;
  /**
   * The `resolution` of the create request. Used by `ai-image-generator`, `ai-image-editor`, `body-swap`. One of `640px`, `1k`, `2k`, `4k`.
   */
  resolution?: string | undefined;
  /**
   * The `scale_factor` of the create request. Used by `ai-image-upscaler`. One of `2`, `4`.
   */
  scaleFactor?: number | undefined;
};

/**
 * @internal
 * ListRequest without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$ListRequest = {
  tool:
    | "ai-clothes-changer"
    | "ai-face-editor"
    | "ai-gif-generator"
    | "ai-headshot-generator"
    | "ai-image-editor"
    | "ai-image-generator"
    | "ai-image-upscaler"
    | "ai-meme-generator"
    | "ai-qr-code-generator"
    | "body-swap"
    | "face-swap-photo"
    | "head-swap"
    | "image-background-remover"
    | "photo-colorizer";
  image_count?: number | undefined;
  mode?: string | undefined;
  model?: string | undefined;
  resolution?: string | undefined;
  scale_factor?: number | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object ListRequest
 */
const SchemaIn$ListRequest: z.ZodType<
  ListRequest, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    tool: z.enum([
      "ai-clothes-changer",
      "ai-face-editor",
      "ai-gif-generator",
      "ai-headshot-generator",
      "ai-image-editor",
      "ai-image-generator",
      "ai-image-upscaler",
      "ai-meme-generator",
      "ai-qr-code-generator",
      "body-swap",
      "face-swap-photo",
      "head-swap",
      "image-background-remover",
      "photo-colorizer",
    ]),
    image_count: z.number().int().optional(),
    mode: z.string().optional(),
    model: z.string().optional(),
    resolution: z.string().optional(),
    scale_factor: z.number().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      tool: "tool",
      image_count: "imageCount",
      mode: "mode",
      model: "model",
      resolution: "resolution",
      scale_factor: "scaleFactor",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$ListRequest
 */
const SchemaOut$ListRequest: z.ZodType<
  External$ListRequest, // output type of this zod object
  z.ZodTypeDef,
  ListRequest // the object to be transformed
> = z
  .object({
    tool: z.enum([
      "ai-clothes-changer",
      "ai-face-editor",
      "ai-gif-generator",
      "ai-headshot-generator",
      "ai-image-editor",
      "ai-image-generator",
      "ai-image-upscaler",
      "ai-meme-generator",
      "ai-qr-code-generator",
      "body-swap",
      "face-swap-photo",
      "head-swap",
      "image-background-remover",
      "photo-colorizer",
    ]),
    imageCount: z.number().int().optional(),
    mode: z.string().optional(),
    model: z.string().optional(),
    resolution: z.string().optional(),
    scaleFactor: z.number().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      tool: "tool",
      imageCount: "image_count",
      mode: "mode",
      model: "model",
      resolution: "resolution",
      scaleFactor: "scale_factor",
    });
  });

export const Schemas$ListRequest = {
  in: SchemaIn$ListRequest,
  out: SchemaOut$ListRequest,
};
