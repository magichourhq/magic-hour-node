import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * V1AiMemeGeneratorCreateBodyStyle
 */
export type V1AiMemeGeneratorCreateBodyStyle = {
  /**
   * Whether to search the web for meme content.
   */
  searchWeb?: boolean | undefined;
  /**
   * To use our templates, pass in one of the enum values.
   */
  template:
    | "0 Days Without"
    | "A Train Hitting a School Bus"
    | "AJ Styles and Undertaker"
    | "Absolute Cinema"
    | "All My Homies Hate"
    | "Always Has Been"
    | "American Chopper Argument"
    | "Anakin Padme Four Panel"
    | "Ancient Aliens"
    | "Anime Girl Hiding from Terminator"
    | "Bad Luck Brian"
    | "Batman Slapping Robin"
    | "Bell Curve"
    | "Bernie Once Again Asking"
    | "Bike Fall"
    | "Blank Nut Button"
    | "Boardroom Meeting Suggestion"
    | "Buff Doge vs Cheems"
    | "But That's None of My Business"
    | "C'mon Do Something"
    | "Captain Picard Facepalm"
    | "Change My Mind"
    | "Charlie Conspiracy"
    | "Clown Applying Makeup"
    | "Creepy Condescending Wonka"
    | "Disappointed Guy"
    | "Disaster Girl"
    | "Distracted Boyfriend"
    | "Doge"
    | "Domino Effect"
    | "Drake Hotline Bling"
    | "Epic Handshake"
    | "Evil Kermit"
    | "First World Problems"
    | "Flex Tape"
    | "Futurama Fry"
    | "Galaxy Brain"
    | "Grandma Finds the Internet"
    | "Grant Gustin Over Grave"
    | "Grim Reaper Knocking Door"
    | "Gru's Plan"
    | "Grumpy Cat"
    | "Gus Fring We Are Not the Same"
    | "Hard to Swallow Pills"
    | "Hide the Pain Harold"
    | "I Bet He's Thinking About Other Women"
    | "I'm the Captain Now"
    | "Imagination SpongeBob"
    | "Inhaling Seagull"
    | "Is This a Pigeon"
    | "Laughing Leo"
    | "Left Exit 12 Off Ramp"
    | "Leonardo DiCaprio Cheers"
    | "Marked Safe From"
    | "Megamind Peeking"
    | "Mocking SpongeBob"
    | "Monkey Puppet"
    | "Mother Ignoring Kid Drowning in a Pool"
    | "One Does Not Simply"
    | "Oprah You Get A"
    | "Panik Kalm Panik"
    | "Pawn Stars Best I Can Do"
    | "Random"
    | "Roll Safe Think About It"
    | "Running Away Balloon"
    | "Sad Pablo Escobar"
    | "Say the Line Bart"
    | "Scooby Doo Mask Reveal"
    | "Scroll of Truth"
    | "Side Eyeing Chloe"
    | "Sleeping Shaq"
    | "Soldier Protecting Sleeping Child"
    | "Spiderman Pointing at Spiderman"
    | "Spiderman Triple"
    | "SpongeBob Ight Imma Head Out"
    | "Squidward Window"
    | "Star Wars Yoda"
    | "Success Kid"
    | "Surprised Pikachu"
    | "They Don't Know"
    | "They're the Same Picture"
    | "This Is Fine"
    | "This Is Where I'd Put My Trophy"
    | "Three-Headed Dragon"
    | "Trade Offer"
    | "Tuxedo Winnie The Pooh"
    | "Two Buttons"
    | "Two Guys on a Bus"
    | "Two Paths"
    | "Types of Headaches"
    | "UNO Draw 25"
    | "Waiting Skeleton"
    | "Where Monkey"
    | "Whisper and Goosebumps"
    | "Who Killed Hannibal"
    | "Woman Yelling at a Cat"
    | "X, X Everywhere"
    | "Y'all Got Any More of That"
    | "Yo Dawg Heard You"
    | "You Guys Are Getting Paid"
    | "You Know I'm Something of a Scientist Myself";
  /**
   * The topic of the meme.
   */
  topic: string;
};

