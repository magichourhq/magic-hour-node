import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * V1VideoToVideoCreateBodyStyle
 */
export type V1VideoToVideoCreateBodyStyle = {
  artStyle:
    | "3D Render"
    | "Airbender"
    | "Android"
    | "Anime Warrior"
    | "Armored Knight"
    | "Assassin's Creed"
    | "Avatar"
    | "Black Spiderman"
    | "Boba Fett"
    | "Bold Anime"
    | "Celestial Skin"
    | "Chinese Swordsmen"
    | "Clay"
    | "Comic"
    | "Cyberpunk"
    | "Cypher"
    | "Dark Fantasy"
    | "Dragonball Z"
    | "Future Bot"
    | "Futuristic Fantasy"
    | "GTA"
    | "Ghibli Anime"
    | "Ghost"
    | "Gundam"
    | "Hologram"
    | "Illustration"
    | "Impressionism"
    | "Ink"
    | "Ink Poster"
    | "Jinx"
    | "Knight"
    | "Lego"
    | "Link"
    | "Marble"
    | "Mario"
    | "Master Chief"
    | "Mech"
    | "Minecraft"
    | "Mystique"
    | "Naruto"
    | "Neon Dream"
    | "No Art Style"
    | "Oil Painting"
    | "On Fire"
    | "Origami"
    | "Painterly Anime"
    | "Pixar"
    | "Pixel"
    | "Power Armor"
    | "Power Ranger"
    | "Radiant Anime"
    | "Realistic Anime"
    | "Realistic Pixar"
    | "Retro Anime"
    | "Retro Sci-Fi"
    | "Samurai"
    | "Samurai Bot"
    | "Sharp Anime"
    | "Soft Anime"
    | "Solid Snake"
    | "Spartan"
    | "Starfield"
    | "Street Fighter"
    | "Studio Ghibli"
    | "Sub-Zero"
    | "The Void"
    | "Tomb Raider"
    | "Underwater"
    | "Van Gogh"
    | "Viking"
    | "Watercolor"
    | "Western Anime"
    | "Wu Kong"
    | "Wuxia Anime"
    | "Zelda";
  /**
   * * `Dreamshaper` - a good all-around model that works for both animations as well as realism.
   * * `Absolute Reality` - better at realism, but you'll often get similar results with Dreamshaper as well.
   * * `Flat 2D Anime` - best for a flat illustration style that's common in most anime.
   * * `default` - use the default recommended model for the selected art style.
   */
  model?:
    | (
        | "3D Anime"
        | "Absolute Reality"
        | "Dreamshaper"
        | "Flat 2D Anime"
        | "Kaywaii"
        | "Soft Anime"
        | "Western Anime"
        | "default"
      )
    | undefined;
  /**
   * The prompt used for the video. Prompt is required if `prompt_type` is `custom` or `append_default`. If `prompt_type` is `default`, then the `prompt` value passed will be ignored.
   */
  prompt?: string | null | undefined;
  /**
   * * `default` - Use the default recommended prompt for the art style.
   * * `custom` - Only use the prompt passed in the API. Note: for v1, lora prompt will still be auto added to apply the art style properly.
   * * `append_default` - Add the default recommended prompt to the end of the prompt passed in the API.
   */
  promptType?: ("append_default" | "custom" | "default") | undefined;
  /**
   * * `v1` - more detail, closer prompt adherence, and frame-by-frame previews.
   * * `v2` - faster, more consistent, and less noisy.
   * * `default` - use the default version for the selected art style.
   */
  version?: ("default" | "v1" | "v2") | undefined;
};

/**
 * @internal
 * V1VideoToVideoCreateBodyStyle without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1VideoToVideoCreateBodyStyle = {
  art_style:
    | "3D Render"
    | "Airbender"
    | "Android"
    | "Anime Warrior"
    | "Armored Knight"
    | "Assassin's Creed"
    | "Avatar"
    | "Black Spiderman"
    | "Boba Fett"
    | "Bold Anime"
    | "Celestial Skin"
    | "Chinese Swordsmen"
    | "Clay"
    | "Comic"
    | "Cyberpunk"
    | "Cypher"
    | "Dark Fantasy"
    | "Dragonball Z"
    | "Future Bot"
    | "Futuristic Fantasy"
    | "GTA"
    | "Ghibli Anime"
    | "Ghost"
    | "Gundam"
    | "Hologram"
    | "Illustration"
    | "Impressionism"
    | "Ink"
    | "Ink Poster"
    | "Jinx"
    | "Knight"
    | "Lego"
    | "Link"
    | "Marble"
    | "Mario"
    | "Master Chief"
    | "Mech"
    | "Minecraft"
    | "Mystique"
    | "Naruto"
    | "Neon Dream"
    | "No Art Style"
    | "Oil Painting"
    | "On Fire"
    | "Origami"
    | "Painterly Anime"
    | "Pixar"
    | "Pixel"
    | "Power Armor"
    | "Power Ranger"
    | "Radiant Anime"
    | "Realistic Anime"
    | "Realistic Pixar"
    | "Retro Anime"
    | "Retro Sci-Fi"
    | "Samurai"
    | "Samurai Bot"
    | "Sharp Anime"
    | "Soft Anime"
    | "Solid Snake"
    | "Spartan"
    | "Starfield"
    | "Street Fighter"
    | "Studio Ghibli"
    | "Sub-Zero"
    | "The Void"
    | "Tomb Raider"
    | "Underwater"
    | "Van Gogh"
    | "Viking"
    | "Watercolor"
    | "Western Anime"
    | "Wu Kong"
    | "Wuxia Anime"
    | "Zelda";
  model?:
    | (
        | "3D Anime"
        | "Absolute Reality"
        | "Dreamshaper"
        | "Flat 2D Anime"
        | "Kaywaii"
        | "Soft Anime"
        | "Western Anime"
        | "default"
      )
    | undefined;
  prompt?: string | null | undefined;
  prompt_type?: ("append_default" | "custom" | "default") | undefined;
  version?: ("default" | "v1" | "v2") | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1VideoToVideoCreateBodyStyle
 */
