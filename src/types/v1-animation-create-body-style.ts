import * as z from "zod";

import { zodTransform } from "magic-hour/core";

/**
 * Defines the style of the output video
 */
export type V1AnimationCreateBodyStyle = {
  /**
   * The art style used to create the output video
   */
  artStyle:
    | "3D Render"
    | "90s Streets"
    | "Abstract Minimalist"
    | "Arcane"
    | "Art Deco"
    | "Bold Colored Illustration"
    | "Cinematic Landscape"
    | "Cinematic Miyazaki"
    | "Cosmic"
    | "Cubist"
    | "Custom"
    | "Cyberpunk"
    | "Dark Graphic Illustration"
    | "Dark Watercolor"
    | "Directed by AI"
    | "Double Exposure"
    | "Faded Illustration"
    | "Fantasy"
    | "Futuristic Anime"
    | "Impressionism"
    | "Ink and Watercolor Portrait"
    | "Inkpunk"
    | "Intricate Abstract Lines Portrait"
    | "Jackson Pollock"
    | "Landscape Painting"
    | "Low Poly"
    | "Miniatures"
    | "Minimal Cold Futurism"
    | "Oil Painting"
    | "Old School Comic"
    | "Overgrown"
    | "Painted Cityscape"
    | "Painterly Illustration"
    | "Photograph"
    | "Pixar"
    | "Pixel Art"
    | "Postapocalyptic"
    | "Sin City"
    | "Soft Delicate Matte Portrait"
    | "Spooky"
    | "Studio Ghibli Film Still"
    | "Synthwave"
    | "Traditional Watercolor"
    | "Van Gogh"
    | "Vibrant Matte Illustration"
    | "Vintage Japanese Anime"
    | "Woodcut";
  /**
   * Describe custom art style. This field is required if `art_style` is `Custom`
   */
  artStyleCustom?: string | undefined;
  /**
   * The camera effect used to create the output video
   */
  cameraEffect:
    | "Accelerate"
    | "Aggressive Zoom In - Audio Sync"
    | "Aggressive Zoom Out - Audio Sync"
    | "Boost Zoom In"
    | "Boost Zoom Out"
    | "Bounce In And Out"
    | "Bounce Out"
    | "Bounce Out - Audio Sync"
    | "Bounce and Spin - Audio Sync"
    | "Bounce in Place"
    | "Cog in the Machine"
    | "Devolve - Audio Sync"
    | "Directed by AI"
    | "Dramatic Zoom In"
    | "Dramatic Zoom Out"
    | "Drift Spin"
    | "Earthquake Bounce"
    | "Earthquake Bounce - Audio Sync"
    | "Evolve - Audio Sync"
    | "Heartbeat"
    | "Hesitate In"
    | "Jump"
    | "Pan Left"
    | "Pan Right"
    | "Pulse - Audio Sync"
    | "Pusher"
    | "Pusher - Audio Sync"
    | "Quadrant"
    | "Rise and Climb"
    | "Road Trip"
    | "Rodeo"
    | "Roll In"
    | "Roll In - Audio Sync"
    | "Rolling Bounces"
    | "Rubber Band"
    | "Simple Zoom In"
    | "Simple Zoom Out"
    | "Slice Bounce"
    | "Slideshow"
    | "Speed of Light"
    | "Spin Bounce"
    | "Sway Out"
    | "Sway Out - Audio Sync"
    | "Tilt Down"
    | "Tilt Up"
    | "Traverse"
    | "Tron"
    | "Vertigo"
    | "Vertigo - Audio Sync"
    | "Zoom In - Audio Sync"
    | "Zoom In and Spin - Audio Sync"
    | "Zoom Out - Audio Sync";
  /**
   * The prompt used for the video. Prompt is required if `prompt_type` is `custom`. Otherwise this value is ignored
   */
  prompt?: string | undefined;
  /**
   *
   * * `custom` - Use your own prompt for the video.
   * * `use_lyrics` - Use the lyrics of the audio to create the prompt. If this option is selected, then `assets.audio_source` must be `file` or `youtube`.
   * * `ai_choose` - Let AI write the prompt. If this option is selected, then `assets.audio_source` must be `file` or `youtube`.
   */
  promptType: "ai_choose" | "custom" | "use_lyrics";
  /**
   * Change determines how quickly the video's content changes across frames.
   * * Higher = more rapid transitions.
   * * Lower = more stable visual experience.
   */
  transitionSpeed: number;
};