/**
 * @internal
 * V1AiMemeGeneratorCreateBodyStyle without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiMemeGeneratorCreateBodyStyle = {
  searchWeb?: boolean | undefined;
  template:
    | "0 Days Without"
    | "A Train Hitting a School Bus"
    | "AJ Styles and Undertaker"
    | "Absolute Cinema"
    | "All My Homies Hate"
    | "Always Has Been"
    | "American Chopper Argument"
    | "Anakin Padme Four Panel"
    | "Ancient Aliens"
    | "Anime Girl Hiding from Terminator"
    | "Bad Luck Brian"
    | "Batman Slapping Robin"
    | "Bell Curve"
    | "Bernie Once Again Asking"
    | "Bike Fall"
    | "Blank Nut Button"
    | "Boardroom Meeting Suggestion"
    | "Buff Doge vs Cheems"
    | "But That's None of My Business"
    | "C'mon Do Something"
    | "Captain Picard Facepalm"
    | "Change My Mind"
    | "Charlie Conspiracy"
    | "Clown Applying Makeup"
    | "Creepy Condescending Wonka"
    | "Disappointed Guy"
    | "Disaster Girl"
    | "Distracted Boyfriend"
    | "Doge"
    | "Domino Effect"
    | "Drake Hotline Bling"
    | "Epic Handshake"
    | "Evil Kermit"
    | "First World Problems"
    | "Flex Tape"
    | "Futurama Fry"
    | "Galaxy Brain"
    | "Grandma Finds the Internet"
    | "Grant Gustin Over Grave"
    | "Grim Reaper Knocking Door"
    | "Gru's Plan"
    | "Grumpy Cat"
    | "Gus Fring We Are Not the Same"
    | "Hard to Swallow Pills"
    | "Hide the Pain Harold"
    | "I Bet He's Thinking About Other Women"
    | "I'm the Captain Now"
    | "Imagination SpongeBob"
    | "Inhaling Seagull"
    | "Is This a Pigeon"
    | "Laughing Leo"
    | "Left Exit 12 Off Ramp"
    | "Leonardo DiCaprio Cheers"
    | "Marked Safe From"
    | "Megamind Peeking"
    | "Mocking SpongeBob"
    | "Monkey Puppet"
    | "Mother Ignoring Kid Drowning in a Pool"
    | "One Does Not Simply"
    | "Oprah You Get A"
    | "Panik Kalm Panik"
    | "Pawn Stars Best I Can Do"
    | "Random"
    | "Roll Safe Think About It"
    | "Running Away Balloon"
    | "Sad Pablo Escobar"
    | "Say the Line Bart"
    | "Scooby Doo Mask Reveal"
    | "Scroll of Truth"
    | "Side Eyeing Chloe"
    | "Sleeping Shaq"
    | "Soldier Protecting Sleeping Child"
    | "Spiderman Pointing at Spiderman"
    | "Spiderman Triple"
    | "SpongeBob Ight Imma Head Out"
    | "Squidward Window"
    | "Star Wars Yoda"
    | "Success Kid"
    | "Surprised Pikachu"
    | "They Don't Know"
    | "They're the Same Picture"
    | "This Is Fine"
    | "This Is Where I'd Put My Trophy"
    | "Three-Headed Dragon"
    | "Trade Offer"
    | "Tuxedo Winnie The Pooh"
    | "Two Buttons"
    | "Two Guys on a Bus"
    | "Two Paths"
    | "Types of Headaches"
    | "UNO Draw 25"
    | "Waiting Skeleton"
    | "Where Monkey"
    | "Whisper and Goosebumps"
    | "Who Killed Hannibal"
    | "Woman Yelling at a Cat"
    | "X, X Everywhere"
    | "Y'all Got Any More of That"
    | "Yo Dawg Heard You"
    | "You Guys Are Getting Paid"
    | "You Know I'm Something of a Scientist Myself";
  topic: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiMemeGeneratorCreateBodyStyle
 */
