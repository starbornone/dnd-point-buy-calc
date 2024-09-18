import { Race } from "@/types/race";

export const firbolg: Race = {
  name: "Firbolg",
  ability:
    "Your Wisdom score increases by 2, and your Strength score increases by 1.",
  age: "Firbolgs reach adulthood in their late teens and can live up to 500 years.",
  alignment:
    "Firbolgs tend to be good and protective of nature, often leaning toward neutral alignments.",
  size: "Firbolgs are taller than humans, standing between 7 and 8 feet tall. Your size is Medium.",
  speed: "Your base walking speed is 30 feet.",
  language: "You can speak, read, and write Common, Elvish, and Sylvan.",
  other: [
    "Hidden Step",
    "As a bonus action, you can magically turn invisible until the start of your next turn or until you attack or cast a spell.",
    "Powerful Build",
    "You count as one size larger when determining your carrying capacity and the weight you can push, drag, or lift.",
    "Firbolg Magic",
    "You can cast the Detect Magic and Disguise Self spells. Wisdom is your spellcasting ability for these spells.",
  ],
};
