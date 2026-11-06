import { bonuses } from "@/data/bonuses";
import { Race } from "@/types/race";

export const changeling: Race = {
  name: "Changeling",
  bonuses: bonuses({ charisma: 2 }),
  floatingBonus: { count: 1, exclude: ["charisma"] },
  skillChoice: {
    count: 2,
    options: ["Deception", "Insight", "Intimidation", "Persuasion"],
  },
  languageChoice: { count: 2, exclude: ["Common"] },
  ability:
    "Your Charisma score increases by 2, and one other ability score of your choice increases by 1.",
  age: "Changelings mature slightly faster than humans but share a similar lifespan, reaching adulthood in their late teens and living up to 100 years.",
  alignment:
    "Changelings tend toward neutral alignments, balancing between many identities. Their flexibility in adopting different personas gives them an adaptable and pragmatic outlook on life.",
  size: "Changelings are built much like humans, but a little leaner. Your size is Medium.",
  speed: "Your base walking speed is 30 feet.",
  language:
    "You can speak, read, and write Common and two other languages of your choice.",
  other: [
    "Change Appearance",
    "As an action, you can transform your appearance or revert to your natural form. You determine the specifics of the changes, including your coloration, hair length, and sex. You can't change your size, body type, or number of limbs.",
    "Changeling Instincts",
    "You gain proficiency with two of the following skills of your choice: Deception, Insight, Intimidation, and Persuasion.",
  ],
};
