import { Race } from "@/types/race";

export const dwarf: Race = {
  name: "Dwarf",
  ability: "Your Constitution score increases by 2.",
  age: "Dwarves mature at the same rate as humans, but they’re considered young until they reach the age of 50. On average, they live about 350 years.",
  alignment:
    "Most dwarves are lawful, believing firmly in the benefits of a well-ordered society. They tend toward good as well, with a strong sense of fair play and a belief that everyone deserves to share in the benefits of a just order.",
  size: "Dwarves stand between 4 and 5 feet tall and average about 150 pounds. Your size is Medium.",
  speed:
    "Your base walking speed is 25 feet. Your speed is not reduced by wearing heavy armor.",
  language:
    "You can speak, read, and write Common and Dwarvish. Dwarvish is full of hard consonants and guttural sounds, and those characteristics spill over into whatever other language a dwarf might speak.",
  other: [
    "Darkvision",
    "Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can’t discern color in darkness, only shades of grey.",
    "Dwarven Resilience",
    "You have advantage on saving throws against poison, and you have resistance against poison damage.",
    "Dwarven Combat Training",
    "You have proficiency with the battleaxe, handaxe, light hammer, and warhammer.",
    "Tool Proficiency",
    "You gain proficiency with the artisan's tools of your choice: smith's tools, brewer’s supplies, or mason’s tools.",
    "Stonecunning",
    "Whenever you make an Intelligence (History) check related to the origin of stonework, you are considered proficient in the History skill and add double your proficiency bonus to the check, instead of your normal proficiency bonus.",
  ],
  variants: [
    {
      name: "Hill Dwarf",
      ability: "Your Wisdom score increases by 1.",
      other: [
        "Dwarven Toughness",
        "Your hit point maximum increases by 1, and it increases by 1 every time you gain a level.",
      ],
    },
    {
      name: "Mountain Dwarf",
      ability: "Your Strength score increases by 2.",
      other: [
        "Dwarven Armor Training",
        "You have proficiency with light and medium armor.",
      ],
    },
  ],
};
