import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * The art style to use for image generation.
 */
export type V1AiImageGeneratorCreateBodyStyle = {
  /**
   * The prompt used for the image(s).
   */
  prompt: string;
  /**
   * Controls the quality of the generated image. Defaults to 'standard' if not specified.
   *
   * **Options:**
   * - `standard` - Standard quality generation. Cost: 5 credits per image.
   * - `pro` - Pro quality generation with enhanced details and quality. Cost: 30 credits per image.
   *
   * Note: Pro mode is available for users on Creator, Pro, or Business tier.
   */
  qualityMode?: ("pro" | "standard") | undefined;
  /**
   * The art style to use for image generation. Defaults to 'general' if not provided.
   */
  tool?:
    | (
        | "ai-anime-generator"
        | "ai-art-generator"
        | "ai-background-generator"
        | "ai-character-generator"
        | "ai-face-generator"
        | "ai-fashion-generator"
        | "ai-icon-generator"
        | "ai-illustration-generator"
        | "ai-interior-design-generator"
        | "ai-landscape-generator"
        | "ai-logo-generator"
        | "ai-manga-generator"
        | "ai-outfit-generator"
        | "ai-pattern-generator"
        | "ai-photo-generator"
        | "ai-sketch-generator"
        | "ai-tattoo-generator"
        | "album-cover-generator"
        | "animated-characters-generator"
        | "architecture-generator"
        | "book-cover-generator"
        | "comic-book-generator"
        | "dark-fantasy-ai"
        | "disney-ai-generator"
        | "dnd-ai-art-generator"
        | "emoji-generator"
        | "fantasy-map-generator"
        | "general"
        | "graffiti-generator"
        | "movie-poster-generator"
        | "optical-illusion-generator"
        | "pokemon-generator"
        | "south-park-character-generator"
        | "superhero-generator"
        | "thumbnail-maker"
      )
    | undefined;
};

/**
 * @internal
 * V1AiImageGeneratorCreateBodyStyle without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiImageGeneratorCreateBodyStyle = {
  prompt: string;
  quality_mode?: ("pro" | "standard") | undefined;
  tool?:
    | (
        | "ai-anime-generator"
        | "ai-art-generator"
        | "ai-background-generator"
        | "ai-character-generator"
        | "ai-face-generator"
        | "ai-fashion-generator"
        | "ai-icon-generator"
        | "ai-illustration-generator"
        | "ai-interior-design-generator"
        | "ai-landscape-generator"
        | "ai-logo-generator"
        | "ai-manga-generator"
        | "ai-outfit-generator"
        | "ai-pattern-generator"
        | "ai-photo-generator"
        | "ai-sketch-generator"
        | "ai-tattoo-generator"
        | "album-cover-generator"
        | "animated-characters-generator"
        | "architecture-generator"
        | "book-cover-generator"
        | "comic-book-generator"
        | "dark-fantasy-ai"
        | "disney-ai-generator"
        | "dnd-ai-art-generator"
        | "emoji-generator"
        | "fantasy-map-generator"
        | "general"
        | "graffiti-generator"
        | "movie-poster-generator"
        | "optical-illusion-generator"
        | "pokemon-generator"
        | "south-park-character-generator"
        | "superhero-generator"
        | "thumbnail-maker"
      )
    | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiImageGeneratorCreateBodyStyle
 */
const SchemaIn$V1AiImageGeneratorCreateBodyStyle: z.ZodType<
  V1AiImageGeneratorCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    prompt: z.string(),
    quality_mode: z.enum(["pro", "standard"]).optional(),
    tool: z
      .enum([
        "ai-anime-generator",
        "ai-art-generator",
        "ai-background-generator",
        "ai-character-generator",
        "ai-face-generator",
        "ai-fashion-generator",
        "ai-icon-generator",
        "ai-illustration-generator",
        "ai-interior-design-generator",
        "ai-landscape-generator",
        "ai-logo-generator",
        "ai-manga-generator",
        "ai-outfit-generator",
        "ai-pattern-generator",
        "ai-photo-generator",
        "ai-sketch-generator",
        "ai-tattoo-generator",
        "album-cover-generator",
        "animated-characters-generator",
        "architecture-generator",
        "book-cover-generator",
        "comic-book-generator",
        "dark-fantasy-ai",
        "disney-ai-generator",
        "dnd-ai-art-generator",
        "emoji-generator",
        "fantasy-map-generator",
        "general",
        "graffiti-generator",
        "movie-poster-generator",
        "optical-illusion-generator",
        "pokemon-generator",
        "south-park-character-generator",
        "superhero-generator",
        "thumbnail-maker",
      ])
      .optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      prompt: "prompt",
      quality_mode: "qualityMode",
      tool: "tool",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiImageGeneratorCreateBodyStyle
 */
const SchemaOut$V1AiImageGeneratorCreateBodyStyle: z.ZodType<
  External$V1AiImageGeneratorCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  V1AiImageGeneratorCreateBodyStyle // the object to be transformed
> = z
  .object({
    prompt: z.string(),
    qualityMode: z.enum(["pro", "standard"]).optional(),
    tool: z
      .enum([
        "ai-anime-generator",
        "ai-art-generator",
        "ai-background-generator",
        "ai-character-generator",
        "ai-face-generator",
        "ai-fashion-generator",
        "ai-icon-generator",
        "ai-illustration-generator",
        "ai-interior-design-generator",
        "ai-landscape-generator",
        "ai-logo-generator",
        "ai-manga-generator",
        "ai-outfit-generator",
        "ai-pattern-generator",
        "ai-photo-generator",
        "ai-sketch-generator",
        "ai-tattoo-generator",
        "album-cover-generator",
        "animated-characters-generator",
        "architecture-generator",
        "book-cover-generator",
        "comic-book-generator",
        "dark-fantasy-ai",
        "disney-ai-generator",
        "dnd-ai-art-generator",
        "emoji-generator",
        "fantasy-map-generator",
        "general",
        "graffiti-generator",
        "movie-poster-generator",
        "optical-illusion-generator",
        "pokemon-generator",
        "south-park-character-generator",
        "superhero-generator",
        "thumbnail-maker",
      ])
      .optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      prompt: "prompt",
      qualityMode: "quality_mode",
      tool: "tool",
    });
  });

export const Schemas$V1AiImageGeneratorCreateBodyStyle = {
  in: SchemaIn$V1AiImageGeneratorCreateBodyStyle,
  out: SchemaOut$V1AiImageGeneratorCreateBodyStyle,
};
