import { Race } from "@/types/race";

export const aasimar: Race = {
  name: "Aasimar",
  ability:
    "Your Wisdom score increases by 1, and your Charisma score increases by 2.",
  age: "Aasimar mature at the same rate as humans but live a few years longer.",
  alignment:
    "Due to their celestial heritage, aasimar are often good. However, some aasimar fall into evil, rejecting their heritage.",
  size: "Aasimar are built like well-proportioned humans. Your size is Medium.",
  speed: "Your base walking speed is 30 feet.",
  language: "You can speak, read, and write Common and Celestial.",
  other: [
    "Darkvision",
    "Thanks to your celestial heritage, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of grey.",
    "Celestial Resistance",
    "You have resistance to necrotic damage and radiant damage.",
    "Celestial Legacy",
    "You know the light cantrip. Once you reach 3rd level, you can cast the lesser restoration spell once with this trait, and you regain the ability to cast it after a long rest. Once you reach 5th level, you can cast the daylight spell once with this trait.",
  ],
};
