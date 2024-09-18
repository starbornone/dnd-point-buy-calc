import { Race } from "@/types/race";

export const goliath: Race = {
  name: "Goliath",
  ability:
    "Your Strength score increases by 2, and your Constitution score increases by 1.",
  age: "Goliaths have lifespans comparable to humans. They enter adulthood in their late teens and usually live less than a century.",
  alignment:
    "Goliaths tend toward lawful alignments, given their strong adherence to social structure.",
  size: "Goliaths stand between 7 and 8 feet tall and weigh between 280 and 340 pounds. Your size is Medium.",
  speed: "Your base walking speed is 30 feet.",
  language: "You can speak, read, and write Common and Giant.",
  other: [
    "Natural Athlete",
    "You have proficiency in the Athletics skill.",
    "Stone's Endurance",
    "You can use your reaction to roll a d12 and add your Constitution modifier to reduce damage taken by that amount. Once you use this trait, you can't use it again until you finish a short or long rest.",
    "Powerful Build",
    "You count as one size larger when determining your carrying capacity and the weight you can push, drag, or lift.",
    "Mountain Born",
    "You’re acclimated to high altitude, including elevations above 20,000 feet. You’re also naturally adapted to cold climates.",
  ],
};
