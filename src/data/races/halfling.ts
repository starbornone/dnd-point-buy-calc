import { Race } from "@/types/race";

export const halfling: Race = {
  name: "Halfling",
  ability: "Your Dexterity score increases by 2.",
  age: "A halfling reaches adulthood at the age of 20 and generally lives into the middle of his or her second century.",
  alignment:
    "Most halflings are lawful good. As a rule, they are good-hearted and kind, hate to see others in pain, and have no tolerance for oppression.",
  size: "Halflings average about 3 feet tall and weigh about 40 pounds. Your size is Small.",
  speed: "Your base walking speed is 25 feet.",
  language: "You can speak, read, and write Common and Halfling.",
  other: [
    "Lucky",
    "When you roll a 1 on an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll.",
    "Brave",
    "You have advantage on saving throws against being frightened.",
    "Halfling Nimbleness",
    "You can move through the space of any creature that is of a size larger than yours.",
  ],
  variants: [
    {
      name: "Lightfoot Halfling",
      ability: "Your Charisma score increases by 1.",
      other: [
        "Naturally Stealthy",
        "You can attempt to hide even when you are obscured only by a creature that is at least one size larger than you.",
      ],
    },
    {
      name: "Stout Halfling",
      ability: "Your Constitution score increases by 1.",
      other: [
        "Stout Resilience",
        "You have advantage on saving throws against poison, and you have resistance against poison damage.",
      ],
    },
  ],
};