const SchemaIn$V1AiMemeGeneratorCreateBodyStyle: z.ZodType<
  V1AiMemeGeneratorCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    searchWeb: z.boolean().optional(),
    template: z.enum([
      "0 Days Without",
      "A Train Hitting a School Bus",
      "AJ Styles and Undertaker",
      "Absolute Cinema",
      "All My Homies Hate",
      "Always Has Been",
      "American Chopper Argument",
      "Anakin Padme Four Panel",
      "Ancient Aliens",
      "Anime Girl Hiding from Terminator",
      "Bad Luck Brian",
      "Batman Slapping Robin",
      "Bell Curve",
      "Bernie Once Again Asking",
      "Bike Fall",
      "Blank Nut Button",
      "Boardroom Meeting Suggestion",
      "Buff Doge vs Cheems",
      "But That's None of My Business",
      "C'mon Do Something",
      "Captain Picard Facepalm",
      "Change My Mind",
      "Charlie Conspiracy",
      "Clown Applying Makeup",
      "Creepy Condescending Wonka",
      "Disappointed Guy",
      "Disaster Girl",
      "Distracted Boyfriend",
      "Doge",
      "Domino Effect",
      "Drake Hotline Bling",
      "Epic Handshake",
      "Evil Kermit",
      "First World Problems",
      "Flex Tape",
      "Futurama Fry",
      "Galaxy Brain",
      "Grandma Finds the Internet",
      "Grant Gustin Over Grave",
      "Grim Reaper Knocking Door",
      "Gru's Plan",
      "Grumpy Cat",
      "Gus Fring We Are Not the Same",
      "Hard to Swallow Pills",
      "Hide the Pain Harold",
      "I Bet He's Thinking About Other Women",
      "I'm the Captain Now",
      "Imagination SpongeBob",
      "Inhaling Seagull",
      "Is This a Pigeon",
      "Laughing Leo",
      "Left Exit 12 Off Ramp",
      "Leonardo DiCaprio Cheers",
      "Marked Safe From",
      "Megamind Peeking",
      "Mocking SpongeBob",
      "Monkey Puppet",
      "Mother Ignoring Kid Drowning in a Pool",
      "One Does Not Simply",
      "Oprah You Get A",
      "Panik Kalm Panik",
      "Pawn Stars Best I Can Do",
      "Random",
      "Roll Safe Think About It",
      "Running Away Balloon",
      "Sad Pablo Escobar",
      "Say the Line Bart",
      "Scooby Doo Mask Reveal",
      "Scroll of Truth",
      "Side Eyeing Chloe",
      "Sleeping Shaq",
      "Soldier Protecting Sleeping Child",
      "Spiderman Pointing at Spiderman",
      "Spiderman Triple",
      "SpongeBob Ight Imma Head Out",
      "Squidward Window",
      "Star Wars Yoda",
      "Success Kid",
      "Surprised Pikachu",
      "They Don't Know",
      "They're the Same Picture",
      "This Is Fine",
      "This Is Where I'd Put My Trophy",
      "Three-Headed Dragon",
      "Trade Offer",
      "Tuxedo Winnie The Pooh",
      "Two Buttons",
      "Two Guys on a Bus",
      "Two Paths",
      "Types of Headaches",
      "UNO Draw 25",
      "Waiting Skeleton",
      "Where Monkey",
      "Whisper and Goosebumps",
      "Who Killed Hannibal",
      "Woman Yelling at a Cat",
      "X, X Everywhere",
      "Y'all Got Any More of That",
      "Yo Dawg Heard You",
      "You Guys Are Getting Paid",
      "You Know I'm Something of a Scientist Myself",
    ]),
    topic: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      searchWeb: "searchWeb",
      template: "template",
      topic: "topic",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiMemeGeneratorCreateBodyStyle
 */
const SchemaOut$V1AiMemeGeneratorCreateBodyStyle: z.ZodType<
  External$V1AiMemeGeneratorCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  V1AiMemeGeneratorCreateBodyStyle // the object to be transformed
