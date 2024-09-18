import { Race } from "@/types/race";

export const human: Race = {
  name: "Human",
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
      name: "Variant Human",
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