/**
 * @internal
 * V1AnimationCreateBodyStyle without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AnimationCreateBodyStyle = {
  art_style:
    | "3D Render"
    | "90s Streets"
    | "Abstract Minimalist"
    | "Arcane"
    | "Art Deco"
    | "Bold Colored Illustration"
    | "Cinematic Landscape"
    | "Cinematic Miyazaki"
    | "Cosmic"
    | "Cubist"
    | "Custom"
    | "Cyberpunk"
    | "Dark Graphic Illustration"
    | "Dark Watercolor"
    | "Directed by AI"
    | "Double Exposure"
    | "Faded Illustration"
    | "Fantasy"
    | "Futuristic Anime"
    | "Impressionism"
    | "Ink and Watercolor Portrait"
    | "Inkpunk"
    | "Intricate Abstract Lines Portrait"
    | "Jackson Pollock"
    | "Landscape Painting"
    | "Low Poly"
    | "Miniatures"
    | "Minimal Cold Futurism"
    | "Oil Painting"
    | "Old School Comic"
    | "Overgrown"
    | "Painted Cityscape"
    | "Painterly Illustration"
    | "Photograph"
    | "Pixar"
    | "Pixel Art"
    | "Postapocalyptic"
    | "Sin City"
    | "Soft Delicate Matte Portrait"
    | "Spooky"
    | "Studio Ghibli Film Still"
    | "Synthwave"
    | "Traditional Watercolor"
    | "Van Gogh"
    | "Vibrant Matte Illustration"
    | "Vintage Japanese Anime"
    | "Woodcut";
  art_style_custom?: string | undefined;
  camera_effect:
    | "Accelerate"
    | "Aggressive Zoom In - Audio Sync"
    | "Aggressive Zoom Out - Audio Sync"
    | "Boost Zoom In"
    | "Boost Zoom Out"
    | "Bounce In And Out"
    | "Bounce Out"
    | "Bounce Out - Audio Sync"
    | "Bounce and Spin - Audio Sync"
    | "Bounce in Place"
    | "Cog in the Machine"
    | "Devolve - Audio Sync"
    | "Directed by AI"
    | "Dramatic Zoom In"
    | "Dramatic Zoom Out"
    | "Drift Spin"
    | "Earthquake Bounce"
    | "Earthquake Bounce - Audio Sync"
    | "Evolve - Audio Sync"
    | "Heartbeat"
    | "Hesitate In"
    | "Jump"
    | "Pan Left"
    | "Pan Right"
    | "Pulse - Audio Sync"
    | "Pusher"
    | "Pusher - Audio Sync"
    | "Quadrant"
    | "Rise and Climb"
    | "Road Trip"
    | "Rodeo"
    | "Roll In"
    | "Roll In - Audio Sync"
    | "Rolling Bounces"
    | "Rubber Band"
    | "Simple Zoom In"
    | "Simple Zoom Out"
    | "Slice Bounce"
    | "Slideshow"
    | "Speed of Light"
    | "Spin Bounce"
    | "Sway Out"
    | "Sway Out - Audio Sync"
    | "Tilt Down"
    | "Tilt Up"
    | "Traverse"
    | "Tron"
    | "Vertigo"
    | "Vertigo - Audio Sync"
    | "Zoom In - Audio Sync"
    | "Zoom In and Spin - Audio Sync"
    | "Zoom Out - Audio Sync";
  prompt?: string | undefined;
  prompt_type: "ai_choose" | "custom" | "use_lyrics";
  transition_speed: number;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AnimationCreateBodyStyle
 */
