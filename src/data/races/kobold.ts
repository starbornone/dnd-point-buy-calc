import { Race } from "@/types/race";

export const kobold: Race = {
  name: "Kobold",
  ability:
    "Your Dexterity score increases by 2, and your Strength score decreases by 1.",
  age: "Kobolds reach maturity at age 6 and live up to 120 years.",
  alignment:
    "Kobolds tend to be chaotic, often driven by their instincts and curiosity.",
  size: "Kobolds are about 2 to 3 feet tall. Your size is Small.",
  speed: "Your base walking speed is 30 feet.",
  language: "You can speak, read, and write Common and Draconic.",
  other: [
    "Darkvision",
    "You can see in dim light within 60 feet of you as if it were bright light.",
    "Pack Tactics",
    "You have advantage on an attack roll against a creature if at least one of your allies is within 5 feet of the creature and the ally isn't incapacitated.",
    "Sunlight Sensitivity",
    "You have disadvantage on attack rolls and on Wisdom (Perception) checks that rely on sight when you, the target of your attack, or whatever you are trying to perceive is in direct sunlight.",
  ],
};
