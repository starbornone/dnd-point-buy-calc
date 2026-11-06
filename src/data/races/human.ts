import { bonuses } from "@/data/bonuses";
import { Race } from "@/types/race";

export const human: Race = {
  name: "Human",
  bonuses: bonuses({
    strength: 1,
    dexterity: 1,
    constitution: 1,
    intelligence: 1,
    wisdom: 1,
    charisma: 1,
  }),
  ability: "Your ability scores each increase by 1.",
  age: "Humans reach adulthood in their late teens and live less than a century.",
  alignment:
    "Humans tend toward no particular alignment. The best and the worst are found among them.",
  size: "Humans vary widely in height and build, from barely 5 feet to well over 6 feet tall. Regardless of your position in that range, your size is Medium.",
  speed: "Your base walking speed is 30 feet.",
  language:
    "You can speak, read, and write Common and one extra language of your choice.",
  other: [],
  variants: [
    {
      name: "Standard Human",
      bonuses: bonuses({}),
      ability: "",
      other: [],
    },
    {
      name: "Variant Human",
      bonuses: bonuses({}),
      replacesParent: true,
      floatingBonus: { count: 2, exclude: [] },
      skillChoice: { count: 1 },
      ability: "Two different ability scores of your choice increase by 1.",
      other: [
        "Skills",
        "You gain proficiency in one skill of your choice.",
        "Feat",
        "You gain one feat of your choice.",
      ],
    },
  ],
};
