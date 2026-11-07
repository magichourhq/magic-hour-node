import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * V1VideoToVideoCreateBodyStyle
 */
export type V1VideoToVideoCreateBodyStyle = {
  artStyle:
    | "101 Dalmatians"
    | "3D Render"
    | "8-Bit Angel"
    | "Ace (One Piece)"
    | "Airbender"
    | "Albert Einstein"
    | "Alien"
    | "Altair Ibn-La’Ahad"
    | "Alucard"
    | "American Gothic"
    | "Android"
    | "Anime Aviator"
    | "Anime Ninja"
    | "Anime Warrior"
    | "Anubis"
    | "Apocalyptic Marble"
    | "Aquaman"
    | "Aragorn"
    | "Armored Knight"
    | "Ash"
    | "Ash Ketchum"
    | "Ash Skeleton"
    | "Assassin's Creed"
    | "Astronaut"
    | "Avatar"
    | "Avian Aviator"
    | "Aviator"
    | "Aztec"
    | "Bagheera"
    | "Banzai"
    | "Baroque"
    | "Bastet"
    | "Batman"
    | "Beast"
    | "Bellwether"
    | "Beowulf"
    | "Bioshock"
    | "Black Ink"
    | "Black Panther"
    | "Black Spiderman"
    | "Blitzcrank"
    | "Blood Ink"
    | "Boba Fett"
    | "Bold Anime"
    | "Braveheart"
    | "Bronze Statue"
    | "Bubble Wrap"
    | "C-3PO"
    | "Calligraphy"
    | "Candle"
    | "Captain America"
    | "Carl Fredricksen"
    | "Carnage"
    | "Cave Painting"
    | "Celestial"
    | "Celestial Skin"
    | "Cell"
    | "Chalk Dust"
    | "Chalkboard"
    | "Cheetah"
    | "Chess"
    | "Chewbacca"
    | "Chibi"
    | "Chinese Swordsmen"
    | "Chrome"
    | "Chucky"
    | "Cinderella"
    | "Cinematic"
    | "Clay"
    | "Claymation"
    | "Cloud Strife"
    | "Clouds"
    | "Comic"
    | "Comic Batman"
    | "Confederate Soldier"
    | "Coral"
    | "Cracked Marble"
    | "Crayon"
    | "Crusader"
    | "Crusader Zombie"
    | "Crystal Knight"
    | "Cuphead Devil"
    | "Cursed Samurai"
    | "Cyber Samurai"
    | "Cyberpunk"
    | "Cyclops"
    | "Cypher"
    | "Da Vinci"
    | "Daredevil"
    | "Dark Fantasy"
    | "Dark Reaper"
    | "Darkseid"
    | "Darth Maul"
    | "Darth Vader"
    | "Day of the Dead"
    | "Deadpool"
    | "Deathstroke"
    | "Demon Hunter"
    | "Desert Wraith"
    | "Detective Conan"
    | "Devil"
    | "Dexter's Lab"
    | "Diablo"
    | "Dieselpunk"
    | "Din Djarin"
    | "Dio Brando"
    | "Diorama"
    | "Doctor Doom"
    | "Doctor Fate"
    | "Donald Duck"
    | "Dragon Rider Knight"
    | "Dragonball Z"
    | "Dune"
    | "Eclipse"
    | "Edward Elric"
    | "Engineer"
    | "Erron Black"
    | "FNAF"
    | "Fabric"
    | "Finn"
    | "Fire Golems"
    | "Flash"
    | "Foam"
    | "Fossils"
    | "Frankenstein"
    | "Freddy Krueger"
    | "Frieza"
    | "Fury Road"
    | "Future Bot"
    | "Futuristic Fantasy"
    | "GLaDOS"
    | "GTA"
    | "Gandalf"
    | "Gargoyle"
    | "Genghis Khan"
    | "Ghibli Anime"
    | "Ghost"
    | "Ghost Rider"
    | "Gimli"
    | "Girl with Pearl Earring"
    | "Gladiators"
    | "Glass Sculpture"
    | "Goblin Inventor"
    | "Gojo"
    | "Golden Scarabs"
    | "Gray NPC"
    | "Green Goblin"
    | "Green Lantern"
    | "Grim Reaper"
    | "Groot"
    | "Gundam"
    | "HK-47"
    | "Hades"
    | "Hades (Disney)"
    | "Han Solo"
    | "Hellboy"
    | "Hercules"
    | "Hitman"
    | "Hobbits"
    | "Hologram"
    | "Hugging Bear"
    | "Huggy Wuggy"
    | "Hulk"
    | "Ice and Fire"
    | "Illustration"
    | "Impressionism"
    | "Indiana Jones"
    | "Ink"
    | "Ink Blot"
    | "Ink Bottle"
    | "Ink Poster"
    | "Ink Samurai"
    | "Insect"
    | "Invader Zim"
    | "Iron Man"
    | "Iron Valor"
    | "James Bond"
    | "Japanese Raijin"
    | "Japanese Susanoo"
    | "Jarvan"
    | "Jason Voorhees"
    | "Jello"
    | "Jinx"
    | "John Darling"
    | "John Wick"
    | "Joker"
    | "Jon Snow"
    | "Joy vs. Anger"
    | "Kai’Sa"
    | "Karl Marx"
    | "Ken"
    | "Kenshiro"
    | "Killer Croc"
    | "King Arthur"
    | "Knight"
    | "Kratos"
    | "Krillin"
    | "Kung Fu"
    | "Lara Croft"
    | "Leatherface"
    | "Legend of Zelda"
    | "Lego"
    | "Legolas"
    | "Leprechaun"
    | "Levi Ackerman"
    | "Lich King"
    | "Link"
    | "Liquid Metal"
    | "Luffy"
    | "Luigi"
    | "Mad Max"
    | "Maestro Hulk"
    | "Malfurion Stormrage"
    | "Man Bat"
    | "Mandalorian"
    | "Marble"
    | "Marble Chesspieces"
    | "Marble Sculpture"
    | "Mario"
    | "Martian"
    | "Master Chief"
    | "Matrix"
    | "Mech"
    | "Mech Angels"
    | "Mech Dragon"
    | "Mech Valkryie"
    | "Mechanical Scorpion"
    | "Medieval Painting"
    | "Melted Wax"
    | "Metallic Angel"
    | "Mickey Mouse"
    | "Might Guy"
    | "Mike Wazowski"
    | "Minecraft"
    | "Miner"
    | "Minotaur King"
    | "Molten Beasts"
    | "Molten Rock"
    | "Moss Spirits"
    | "Mushroom"
    | "Mystique"
    | "Mythra"
    | "Nala"
    | "Napoleon Painting"
    | "Naruto"
    | "Naruto Uzumaki"
    | "Nathan Drake"
    | "Native American"
    | "Nautilus"
    | "Nebula"
    | "Neon Dream"
    | "Nightmare"
    | "Ninja Turtle"
    | "No Art Style"
    | "Nosferatu"
    | "Obi-Wan"
    | "Obsidian Gods"
    | "Oil Painting"
    | "Oil Slick"
    | "On Fire"
    | "One Punch Man"
    | "Oni"
    | "Optimus Prime"
    | "Orc"
    | "Origami"
    | "Origami Samurai"
    | "Painterly Anime"
    | "Paper Cut"
    | "Paper Lantern"
    | "Peely"
    | "Pencil Sketch"
    | "Pennywise"
    | "Pepe the Frog"
    | "Pharaoh"
    | "Phoenix Wright"
    | "Piccolo"
    | "Pixar"
    | "Pixel"
    | "Plague Doctor"
    | "Pokémon Trainer"
    | "Polish Hussar"
    | "Polygon"
    | "Popeye"
    | "Porcelain"
    | "Porcelain Nobles"
    | "Portal"
    | "Poseidon"
    | "Postapocalyptic"
    | "Power Armor"
    | "Power Ranger"
    | "Predator"
    | "Prince"
    | "Prince of Persia"
    | "Puppets"
    | "Pyke"
    | "Qilin"
    | "Qing Dynasty"
    | "Radiant Anime"
    | "Raiden"
    | "Raiden (Metal Gear)"
    | "Realistic Anime"
    | "Realistic Pixar"
    | "Regan MacNeil"
    | "Renaissance Painting"
    | "Renaissance Sketch"
    | "Retro Anime"
    | "Retro Sci-Fi"
    | "Rick & Morty"
    | "Robin"
    | "Robin Hood"
    | "Roblox"
    | "RoboCop"
    | "Rocket Raccoon"
    | "Rooster"
    | "Russell (Up)"
    | "Rusted Valor"
    | "Samara Morgan"
    | "Samurai"
    | "Samurai Bot"
    | "Samus"
    | "Sand Sculpture"
    | "Sandpaper"
    | "Sandstorm Gladiator"
    | "Sans Undertale"
    | "Sarah Kerrigan"
    | "Scorpion"
    | "Scottish Highlander"
    | "Scream"
    | "Scuba Diver"
    | "Shadow"
    | "Shadow Phoenix"
    | "Shark Gladiator"
    | "Sharp Anime"
    | "Shiva"
    | "Shrek"
    | "Sidewalk Chalk"
    | "Simpsons"
    | "Simón Bolívar"
    | "Singed"
    | "Sketch"
    | "Slime"
    | "Socrates"
    | "Soft Anime"
    | "Solar Eclipse"
    | "Solar Flare"
    | "Solid Snake"
    | "South Park"
    | "Spartan"
    | "Spider-Venom"
    | "Spiderman"
    | "Spiderman 2099"
    | "Spirit Fox"
    | "Spray Paint"
    | "Star Trek"
    | "Starfield"
    | "Statue of David"
    | "Statue of Liberty"
    | "Steampunk Captain"
    | "Street Fighter"
    | "Studio Ghibli"
    | "Sub-Zero"
    | "Sulley"
    | "Sumo Wrestler"
    | "Superman"
    | "Swamp Creatures"
    | "TF2 Spy"
    | "Tarot Card"
    | "Tarzan"
    | "Terminator"
    | "Terra Cotta Soldiers"
    | "Thanos"
    | "The Creeper"
    | "The Flash"
    | "The Mask"
    | "The Mummy"
    | "The Nun"
    | "The Thinker"
    | "The Void"
    | "The Witcher"
    | "Thor"
    | "Thrall"
    | "Tomb Raider"
    | "Toy Story"
    | "Tree Ent King"
    | "Tribal Warrior"
    | "Tyrande Whisperwind"
    | "Underwater"
    | "Vampire"
    | "Van Gogh"
    | "Venom"
    | "Viking"
    | "Vikings"
    | "WWI Soldier"
    | "WWII Paratrooper"
    | "Warzone"
    | "Washi"
    | "Watercolor"
    | "Watercolor Painting"
    | "Wax"
    | "Wax Museum"
    | "Wendingo"
    | "Western Anime"
    | "White Walker"
    | "William Wallace"
    | "Wolverine"
    | "Woodcut"
    | "Wool Beast"
    | "Wool Giant"
    | "Wu Kong"
    | "Wukong"
    | "Wuxia Anime"
    | "X-Ray Soldier"
    | "Yarn"
    | "Yeti"
    | "Zelda"
    | "Zeus (Disney)"
    | "Zombie";
  /**
   * * `Dreamshaper` - a good all-around model that works for both animations as well as realism.
   * * `Absolute Reality` - better at realism, but you'll often get similar results with Dreamshaper as well.
   * * `Flat 2D Anime` - best for a flat illustration style that's common in most anime.
   * * `Default` - the v3 model.
   * * `default` - use the default recommended model for the selected art style.
   */
  model?:
    | (
        | "3D Anime"
        | "Absolute Reality"
        | "Default"
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
   * * `v3` - consistent styling guided by a caller-supplied reference image. Requires assets.initial_image_path and positive width/height.
   * * `default` - use the selected art style's default version, including v3.
   */
  version?: ("default" | "v1" | "v2" | "v3") | undefined;
};

/**
 * @internal
 * V1VideoToVideoCreateBodyStyle without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1VideoToVideoCreateBodyStyle = {
  art_style:
    | "101 Dalmatians"
    | "3D Render"
    | "8-Bit Angel"
    | "Ace (One Piece)"
    | "Airbender"
    | "Albert Einstein"
    | "Alien"
    | "Altair Ibn-La’Ahad"
    | "Alucard"
    | "American Gothic"
    | "Android"
    | "Anime Aviator"
    | "Anime Ninja"
    | "Anime Warrior"
    | "Anubis"
    | "Apocalyptic Marble"
    | "Aquaman"
    | "Aragorn"
    | "Armored Knight"
    | "Ash"
    | "Ash Ketchum"
    | "Ash Skeleton"
    | "Assassin's Creed"
    | "Astronaut"
    | "Avatar"
    | "Avian Aviator"
    | "Aviator"
    | "Aztec"
    | "Bagheera"
    | "Banzai"
    | "Baroque"
    | "Bastet"
    | "Batman"
    | "Beast"
    | "Bellwether"
    | "Beowulf"
    | "Bioshock"
    | "Black Ink"
    | "Black Panther"
    | "Black Spiderman"
    | "Blitzcrank"
    | "Blood Ink"
    | "Boba Fett"
    | "Bold Anime"
    | "Braveheart"
    | "Bronze Statue"
    | "Bubble Wrap"
    | "C-3PO"
    | "Calligraphy"
    | "Candle"
    | "Captain America"
    | "Carl Fredricksen"
    | "Carnage"
    | "Cave Painting"
    | "Celestial"
    | "Celestial Skin"
    | "Cell"
    | "Chalk Dust"
    | "Chalkboard"
    | "Cheetah"
    | "Chess"
    | "Chewbacca"
    | "Chibi"
    | "Chinese Swordsmen"
    | "Chrome"
    | "Chucky"
    | "Cinderella"
    | "Cinematic"
    | "Clay"
    | "Claymation"
    | "Cloud Strife"
    | "Clouds"
    | "Comic"
    | "Comic Batman"
    | "Confederate Soldier"
    | "Coral"
    | "Cracked Marble"
    | "Crayon"
    | "Crusader"
    | "Crusader Zombie"
    | "Crystal Knight"
    | "Cuphead Devil"
    | "Cursed Samurai"
    | "Cyber Samurai"
    | "Cyberpunk"
    | "Cyclops"
    | "Cypher"
    | "Da Vinci"
    | "Daredevil"
    | "Dark Fantasy"
    | "Dark Reaper"
    | "Darkseid"
    | "Darth Maul"
    | "Darth Vader"
    | "Day of the Dead"
    | "Deadpool"
    | "Deathstroke"
    | "Demon Hunter"
    | "Desert Wraith"
    | "Detective Conan"
    | "Devil"
    | "Dexter's Lab"
    | "Diablo"
    | "Dieselpunk"
    | "Din Djarin"
    | "Dio Brando"
    | "Diorama"
    | "Doctor Doom"
    | "Doctor Fate"
    | "Donald Duck"
    | "Dragon Rider Knight"
    | "Dragonball Z"
    | "Dune"
    | "Eclipse"
    | "Edward Elric"
    | "Engineer"
    | "Erron Black"
    | "FNAF"
    | "Fabric"
    | "Finn"
    | "Fire Golems"
    | "Flash"
    | "Foam"
    | "Fossils"
    | "Frankenstein"
    | "Freddy Krueger"
    | "Frieza"
    | "Fury Road"
    | "Future Bot"
    | "Futuristic Fantasy"
    | "GLaDOS"
    | "GTA"
    | "Gandalf"
    | "Gargoyle"
    | "Genghis Khan"
    | "Ghibli Anime"
    | "Ghost"
    | "Ghost Rider"
    | "Gimli"
    | "Girl with Pearl Earring"
    | "Gladiators"
    | "Glass Sculpture"
    | "Goblin Inventor"
    | "Gojo"
    | "Golden Scarabs"
    | "Gray NPC"
    | "Green Goblin"
    | "Green Lantern"
    | "Grim Reaper"
    | "Groot"
    | "Gundam"
    | "HK-47"
    | "Hades"
    | "Hades (Disney)"
    | "Han Solo"
    | "Hellboy"
    | "Hercules"
    | "Hitman"
    | "Hobbits"
    | "Hologram"
    | "Hugging Bear"
    | "Huggy Wuggy"
    | "Hulk"
    | "Ice and Fire"
    | "Illustration"
    | "Impressionism"
    | "Indiana Jones"
    | "Ink"
    | "Ink Blot"
    | "Ink Bottle"
    | "Ink Poster"
    | "Ink Samurai"
    | "Insect"
    | "Invader Zim"
    | "Iron Man"
    | "Iron Valor"
    | "James Bond"
    | "Japanese Raijin"
    | "Japanese Susanoo"
    | "Jarvan"
    | "Jason Voorhees"
    | "Jello"
    | "Jinx"
    | "John Darling"
    | "John Wick"
    | "Joker"
    | "Jon Snow"
    | "Joy vs. Anger"
    | "Kai’Sa"
    | "Karl Marx"
    | "Ken"
    | "Kenshiro"
    | "Killer Croc"
    | "King Arthur"
    | "Knight"
    | "Kratos"
    | "Krillin"
    | "Kung Fu"
    | "Lara Croft"
    | "Leatherface"
    | "Legend of Zelda"
    | "Lego"
    | "Legolas"
    | "Leprechaun"
    | "Levi Ackerman"
    | "Lich King"
    | "Link"
    | "Liquid Metal"
    | "Luffy"
    | "Luigi"
    | "Mad Max"
    | "Maestro Hulk"
    | "Malfurion Stormrage"
    | "Man Bat"
    | "Mandalorian"
    | "Marble"
    | "Marble Chesspieces"
    | "Marble Sculpture"
    | "Mario"
    | "Martian"
    | "Master Chief"
    | "Matrix"
    | "Mech"
    | "Mech Angels"
    | "Mech Dragon"
    | "Mech Valkryie"
    | "Mechanical Scorpion"
    | "Medieval Painting"
    | "Melted Wax"
    | "Metallic Angel"
    | "Mickey Mouse"
    | "Might Guy"
    | "Mike Wazowski"
    | "Minecraft"
    | "Miner"
    | "Minotaur King"
    | "Molten Beasts"
    | "Molten Rock"
    | "Moss Spirits"
    | "Mushroom"
    | "Mystique"
    | "Mythra"
    | "Nala"
    | "Napoleon Painting"
    | "Naruto"
    | "Naruto Uzumaki"
    | "Nathan Drake"
    | "Native American"
    | "Nautilus"
    | "Nebula"
    | "Neon Dream"
    | "Nightmare"
    | "Ninja Turtle"
    | "No Art Style"
    | "Nosferatu"
    | "Obi-Wan"
    | "Obsidian Gods"
    | "Oil Painting"
    | "Oil Slick"
    | "On Fire"
    | "One Punch Man"
    | "Oni"
    | "Optimus Prime"
    | "Orc"
    | "Origami"
    | "Origami Samurai"
    | "Painterly Anime"
    | "Paper Cut"
    | "Paper Lantern"
    | "Peely"
    | "Pencil Sketch"
    | "Pennywise"
    | "Pepe the Frog"
    | "Pharaoh"
    | "Phoenix Wright"
    | "Piccolo"
    | "Pixar"
    | "Pixel"
    | "Plague Doctor"
    | "Pokémon Trainer"
    | "Polish Hussar"
    | "Polygon"
    | "Popeye"
    | "Porcelain"
    | "Porcelain Nobles"
    | "Portal"
    | "Poseidon"
    | "Postapocalyptic"
    | "Power Armor"
    | "Power Ranger"
    | "Predator"
    | "Prince"
    | "Prince of Persia"
    | "Puppets"
    | "Pyke"
    | "Qilin"
    | "Qing Dynasty"
    | "Radiant Anime"
    | "Raiden"
    | "Raiden (Metal Gear)"
    | "Realistic Anime"
    | "Realistic Pixar"
    | "Regan MacNeil"
    | "Renaissance Painting"
    | "Renaissance Sketch"
    | "Retro Anime"
    | "Retro Sci-Fi"
    | "Rick & Morty"
    | "Robin"
    | "Robin Hood"
    | "Roblox"
    | "RoboCop"
    | "Rocket Raccoon"
    | "Rooster"
    | "Russell (Up)"
    | "Rusted Valor"
    | "Samara Morgan"
    | "Samurai"
    | "Samurai Bot"
    | "Samus"
    | "Sand Sculpture"
    | "Sandpaper"
    | "Sandstorm Gladiator"
    | "Sans Undertale"
    | "Sarah Kerrigan"
    | "Scorpion"
    | "Scottish Highlander"
    | "Scream"
    | "Scuba Diver"
    | "Shadow"
    | "Shadow Phoenix"
    | "Shark Gladiator"
    | "Sharp Anime"
    | "Shiva"
    | "Shrek"
    | "Sidewalk Chalk"
    | "Simpsons"
    | "Simón Bolívar"
    | "Singed"
    | "Sketch"
    | "Slime"
    | "Socrates"
    | "Soft Anime"
    | "Solar Eclipse"
    | "Solar Flare"
    | "Solid Snake"
    | "South Park"
    | "Spartan"
    | "Spider-Venom"
    | "Spiderman"
    | "Spiderman 2099"
    | "Spirit Fox"
    | "Spray Paint"
    | "Star Trek"
    | "Starfield"
    | "Statue of David"
    | "Statue of Liberty"
    | "Steampunk Captain"
    | "Street Fighter"
    | "Studio Ghibli"
    | "Sub-Zero"
    | "Sulley"
    | "Sumo Wrestler"
    | "Superman"
    | "Swamp Creatures"
    | "TF2 Spy"
    | "Tarot Card"
    | "Tarzan"
    | "Terminator"
    | "Terra Cotta Soldiers"
    | "Thanos"
    | "The Creeper"
    | "The Flash"
    | "The Mask"
    | "The Mummy"
    | "The Nun"
    | "The Thinker"
    | "The Void"
    | "The Witcher"
    | "Thor"
    | "Thrall"
    | "Tomb Raider"
    | "Toy Story"
    | "Tree Ent King"
    | "Tribal Warrior"
    | "Tyrande Whisperwind"
    | "Underwater"
    | "Vampire"
    | "Van Gogh"
    | "Venom"
    | "Viking"
    | "Vikings"
    | "WWI Soldier"
    | "WWII Paratrooper"
    | "Warzone"
    | "Washi"
    | "Watercolor"
    | "Watercolor Painting"
    | "Wax"
    | "Wax Museum"
    | "Wendingo"
    | "Western Anime"
    | "White Walker"
    | "William Wallace"
    | "Wolverine"
    | "Woodcut"
    | "Wool Beast"
    | "Wool Giant"
    | "Wu Kong"
    | "Wukong"
    | "Wuxia Anime"
    | "X-Ray Soldier"
    | "Yarn"
    | "Yeti"
    | "Zelda"
    | "Zeus (Disney)"
    | "Zombie";
  model?:
    | (
        | "3D Anime"
        | "Absolute Reality"
        | "Default"
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
  version?: ("default" | "v1" | "v2" | "v3") | undefined;
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
      "101 Dalmatians",
      "3D Render",
      "8-Bit Angel",
      "Ace (One Piece)",
      "Airbender",
      "Albert Einstein",
      "Alien",
      "Altair Ibn-La’Ahad",
      "Alucard",
      "American Gothic",
      "Android",
      "Anime Aviator",
      "Anime Ninja",
      "Anime Warrior",
      "Anubis",
      "Apocalyptic Marble",
      "Aquaman",
      "Aragorn",
      "Armored Knight",
      "Ash",
      "Ash Ketchum",
      "Ash Skeleton",
      "Assassin's Creed",
      "Astronaut",
      "Avatar",
      "Avian Aviator",
      "Aviator",
      "Aztec",
      "Bagheera",
      "Banzai",
      "Baroque",
      "Bastet",
      "Batman",
      "Beast",
      "Bellwether",
      "Beowulf",
      "Bioshock",
      "Black Ink",
      "Black Panther",
      "Black Spiderman",
      "Blitzcrank",
      "Blood Ink",
      "Boba Fett",
      "Bold Anime",
      "Braveheart",
      "Bronze Statue",
      "Bubble Wrap",
      "C-3PO",
      "Calligraphy",
      "Candle",
      "Captain America",
      "Carl Fredricksen",
      "Carnage",
      "Cave Painting",
      "Celestial",
      "Celestial Skin",
      "Cell",
      "Chalk Dust",
      "Chalkboard",
      "Cheetah",
      "Chess",
      "Chewbacca",
      "Chibi",
      "Chinese Swordsmen",
      "Chrome",
      "Chucky",
      "Cinderella",
      "Cinematic",
      "Clay",
      "Claymation",
      "Cloud Strife",
      "Clouds",
      "Comic",
      "Comic Batman",
      "Confederate Soldier",
      "Coral",
      "Cracked Marble",
      "Crayon",
      "Crusader",
      "Crusader Zombie",
      "Crystal Knight",
      "Cuphead Devil",
      "Cursed Samurai",
      "Cyber Samurai",
      "Cyberpunk",
      "Cyclops",
      "Cypher",
      "Da Vinci",
      "Daredevil",
      "Dark Fantasy",
      "Dark Reaper",
      "Darkseid",
      "Darth Maul",
      "Darth Vader",
      "Day of the Dead",
      "Deadpool",
      "Deathstroke",
      "Demon Hunter",
      "Desert Wraith",
      "Detective Conan",
      "Devil",
      "Dexter's Lab",
      "Diablo",
      "Dieselpunk",
      "Din Djarin",
      "Dio Brando",
      "Diorama",
      "Doctor Doom",
      "Doctor Fate",
      "Donald Duck",
      "Dragon Rider Knight",
      "Dragonball Z",
      "Dune",
      "Eclipse",
      "Edward Elric",
      "Engineer",
      "Erron Black",
      "FNAF",
      "Fabric",
      "Finn",
      "Fire Golems",
      "Flash",
      "Foam",
      "Fossils",
      "Frankenstein",
      "Freddy Krueger",
      "Frieza",
      "Fury Road",
      "Future Bot",
      "Futuristic Fantasy",
      "GLaDOS",
      "GTA",
      "Gandalf",
      "Gargoyle",
      "Genghis Khan",
      "Ghibli Anime",
      "Ghost",
      "Ghost Rider",
      "Gimli",
      "Girl with Pearl Earring",
      "Gladiators",
      "Glass Sculpture",
      "Goblin Inventor",
      "Gojo",
      "Golden Scarabs",
      "Gray NPC",
      "Green Goblin",
      "Green Lantern",
      "Grim Reaper",
      "Groot",
      "Gundam",
      "HK-47",
      "Hades",
      "Hades (Disney)",
      "Han Solo",
      "Hellboy",
      "Hercules",
      "Hitman",
      "Hobbits",
      "Hologram",
      "Hugging Bear",
      "Huggy Wuggy",
      "Hulk",
      "Ice and Fire",
      "Illustration",
      "Impressionism",
      "Indiana Jones",
      "Ink",
      "Ink Blot",
      "Ink Bottle",
      "Ink Poster",
      "Ink Samurai",
      "Insect",
      "Invader Zim",
      "Iron Man",
      "Iron Valor",
      "James Bond",
      "Japanese Raijin",
      "Japanese Susanoo",
      "Jarvan",
      "Jason Voorhees",
      "Jello",
      "Jinx",
      "John Darling",
      "John Wick",
      "Joker",
      "Jon Snow",
      "Joy vs. Anger",
      "Kai’Sa",
      "Karl Marx",
      "Ken",
      "Kenshiro",
      "Killer Croc",
      "King Arthur",
      "Knight",
      "Kratos",
      "Krillin",
      "Kung Fu",
      "Lara Croft",
      "Leatherface",
      "Legend of Zelda",
      "Lego",
      "Legolas",
      "Leprechaun",
      "Levi Ackerman",
      "Lich King",
      "Link",
      "Liquid Metal",
      "Luffy",
      "Luigi",
      "Mad Max",
      "Maestro Hulk",
      "Malfurion Stormrage",
      "Man Bat",
      "Mandalorian",
      "Marble",
      "Marble Chesspieces",
      "Marble Sculpture",
      "Mario",
      "Martian",
      "Master Chief",
      "Matrix",
      "Mech",
      "Mech Angels",
      "Mech Dragon",
      "Mech Valkryie",
      "Mechanical Scorpion",
      "Medieval Painting",
      "Melted Wax",
      "Metallic Angel",
      "Mickey Mouse",
      "Might Guy",
      "Mike Wazowski",
      "Minecraft",
      "Miner",
      "Minotaur King",
      "Molten Beasts",
      "Molten Rock",
      "Moss Spirits",
      "Mushroom",
      "Mystique",
      "Mythra",
      "Nala",
      "Napoleon Painting",
      "Naruto",
      "Naruto Uzumaki",
      "Nathan Drake",
      "Native American",
      "Nautilus",
      "Nebula",
      "Neon Dream",
      "Nightmare",
      "Ninja Turtle",
      "No Art Style",
      "Nosferatu",
      "Obi-Wan",
      "Obsidian Gods",
      "Oil Painting",
      "Oil Slick",
      "On Fire",
      "One Punch Man",
      "Oni",
      "Optimus Prime",
      "Orc",
      "Origami",
      "Origami Samurai",
      "Painterly Anime",
      "Paper Cut",
      "Paper Lantern",
      "Peely",
      "Pencil Sketch",
      "Pennywise",
      "Pepe the Frog",
      "Pharaoh",
      "Phoenix Wright",
      "Piccolo",
      "Pixar",
      "Pixel",
      "Plague Doctor",
      "Pokémon Trainer",
      "Polish Hussar",
      "Polygon",
      "Popeye",
      "Porcelain",
      "Porcelain Nobles",
      "Portal",
      "Poseidon",
      "Postapocalyptic",
      "Power Armor",
      "Power Ranger",
      "Predator",
      "Prince",
      "Prince of Persia",
      "Puppets",
      "Pyke",
      "Qilin",
      "Qing Dynasty",
      "Radiant Anime",
      "Raiden",
      "Raiden (Metal Gear)",
      "Realistic Anime",
      "Realistic Pixar",
      "Regan MacNeil",
      "Renaissance Painting",
      "Renaissance Sketch",
      "Retro Anime",
      "Retro Sci-Fi",
      "Rick & Morty",
      "Robin",
      "Robin Hood",
      "Roblox",
      "RoboCop",
      "Rocket Raccoon",
      "Rooster",
      "Russell (Up)",
      "Rusted Valor",
      "Samara Morgan",
      "Samurai",
      "Samurai Bot",
      "Samus",
      "Sand Sculpture",
      "Sandpaper",
      "Sandstorm Gladiator",
      "Sans Undertale",
      "Sarah Kerrigan",
      "Scorpion",
      "Scottish Highlander",
      "Scream",
      "Scuba Diver",
      "Shadow",
      "Shadow Phoenix",
      "Shark Gladiator",
      "Sharp Anime",
      "Shiva",
      "Shrek",
      "Sidewalk Chalk",
      "Simpsons",
      "Simón Bolívar",
      "Singed",
      "Sketch",
      "Slime",
      "Socrates",
      "Soft Anime",
      "Solar Eclipse",
      "Solar Flare",
      "Solid Snake",
      "South Park",
      "Spartan",
      "Spider-Venom",
      "Spiderman",
      "Spiderman 2099",
      "Spirit Fox",
      "Spray Paint",
      "Star Trek",
      "Starfield",
      "Statue of David",
      "Statue of Liberty",
      "Steampunk Captain",
      "Street Fighter",
      "Studio Ghibli",
      "Sub-Zero",
      "Sulley",
      "Sumo Wrestler",
      "Superman",
      "Swamp Creatures",
      "TF2 Spy",
      "Tarot Card",
      "Tarzan",
      "Terminator",
      "Terra Cotta Soldiers",
      "Thanos",
      "The Creeper",
      "The Flash",
      "The Mask",
      "The Mummy",
      "The Nun",
      "The Thinker",
      "The Void",
      "The Witcher",
      "Thor",
      "Thrall",
      "Tomb Raider",
      "Toy Story",
      "Tree Ent King",
      "Tribal Warrior",
      "Tyrande Whisperwind",
      "Underwater",
      "Vampire",
      "Van Gogh",
      "Venom",
      "Viking",
      "Vikings",
      "WWI Soldier",
      "WWII Paratrooper",
      "Warzone",
      "Washi",
      "Watercolor",
      "Watercolor Painting",
      "Wax",
      "Wax Museum",
      "Wendingo",
      "Western Anime",
      "White Walker",
      "William Wallace",
      "Wolverine",
      "Woodcut",
      "Wool Beast",
      "Wool Giant",
      "Wu Kong",
      "Wukong",
      "Wuxia Anime",
      "X-Ray Soldier",
      "Yarn",
      "Yeti",
      "Zelda",
      "Zeus (Disney)",
      "Zombie",
    ]),
    model: z
      .enum([
        "3D Anime",
        "Absolute Reality",
        "Default",
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
    version: z.enum(["default", "v1", "v2", "v3"]).optional(),
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
      "101 Dalmatians",
      "3D Render",
      "8-Bit Angel",
      "Ace (One Piece)",
      "Airbender",
      "Albert Einstein",
      "Alien",
      "Altair Ibn-La’Ahad",
      "Alucard",
      "American Gothic",
      "Android",
      "Anime Aviator",
      "Anime Ninja",
      "Anime Warrior",
      "Anubis",
      "Apocalyptic Marble",
      "Aquaman",
      "Aragorn",
      "Armored Knight",
      "Ash",
      "Ash Ketchum",
      "Ash Skeleton",
      "Assassin's Creed",
      "Astronaut",
      "Avatar",
      "Avian Aviator",
      "Aviator",
      "Aztec",
      "Bagheera",
      "Banzai",
      "Baroque",
      "Bastet",
      "Batman",
      "Beast",
      "Bellwether",
      "Beowulf",
      "Bioshock",
      "Black Ink",
      "Black Panther",
      "Black Spiderman",
      "Blitzcrank",
      "Blood Ink",
      "Boba Fett",
      "Bold Anime",
      "Braveheart",
      "Bronze Statue",
      "Bubble Wrap",
      "C-3PO",
      "Calligraphy",
      "Candle",
      "Captain America",
      "Carl Fredricksen",
      "Carnage",
      "Cave Painting",
      "Celestial",
      "Celestial Skin",
      "Cell",
      "Chalk Dust",
      "Chalkboard",
      "Cheetah",
      "Chess",
      "Chewbacca",
      "Chibi",
      "Chinese Swordsmen",
      "Chrome",
      "Chucky",
      "Cinderella",
      "Cinematic",
      "Clay",
      "Claymation",
      "Cloud Strife",
      "Clouds",
      "Comic",
      "Comic Batman",
      "Confederate Soldier",
      "Coral",
      "Cracked Marble",
      "Crayon",
      "Crusader",
      "Crusader Zombie",
      "Crystal Knight",
      "Cuphead Devil",
      "Cursed Samurai",
      "Cyber Samurai",
      "Cyberpunk",
      "Cyclops",
      "Cypher",
      "Da Vinci",
      "Daredevil",
      "Dark Fantasy",
      "Dark Reaper",
      "Darkseid",
      "Darth Maul",
      "Darth Vader",
      "Day of the Dead",
      "Deadpool",
      "Deathstroke",
      "Demon Hunter",
      "Desert Wraith",
      "Detective Conan",
      "Devil",
      "Dexter's Lab",
      "Diablo",
      "Dieselpunk",
      "Din Djarin",
      "Dio Brando",
      "Diorama",
      "Doctor Doom",
      "Doctor Fate",
      "Donald Duck",
      "Dragon Rider Knight",
      "Dragonball Z",
      "Dune",
      "Eclipse",
      "Edward Elric",
      "Engineer",
      "Erron Black",
      "FNAF",
      "Fabric",
      "Finn",
      "Fire Golems",
      "Flash",
      "Foam",
      "Fossils",
      "Frankenstein",
      "Freddy Krueger",
      "Frieza",
      "Fury Road",
      "Future Bot",
      "Futuristic Fantasy",
      "GLaDOS",
      "GTA",
      "Gandalf",
      "Gargoyle",
      "Genghis Khan",
      "Ghibli Anime",
      "Ghost",
      "Ghost Rider",
      "Gimli",
      "Girl with Pearl Earring",
      "Gladiators",
      "Glass Sculpture",
      "Goblin Inventor",
      "Gojo",
      "Golden Scarabs",
      "Gray NPC",
      "Green Goblin",
      "Green Lantern",
      "Grim Reaper",
      "Groot",
      "Gundam",
      "HK-47",
      "Hades",
      "Hades (Disney)",
      "Han Solo",
      "Hellboy",
      "Hercules",
      "Hitman",
      "Hobbits",
      "Hologram",
      "Hugging Bear",
      "Huggy Wuggy",
      "Hulk",
      "Ice and Fire",
      "Illustration",
      "Impressionism",
      "Indiana Jones",
      "Ink",
      "Ink Blot",
      "Ink Bottle",
      "Ink Poster",
      "Ink Samurai",
      "Insect",
      "Invader Zim",
      "Iron Man",
      "Iron Valor",
      "James Bond",
      "Japanese Raijin",
      "Japanese Susanoo",
      "Jarvan",
      "Jason Voorhees",
      "Jello",
      "Jinx",
      "John Darling",
      "John Wick",
      "Joker",
      "Jon Snow",
      "Joy vs. Anger",
      "Kai’Sa",
      "Karl Marx",
      "Ken",
      "Kenshiro",
      "Killer Croc",
      "King Arthur",
      "Knight",
      "Kratos",
      "Krillin",
      "Kung Fu",
      "Lara Croft",
      "Leatherface",
      "Legend of Zelda",
      "Lego",
      "Legolas",
      "Leprechaun",
      "Levi Ackerman",
      "Lich King",
      "Link",
      "Liquid Metal",
      "Luffy",
      "Luigi",
      "Mad Max",
      "Maestro Hulk",
      "Malfurion Stormrage",
      "Man Bat",
      "Mandalorian",
      "Marble",
      "Marble Chesspieces",
      "Marble Sculpture",
      "Mario",
      "Martian",
      "Master Chief",
      "Matrix",
      "Mech",
      "Mech Angels",
      "Mech Dragon",
      "Mech Valkryie",
      "Mechanical Scorpion",
      "Medieval Painting",
      "Melted Wax",
      "Metallic Angel",
      "Mickey Mouse",
      "Might Guy",
      "Mike Wazowski",
      "Minecraft",
      "Miner",
      "Minotaur King",
      "Molten Beasts",
      "Molten Rock",
      "Moss Spirits",
      "Mushroom",
      "Mystique",
      "Mythra",
      "Nala",
      "Napoleon Painting",
      "Naruto",
      "Naruto Uzumaki",
      "Nathan Drake",
      "Native American",
      "Nautilus",
      "Nebula",
      "Neon Dream",
      "Nightmare",
      "Ninja Turtle",
      "No Art Style",
      "Nosferatu",
      "Obi-Wan",
      "Obsidian Gods",
      "Oil Painting",
      "Oil Slick",
      "On Fire",
      "One Punch Man",
      "Oni",
      "Optimus Prime",
      "Orc",
      "Origami",
      "Origami Samurai",
      "Painterly Anime",
      "Paper Cut",
      "Paper Lantern",
      "Peely",
      "Pencil Sketch",
      "Pennywise",
      "Pepe the Frog",
      "Pharaoh",
      "Phoenix Wright",
      "Piccolo",
      "Pixar",
      "Pixel",
      "Plague Doctor",
      "Pokémon Trainer",
      "Polish Hussar",
      "Polygon",
      "Popeye",
      "Porcelain",
      "Porcelain Nobles",
      "Portal",
      "Poseidon",
      "Postapocalyptic",
      "Power Armor",
      "Power Ranger",
      "Predator",
      "Prince",
      "Prince of Persia",
      "Puppets",
      "Pyke",
      "Qilin",
      "Qing Dynasty",
      "Radiant Anime",
      "Raiden",
      "Raiden (Metal Gear)",
      "Realistic Anime",
      "Realistic Pixar",
      "Regan MacNeil",
      "Renaissance Painting",
      "Renaissance Sketch",
      "Retro Anime",
      "Retro Sci-Fi",
      "Rick & Morty",
      "Robin",
      "Robin Hood",
      "Roblox",
      "RoboCop",
      "Rocket Raccoon",
      "Rooster",
      "Russell (Up)",
      "Rusted Valor",
      "Samara Morgan",
      "Samurai",
      "Samurai Bot",
      "Samus",
      "Sand Sculpture",
      "Sandpaper",
      "Sandstorm Gladiator",
      "Sans Undertale",
      "Sarah Kerrigan",
      "Scorpion",
      "Scottish Highlander",
      "Scream",
      "Scuba Diver",
      "Shadow",
      "Shadow Phoenix",
      "Shark Gladiator",
      "Sharp Anime",
      "Shiva",
      "Shrek",
      "Sidewalk Chalk",
      "Simpsons",
      "Simón Bolívar",
      "Singed",
      "Sketch",
      "Slime",
      "Socrates",
      "Soft Anime",
      "Solar Eclipse",
      "Solar Flare",
      "Solid Snake",
      "South Park",
      "Spartan",
      "Spider-Venom",
      "Spiderman",
      "Spiderman 2099",
      "Spirit Fox",
      "Spray Paint",
      "Star Trek",
      "Starfield",
      "Statue of David",
      "Statue of Liberty",
      "Steampunk Captain",
      "Street Fighter",
      "Studio Ghibli",
      "Sub-Zero",
      "Sulley",
      "Sumo Wrestler",
      "Superman",
      "Swamp Creatures",
      "TF2 Spy",
      "Tarot Card",
      "Tarzan",
      "Terminator",
      "Terra Cotta Soldiers",
      "Thanos",
      "The Creeper",
      "The Flash",
      "The Mask",
      "The Mummy",
      "The Nun",
      "The Thinker",
      "The Void",
      "The Witcher",
      "Thor",
      "Thrall",
      "Tomb Raider",
      "Toy Story",
      "Tree Ent King",
      "Tribal Warrior",
      "Tyrande Whisperwind",
      "Underwater",
      "Vampire",
      "Van Gogh",
      "Venom",
      "Viking",
      "Vikings",
      "WWI Soldier",
      "WWII Paratrooper",
      "Warzone",
      "Washi",
      "Watercolor",
      "Watercolor Painting",
      "Wax",
      "Wax Museum",
      "Wendingo",
      "Western Anime",
      "White Walker",
      "William Wallace",
      "Wolverine",
      "Woodcut",
      "Wool Beast",
      "Wool Giant",
      "Wu Kong",
      "Wukong",
      "Wuxia Anime",
      "X-Ray Soldier",
      "Yarn",
      "Yeti",
      "Zelda",
      "Zeus (Disney)",
      "Zombie",
    ]),
    model: z
      .enum([
        "3D Anime",
        "Absolute Reality",
        "Default",
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
    version: z.enum(["default", "v1", "v2", "v3"]).optional(),
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