const SchemaIn$V1VideoToVideoCreateBodyStyle: z.ZodType<
  V1VideoToVideoCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    art_style: z.enum([
      "3D Render",
      "Airbender",
      "Android",
      "Anime Warrior",
      "Armored Knight",
      "Assassin's Creed",
      "Avatar",
      "Black Spiderman",
      "Boba Fett",
      "Bold Anime",
      "Celestial Skin",
      "Chinese Swordsmen",
      "Clay",
      "Comic",
      "Cyberpunk",
      "Cypher",
      "Dark Fantasy",
      "Dragonball Z",
      "Future Bot",
      "Futuristic Fantasy",
      "GTA",
      "Ghibli Anime",
      "Ghost",
      "Gundam",
      "Hologram",
      "Illustration",
      "Impressionism",
      "Ink",
      "Ink Poster",
      "Jinx",
      "Knight",
      "Lego",
      "Link",
      "Marble",
      "Mario",
      "Master Chief",
      "Mech",
      "Minecraft",
      "Mystique",
      "Naruto",
      "Neon Dream",
      "No Art Style",
      "Oil Painting",
      "On Fire",
      "Origami",
      "Painterly Anime",
      "Pixar",
      "Pixel",
      "Power Armor",
      "Power Ranger",
      "Radiant Anime",
      "Realistic Anime",
      "Realistic Pixar",
      "Retro Anime",
      "Retro Sci-Fi",
      "Samurai",
      "Samurai Bot",
      "Sharp Anime",
      "Soft Anime",
      "Solid Snake",
      "Spartan",
      "Starfield",
      "Street Fighter",
      "Studio Ghibli",
      "Sub-Zero",
      "The Void",
      "Tomb Raider",
      "Underwater",
      "Van Gogh",
      "Viking",
      "Watercolor",
      "Western Anime",
      "Wu Kong",
      "Wuxia Anime",
      "Zelda",
    ]),
    model: z
      .enum([
        "3D Anime",
        "Absolute Reality",
        "Dreamshaper",
        "Flat 2D Anime",
        "Kaywaii",
        "Soft Anime",
        "Western Anime",
        "default",
      ])
      .optional(),
    prompt: z.string().nullable().optional(),
    prompt_type: z.enum(["append_default", "custom", "default"]).optional(),
    version: z.enum(["default", "v1", "v2"]).optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      art_style: "artStyle",
      model: "model",
      prompt: "prompt",
      prompt_type: "promptType",
      version: "version",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1VideoToVideoCreateBodyStyle
 */
const SchemaOut$V1VideoToVideoCreateBodyStyle: z.ZodType<
  External$V1VideoToVideoCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  V1VideoToVideoCreateBodyStyle // the object to be transformed
> = z
  .object({
    artStyle: z.enum([
      "3D Render",
      "Airbender",
      "Android",
      "Anime Warrior",
      "Armored Knight",
      "Assassin's Creed",
      "Avatar",
      "Black Spiderman",
      "Boba Fett",
      "Bold Anime",
      "Celestial Skin",
      "Chinese Swordsmen",
      "Clay",
      "Comic",
      "Cyberpunk",
      "Cypher",
      "Dark Fantasy",
      "Dragonball Z",
      "Future Bot",
      "Futuristic Fantasy",
      "GTA",
      "Ghibli Anime",
      "Ghost",
      "Gundam",
      "Hologram",
      "Illustration",
      "Impressionism",
      "Ink",
      "Ink Poster",
      "Jinx",
      "Knight",
      "Lego",
      "Link",
      "Marble",
      "Mario",
      "Master Chief",
      "Mech",
      "Minecraft",
      "Mystique",
      "Naruto",
      "Neon Dream",
      "No Art Style",
      "Oil Painting",
      "On Fire",
      "Origami",
      "Painterly Anime",
      "Pixar",
      "Pixel",
      "Power Armor",
      "Power Ranger",
      "Radiant Anime",
      "Realistic Anime",
      "Realistic Pixar",
      "Retro Anime",
      "Retro Sci-Fi",
      "Samurai",
      "Samurai Bot",
      "Sharp Anime",
      "Soft Anime",
      "Solid Snake",
      "Spartan",
      "Starfield",
      "Street Fighter",
      "Studio Ghibli",
      "Sub-Zero",
      "The Void",
      "Tomb Raider",
      "Underwater",
      "Van Gogh",
      "Viking",
      "Watercolor",
      "Western Anime",
      "Wu Kong",
      "Wuxia Anime",
      "Zelda",
    ]),
    model: z
      .enum([
        "3D Anime",
        "Absolute Reality",
        "Dreamshaper",
        "Flat 2D Anime",
        "Kaywaii",
        "Soft Anime",
        "Western Anime",
        "default",
      ])
      .optional(),
    prompt: z.string().nullable().optional(),
    promptType: z.enum(["append_default", "custom", "default"]).optional(),
    version: z.enum(["default", "v1", "v2"]).optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      artStyle: "art_style",
      model: "model",
      prompt: "prompt",
      promptType: "prompt_type",
      version: "version",
    });
  });

export const Schemas$V1VideoToVideoCreateBodyStyle = {
  in: SchemaIn$V1VideoToVideoCreateBodyStyle,
  out: SchemaOut$V1VideoToVideoCreateBodyStyle,
};
