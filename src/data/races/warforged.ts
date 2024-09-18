import { Race } from "@/types/race";

export const warforged: Race = {
  name: "Warforged",
  ability:
    "Your Constitution score increases by 1, and one other ability score of your choice increases by 1.",
  age: "Warforged are built complete and have no childhood. They typically have lifespans of around 30 years but are functionally immortal.",
  alignment:
    "Most warforged are neutral, leaning toward lawful. They obey their orders and value the concept of duty.",
  size: "Warforged are between 5 and 6 feet tall and weigh about 270 pounds. Your size is Medium.",
  speed: "Your base walking speed is 30 feet.",
  language:
    "You can speak, read, and write Common and one other language of your choice.",
  other: [
    "Constructed Resilience",
    "You have advantage on saving throws against being poisoned, and you have resistance to poison damage. You don’t need to eat, drink, or breathe. You are immune to disease. You don’t need to sleep, and magic can’t put you to sleep.",
    "Sentry's Rest",
    "When you take a long rest, you must spend at least 6 hours in an inactive, motionless state, rather than sleeping. In this state, you appear inert, but it doesn’t render you unconscious, and you can see and hear as normal.",
    "Integrated Protection",
    "You can don or doff armor as an action. You gain a +1 bonus to Armor Class.",
    "Specialized Design",
    "You gain one skill proficiency and one tool proficiency of your choice.",
  ],
};