> = z
  .object({
    searchWeb: z.boolean().optional(),
    template: z.enum([
      "0 Days Without",
      "A Train Hitting a School Bus",
      "AJ Styles and Undertaker",
      "Absolute Cinema",
      "All My Homies Hate",
      "Always Has Been",
      "American Chopper Argument",
      "Anakin Padme Four Panel",
      "Ancient Aliens",
      "Anime Girl Hiding from Terminator",
      "Bad Luck Brian",
      "Batman Slapping Robin",
      "Bell Curve",
      "Bernie Once Again Asking",
      "Bike Fall",
      "Blank Nut Button",
      "Boardroom Meeting Suggestion",
      "Buff Doge vs Cheems",
      "But That's None of My Business",
      "C'mon Do Something",
      "Captain Picard Facepalm",
      "Change My Mind",
      "Charlie Conspiracy",
      "Clown Applying Makeup",
      "Creepy Condescending Wonka",
      "Disappointed Guy",
      "Disaster Girl",
      "Distracted Boyfriend",
      "Doge",
      "Domino Effect",
      "Drake Hotline Bling",
      "Epic Handshake",
      "Evil Kermit",
      "First World Problems",
      "Flex Tape",
      "Futurama Fry",
      "Galaxy Brain",
      "Grandma Finds the Internet",
      "Grant Gustin Over Grave",
      "Grim Reaper Knocking Door",
      "Gru's Plan",
      "Grumpy Cat",
      "Gus Fring We Are Not the Same",
      "Hard to Swallow Pills",
      "Hide the Pain Harold",
      "I Bet He's Thinking About Other Women",
      "I'm the Captain Now",
      "Imagination SpongeBob",
      "Inhaling Seagull",
      "Is This a Pigeon",
      "Laughing Leo",
      "Left Exit 12 Off Ramp",
      "Leonardo DiCaprio Cheers",
      "Marked Safe From",
      "Megamind Peeking",
      "Mocking SpongeBob",
      "Monkey Puppet",
      "Mother Ignoring Kid Drowning in a Pool",
      "One Does Not Simply",
      "Oprah You Get A",
      "Panik Kalm Panik",
      "Pawn Stars Best I Can Do",
      "Random",
      "Roll Safe Think About It",
      "Running Away Balloon",
      "Sad Pablo Escobar",
      "Say the Line Bart",
      "Scooby Doo Mask Reveal",
      "Scroll of Truth",
      "Side Eyeing Chloe",
      "Sleeping Shaq",
      "Soldier Protecting Sleeping Child",
      "Spiderman Pointing at Spiderman",
      "Spiderman Triple",
      "SpongeBob Ight Imma Head Out",
      "Squidward Window",
      "Star Wars Yoda",
      "Success Kid",
      "Surprised Pikachu",
      "They Don't Know",
      "They're the Same Picture",
      "This Is Fine",
      "This Is Where I'd Put My Trophy",
      "Three-Headed Dragon",
      "Trade Offer",
      "Tuxedo Winnie The Pooh",
      "Two Buttons",
      "Two Guys on a Bus",
      "Two Paths",
      "Types of Headaches",
      "UNO Draw 25",
      "Waiting Skeleton",
      "Where Monkey",
      "Whisper and Goosebumps",
      "Who Killed Hannibal",
      "Woman Yelling at a Cat",
      "X, X Everywhere",
      "Y'all Got Any More of That",
      "Yo Dawg Heard You",
      "You Guys Are Getting Paid",
      "You Know I'm Something of a Scientist Myself",
    ]),
    topic: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      searchWeb: "searchWeb",
      template: "template",
      topic: "topic",
    });
  });

export const Schemas$V1AiMemeGeneratorCreateBodyStyle = {
  in: SchemaIn$V1AiMemeGeneratorCreateBodyStyle,
  out: SchemaOut$V1AiMemeGeneratorCreateBodyStyle,
};
