import { Race } from "@/types/race";

export const halfElf: Race = {
  name: "Half-Elf",
  ability:
    "Your Charisma score increases by 2, and two other ability scores of your choice increase by 1.",
  age: "Half-elves mature at the same rate humans do and reach adulthood around the age of 20. They live much longer than humans, often exceeding 180 years.",
  alignment:
    "Half-elves share the chaotic bent of their elven heritage. They value both personal freedom and creative expression.",
  size: "Half-elves are about the same size as humans, ranging from 5 to 6 feet tall. Your size is Medium.",
  speed: "Your base walking speed is 30 feet.",
  language:
    "You can speak, read, and write Common, Elvish, and one extra language of your choice.",
  other: [
    "Darkvision",
    "Thanks to your elf blood, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of grey.",
    "Fey Ancestry",
    "You have advantage on saving throws against being charmed, and magic can't put you to sleep.",
    "Skill Versatility",
    "You gain proficiency in two skills of your choice.",
  ],
};
