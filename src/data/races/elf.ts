import { Race } from "@/types/race";

export const elf: Race = {
  name: "Elf",
  ability: "Your Dexterity score increases by 2.",
  age: "Although elves reach physical maturity at about the same age as humans, the elven understanding of adulthood goes beyond physical growth to encompass worldly experience. An elf typically claims adulthood and an adult name around the age of 100 and can live to be 750 years old.",
  alignment:
    "Elves love freedom, variety, and self-expression, so they lean strongly toward the gentler aspects of chaos. They value and protect others' freedom as well as their own, and they are more often good than not. The drow are an exception; their exile into the Underdark has made them vicious and dangerous. Drow are more often evil than not.",
  size: "Elves range from under 5 to over 6 feet tall and have slender builds. Your size is Medium.",
  speed: "Your base walking speed is 30 feet.",
  language: "You can speak, read, and write Common and Elvish.",
  other: [
    "Darkvision",
    "Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of grey.",
    "Keen Senses",
    "You have proficiency in the Perception skill.",
    "Fey Ancestry",
    "You have advantage on saving throws against being charmed, and magic can't put you to sleep.",
    "Trance",
    "Elves don't need to sleep. Instead, they meditate deeply, remaining semiconscious, for 4 hours a day.",
  ],
  variants: [
    {
      name: "Dark Elf (Drow)",
      ability: "Your Charisma score increases by 1.",
      other: [
        "Superior Darkvision",
        "Your darkvision has a radius of 120 feet.",
        "Sunlight Sensitivity",
        "You have disadvantage on attack rolls and on Wisdom (Perception) checks that rely on sight when you, the target of your attack, or whatever you are trying to perceive is in direct sunlight.",
        "Drow Magic",
        "You know the dancing lights cantrip. When you reach 3rd level, you can cast the faerie fire spell once per day. When you reach 5th level, you can also cast the darkness spell once per day. Charisma is your spellcasting ability for these spells.",
        "Drow Weapon Training",
        "You have proficiency with rapiers, shortswords, and hand crossbows.",
      ],
    },
    {
      name: "High Elf",
      ability: "Your Intelligence score increases by 1.",
      other: [
        "Elf Weapon Training",
        "You have proficiency with the longsword, shortsword, shortbow, and longbow.",
        "Cantrip",
        "You know one cantrip of your choice from the wizard spell list. Intelligence is your spellcasting ability for it.",
        "Extra Language",
        "You can speak, read, and write one extra language of your choice.",
      ],
    },
    {
      name: "Wood Elf",
      ability: "Your Wisdom score increases by 1.",
      other: [
        "Elf Weapon Training",
        "You have proficiency with the longsword, shortsword, shortbow, and longbow.",
        "Fleet of Foot",
        "Your base walking speed increases to 35 feet.",
        "Mask of the Wild",
        "You can attempt to hide even when you are only lightly obscured by foliage, heavy rain, falling snow, mist, and other natural phenomena.",
      ],
    },
    {
      name: "Eladrin",
      ability: "Your Intelligence score increases by 1.",
      other: [
        "Elf Weapon Training",
        "You have proficiency with the longsword, shortsword, shortbow, and longbow.",
        "Fey Step",
        "You can cast the misty step spell once using this trait. You regain the ability to do so when you finish a short or long rest.",
      ],
    },
  ],
};
