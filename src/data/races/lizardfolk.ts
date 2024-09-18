import { Race } from "@/types/race";

export const lizardfolk: Race = {
  name: "Lizardfolk",
  ability:
    "Your Constitution score increases by 2, and your Wisdom score increases by 1.",
  age: "Lizardfolk reach adulthood around age 14 and can live up to 80 years.",
  alignment:
    "Lizardfolk tend to be neutral, valuing survival and practicality over morality.",
  size: "Lizardfolk are taller than humans, standing between 6 and 7 feet tall. Your size is Medium.",
  speed: "Your base walking speed is 30 feet.",
  language: "You can speak, read, and write Common and Draconic.",
  other: [
    "Bite",
    "You have a bite attack that deals 1d6 piercing damage. This is a natural weapon you can use to make unarmed strikes.",
    "Hold Breath",
    "You can hold your breath for up to 15 minutes.",
    "Cunning Artisan",
    "When you make a tool, you can use it to craft a simple item.",
  ],
};
