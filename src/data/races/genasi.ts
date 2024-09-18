import { Race } from "@/types/race";

export const genasi: Race = {
  name: "Genasi",
  ability: "Your Constitution score increases by 2.",
  age: "Genasi mature at about the same rate as humans and reach adulthood in their late teens. They live somewhat longer than humans do, up to 120 years.",
  alignment:
    "Genasi tend toward neutral alignments, adapting to the temperaments of the elemental forces that created them.",
  size: "Genasi are as varied as their human parents but are generally built like humans, standing anywhere from 5 to 6 feet tall. Your size is Medium.",
  speed: "Your base walking speed is 30 feet.",
  language: "You can speak, read, and write Common and Primordial.",
  other: [],
  variants: [
    {
      name: "Air Genasi",
      ability: "Your Dexterity score increases by 1.",
      other: [
        "Unending Breath",
        "You can hold your breath indefinitely while you’re not incapacitated.",
        "Mingle with the Wind",
        "You can cast the levitate spell once with this trait, requiring no material components, and you regain the ability to do so when you finish a long rest. Constitution is your spellcasting ability for this spell.",
      ],
    },
    {
      name: "Earth Genasi",
      ability: "Your Strength score increases by 1.",
      other: [
        "Earth Walk",
        "You can move across difficult terrain made of earth or stone without expending extra movement.",
        "Merge with Stone",
        "You can cast the pass without trace spell once with this trait, requiring no material components, and you regain the ability to do so when you finish a long rest. Constitution is your spellcasting ability for this spell.",
      ],
    },
    {
      name: "Fire Genasi",
      ability: "Your Intelligence score increases by 1.",
      other: [
        "Darkvision",
        "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of grey.",
        "Fire Resistance",
        "You have resistance to fire damage.",
        "Reach to the Blaze",
        "You know the produce flame cantrip. Once you reach 3rd level, you can cast the burning hands spell once with this trait, and you regain the ability to do so when you finish a long rest. Constitution is your spellcasting ability for these spells.",
      ],
    },
    {
      name: "Water Genasi",
      ability: "Your Wisdom score increases by 1.",
      other: [
        "Acid Resistance",
        "You have resistance to acid damage.",
        "Amphibious",
        "You can breathe air and water.",
        "Call to the Wave",
        "You know the shape water cantrip. Once you reach 3rd level, you can cast the create or destroy water spell once with this trait, and you regain the ability to do so when you finish a long rest. Constitution is your spellcasting ability for these spells.",
      ],
    },
  ],
};
