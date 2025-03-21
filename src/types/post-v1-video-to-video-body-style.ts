import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * PostV1VideoToVideoBodyStyle
 */
export type PostV1VideoToVideoBodyStyle = {
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
    | "Celestial Skin"
    | "Clay"
    | "Comic"
    | "Cyberpunk"
    | "Cypher"
    | "Dark Fantasy"
    | "Dragonball Z"
    | "Future Bot"
    | "Futuristic Fantasy"
    | "GTA"
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
    | "Master Chief"
    | "Mech"
    | "Minecraft"
    | "Naruto"
    | "Neon Dream"
    | "Oil Painting"
    | "On Fire"
    | "Origami"
    | "Pixel"
    | "Power Armor"
    | "Power Ranger"
    | "Retro Anime"
    | "Retro Sci-Fi"
    | "Samurai"
    | "Samurai Bot"
    | "Solid Snake"
    | "Spartan"
    | "Starfield"
    | "Street Fighter"
    | "Studio Ghibli"
    | "Sub-Zero"
    | "The Void"
    | "Underwater"
    | "Van Gogh"
    | "Viking"
    | "Watercolor"
    | "Wu Kong"
    | "Zelda";
  /**
   * * `Dreamshaper` - a good all-around model that works for both animations as well as realism.
   * * `Absolute Reality` - better at realism, but you'll often get similar results with Dreamshaper as well.
   * * `Flat 2D Anime` - best for a flat illustration style that's common in most anime.
   * * `default` - use the default recommended model for the selected art style.
   */
  model: "Absolute Reality" | "Dreamshaper" | "Flat 2D Anime" | "default";
  /**
   * The prompt used for the video. Prompt is required if `prompt_type` is `custom` or `append_default`. If `prompt_type` is `default`, then the `prompt` value passed will be ignored.
   */
  prompt: string | null;
  /**
   * * `default` - Use the default recommended prompt for the art style.
   * * `custom` - Only use the prompt passed in the API. Note: for v1, lora prompt will still be auto added to apply the art style properly.
   * * `append_default` - Add the default recommended prompt to the end of the prompt passed in the API.
   */
  promptType: "append_default" | "custom" | "default";
  /**
   * * `v1` - more detail, closer prompt adherence, and frame-by-frame previews.
   * * `v2` - faster, more consistent, and less noisy.
   * * `default` - use the default version for the selected art style.
   */
  version: "default" | "v1" | "v2";
};

/**
 * @internal
 * PostV1VideoToVideoBodyStyle without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1VideoToVideoBodyStyle = {
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
    | "Celestial Skin"
    | "Clay"
    | "Comic"
    | "Cyberpunk"
    | "Cypher"
    | "Dark Fantasy"
    | "Dragonball Z"
    | "Future Bot"
    | "Futuristic Fantasy"
    | "GTA"
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
    | "Master Chief"
    | "Mech"
    | "Minecraft"
    | "Naruto"
    | "Neon Dream"
    | "Oil Painting"
    | "On Fire"
    | "Origami"
    | "Pixel"
    | "Power Armor"
    | "Power Ranger"
    | "Retro Anime"
    | "Retro Sci-Fi"
    | "Samurai"
    | "Samurai Bot"
    | "Solid Snake"
    | "Spartan"
    | "Starfield"
    | "Street Fighter"
    | "Studio Ghibli"
    | "Sub-Zero"
    | "The Void"
    | "Underwater"
    | "Van Gogh"
    | "Viking"
    | "Watercolor"
    | "Wu Kong"
    | "Zelda";
  model: "Absolute Reality" | "Dreamshaper" | "Flat 2D Anime" | "default";
  prompt: string | null;
  prompt_type: "append_default" | "custom" | "default";
  version: "default" | "v1" | "v2";
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1VideoToVideoBodyStyle
 */
const SchemaIn$PostV1VideoToVideoBodyStyle: z.ZodType<
  PostV1VideoToVideoBodyStyle, // output type of this zod object
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
      "Celestial Skin",
      "Clay",
      "Comic",
      "Cyberpunk",
      "Cypher",
      "Dark Fantasy",
      "Dragonball Z",
      "Future Bot",
      "Futuristic Fantasy",
      "GTA",
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
      "Master Chief",
      "Mech",
      "Minecraft",
      "Naruto",
      "Neon Dream",
      "Oil Painting",
      "On Fire",
      "Origami",
      "Pixel",
      "Power Armor",
      "Power Ranger",
      "Retro Anime",
      "Retro Sci-Fi",
      "Samurai",
      "Samurai Bot",
      "Solid Snake",
      "Spartan",
      "Starfield",
      "Street Fighter",
      "Studio Ghibli",
      "Sub-Zero",
      "The Void",
      "Underwater",
      "Van Gogh",
      "Viking",
      "Watercolor",
      "Wu Kong",
      "Zelda",
    ]),
    model: z.enum([
      "Absolute Reality",
      "Dreamshaper",
      "Flat 2D Anime",
      "default",
    ]),
    prompt: z.string().nullable(),
    prompt_type: z.enum(["append_default", "custom", "default"]),
    version: z.enum(["default", "v1", "v2"]),
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1VideoToVideoBodyStyle
 */
const SchemaOut$PostV1VideoToVideoBodyStyle: z.ZodType<
  External$PostV1VideoToVideoBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  PostV1VideoToVideoBodyStyle // the object to be transformed
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
      "Celestial Skin",
      "Clay",
      "Comic",
      "Cyberpunk",
      "Cypher",
      "Dark Fantasy",
      "Dragonball Z",
      "Future Bot",
      "Futuristic Fantasy",
      "GTA",
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
      "Master Chief",
      "Mech",
      "Minecraft",
      "Naruto",
      "Neon Dream",
      "Oil Painting",
      "On Fire",
      "Origami",
      "Pixel",
      "Power Armor",
      "Power Ranger",
      "Retro Anime",
      "Retro Sci-Fi",
      "Samurai",
      "Samurai Bot",
      "Solid Snake",
      "Spartan",
      "Starfield",
      "Street Fighter",
      "Studio Ghibli",
      "Sub-Zero",
      "The Void",
      "Underwater",
      "Van Gogh",
      "Viking",
      "Watercolor",
      "Wu Kong",
      "Zelda",
    ]),
    model: z.enum([
      "Absolute Reality",
      "Dreamshaper",
      "Flat 2D Anime",
      "default",
    ]),
    prompt: z.string().nullable(),
    promptType: z.enum(["append_default", "custom", "default"]),
    version: z.enum(["default", "v1", "v2"]),
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

export const Schemas$PostV1VideoToVideoBodyStyle = {
  in: SchemaIn$PostV1VideoToVideoBodyStyle,
  out: SchemaOut$PostV1VideoToVideoBodyStyle,
};