const SchemaIn$V1AnimationCreateBodyStyle: z.ZodType<
  V1AnimationCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    art_style: z.enum([
      "3D Render",
      "90s Streets",
      "Abstract Minimalist",
      "Arcane",
      "Art Deco",
      "Bold Colored Illustration",
      "Cinematic Landscape",
      "Cinematic Miyazaki",
      "Cosmic",
      "Cubist",
      "Custom",
      "Cyberpunk",
      "Dark Graphic Illustration",
      "Dark Watercolor",
      "Directed by AI",
      "Double Exposure",
      "Faded Illustration",
      "Fantasy",
      "Futuristic Anime",
      "Impressionism",
      "Ink and Watercolor Portrait",
      "Inkpunk",
      "Intricate Abstract Lines Portrait",
      "Jackson Pollock",
      "Landscape Painting",
      "Low Poly",
      "Miniatures",
      "Minimal Cold Futurism",
      "Oil Painting",
      "Old School Comic",
      "Overgrown",
      "Painted Cityscape",
      "Painterly Illustration",
      "Photograph",
      "Pixar",
      "Pixel Art",
      "Postapocalyptic",
      "Sin City",
      "Soft Delicate Matte Portrait",
      "Spooky",
      "Studio Ghibli Film Still",
      "Synthwave",
      "Traditional Watercolor",
      "Van Gogh",
      "Vibrant Matte Illustration",
      "Vintage Japanese Anime",
      "Woodcut",
    ]),
    art_style_custom: z.string().optional(),
    camera_effect: z.enum([
      "Accelerate",
      "Aggressive Zoom In - Audio Sync",
      "Aggressive Zoom Out - Audio Sync",
      "Boost Zoom In",
      "Boost Zoom Out",
      "Bounce In And Out",
      "Bounce Out",
      "Bounce Out - Audio Sync",
      "Bounce and Spin - Audio Sync",
      "Bounce in Place",
      "Cog in the Machine",
      "Devolve - Audio Sync",
      "Directed by AI",
      "Dramatic Zoom In",
      "Dramatic Zoom Out",
      "Drift Spin",
      "Earthquake Bounce",
      "Earthquake Bounce - Audio Sync",
      "Evolve - Audio Sync",
      "Heartbeat",
      "Hesitate In",
      "Jump",
      "Pan Left",
      "Pan Right",
      "Pulse - Audio Sync",
      "Pusher",
      "Pusher - Audio Sync",
      "Quadrant",
      "Rise and Climb",
      "Road Trip",
      "Rodeo",
      "Roll In",
      "Roll In - Audio Sync",
      "Rolling Bounces",
      "Rubber Band",
      "Simple Zoom In",
      "Simple Zoom Out",
      "Slice Bounce",
      "Slideshow",
      "Speed of Light",
      "Spin Bounce",
      "Sway Out",
      "Sway Out - Audio Sync",
      "Tilt Down",
      "Tilt Up",
      "Traverse",
      "Tron",
      "Vertigo",
      "Vertigo - Audio Sync",
      "Zoom In - Audio Sync",
      "Zoom In and Spin - Audio Sync",
      "Zoom Out - Audio Sync",
    ]),
    prompt: z.string().optional(),
    prompt_type: z.enum(["ai_choose", "custom", "use_lyrics"]),
    transition_speed: z.number().int(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      art_style: "artStyle",
      art_style_custom: "artStyleCustom",
      camera_effect: "cameraEffect",
      prompt: "prompt",
      prompt_type: "promptType",
      transition_speed: "transitionSpeed",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AnimationCreateBodyStyle
 */
const SchemaOut$V1AnimationCreateBodyStyle: z.ZodType<
  External$V1AnimationCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  V1AnimationCreateBodyStyle // the object to be transformed
> = z
  .object({
    artStyle: z.enum([
      "3D Render",
      "90s Streets",
      "Abstract Minimalist",
      "Arcane",
      "Art Deco",
      "Bold Colored Illustration",
      "Cinematic Landscape",
      "Cinematic Miyazaki",
      "Cosmic",
      "Cubist",
      "Custom",
      "Cyberpunk",
      "Dark Graphic Illustration",
      "Dark Watercolor",
      "Directed by AI",
      "Double Exposure",
      "Faded Illustration",
      "Fantasy",
      "Futuristic Anime",
      "Impressionism",
      "Ink and Watercolor Portrait",
      "Inkpunk",
      "Intricate Abstract Lines Portrait",
      "Jackson Pollock",
      "Landscape Painting",
      "Low Poly",
      "Miniatures",
      "Minimal Cold Futurism",
      "Oil Painting",
      "Old School Comic",
      "Overgrown",
      "Painted Cityscape",
      "Painterly Illustration",
      "Photograph",
      "Pixar",
      "Pixel Art",
      "Postapocalyptic",
      "Sin City",
      "Soft Delicate Matte Portrait",
      "Spooky",
      "Studio Ghibli Film Still",
      "Synthwave",
      "Traditional Watercolor",
      "Van Gogh",
      "Vibrant Matte Illustration",
      "Vintage Japanese Anime",
      "Woodcut",
    ]),
    artStyleCustom: z.string().optional(),
    cameraEffect: z.enum([
      "Accelerate",
      "Aggressive Zoom In - Audio Sync",
      "Aggressive Zoom Out - Audio Sync",
      "Boost Zoom In",
      "Boost Zoom Out",
      "Bounce In And Out",
      "Bounce Out",
      "Bounce Out - Audio Sync",
      "Bounce and Spin - Audio Sync",
      "Bounce in Place",
      "Cog in the Machine",
      "Devolve - Audio Sync",
      "Directed by AI",
      "Dramatic Zoom In",
      "Dramatic Zoom Out",
      "Drift Spin",
      "Earthquake Bounce",
      "Earthquake Bounce - Audio Sync",
      "Evolve - Audio Sync",
      "Heartbeat",
      "Hesitate In",
      "Jump",
      "Pan Left",
      "Pan Right",
      "Pulse - Audio Sync",
      "Pusher",
      "Pusher - Audio Sync",
      "Quadrant",
      "Rise and Climb",
      "Road Trip",
      "Rodeo",
      "Roll In",
      "Roll In - Audio Sync",
      "Rolling Bounces",
      "Rubber Band",
      "Simple Zoom In",
      "Simple Zoom Out",
      "Slice Bounce",
      "Slideshow",
      "Speed of Light",
      "Spin Bounce",
      "Sway Out",
      "Sway Out - Audio Sync",
      "Tilt Down",
      "Tilt Up",
      "Traverse",
      "Tron",
      "Vertigo",
      "Vertigo - Audio Sync",
      "Zoom In - Audio Sync",
      "Zoom In and Spin - Audio Sync",
      "Zoom Out - Audio Sync",
    ]),
    prompt: z.string().optional(),
    promptType: z.enum(["ai_choose", "custom", "use_lyrics"]),
    transitionSpeed: z.number().int(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      artStyle: "art_style",
      artStyleCustom: "art_style_custom",
      cameraEffect: "camera_effect",
      prompt: "prompt",
      promptType: "prompt_type",
      transitionSpeed: "transition_speed",
    });
  });

export const Schemas$V1AnimationCreateBodyStyle = {
  in: SchemaIn$V1AnimationCreateBodyStyle,
  out: SchemaOut$V1AnimationCreateBodyStyle,
};
