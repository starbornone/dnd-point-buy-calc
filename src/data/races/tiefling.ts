import { Race } from "@/types/race";

export const tiefling: Race = {
  name: "Tiefling",
  ability:
    "Your Intelligence score increases by 1, and your Charisma score increases by 2.",
  age: "Tieflings mature at the same rate as humans but live a few years longer.",
  alignment:
    "Tieflings might not have an innate tendency toward evil, but many of them end up there. Evil or not, an independent nature inclines many tieflings toward a chaotic alignment.",
  size: "Tieflings are about the same size and build as humans. Your size is Medium.",
  speed: "Your base walking speed is 30 feet.",
  language: "You can speak, read, and write Common and Infernal.",
  other: [
    "Darkvision",
    "Thanks to your infernal heritage, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of grey.",
    "Hellish Resistance",
    "You have resistance to fire damage.",
    "Infernal Legacy",
    "You know the thaumaturgy cantrip. Once you reach 3rd level, you can cast the hellish rebuke spell once per day as a 2nd-level spell. Once you reach 5th level, you can also cast the darkness spell once per day. Charisma is your spellcasting ability for these spells.",
  ],
};
