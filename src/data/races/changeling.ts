import { Race } from "@/types/race";

export const changeling: Race = {
  name: "Changeling",
  ability: "Your Dexterity and Charisma scores increase by 1.",
  age: "Changelings mature slightly faster than humans but share a similar lifespan, reaching adulthood in their late teens and living up to 100 years.",
  alignment:
    "Changelings tend toward neutral alignments, balancing between many identities. Their flexibility in adopting different personas gives them an adaptable and pragmatic outlook on life.",
  size: "Changelings are built much like humans, but a little leaner. Your size is Medium.",
  speed: "Your base walking speed is 30 feet.",
  language:
    "You can speak, read, and write Common and two other languages of your choice.",
  other: [
    "Duplicity",
    "You gain proficiency in the Deception skill.",
    "Shapechanger",
    "As an action, you can polymorph into any humanoid of your size that you have seen, or back into your true form. However, your equipment does not change with you. If you die, you revert to your natural appearance.",
  ],
};
