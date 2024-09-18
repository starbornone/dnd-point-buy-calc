import { Race } from "@/types/race";

export const halfOrc: Race = {
  name: "Half-Orc",
  ability:
    "Your Strength score increases by 2, and your Constitution score increases by 1.",
  age: "Half-orcs mature a little faster than humans, reaching adulthood around age 14. They age noticeably faster and rarely live longer than 75 years.",
  alignment:
    "Half-orcs inherit a tendency toward chaos from their orc parents and are not strongly inclined toward good.",
  size: "Half-orcs are somewhat larger and bulkier than humans, and they range from 5 to well over 6 feet tall. Your size is Medium.",
  speed: "Your base walking speed is 30 feet.",
  language: "You can speak, read, and write Common and Orc.",
  other: [
    "Darkvision",
    "Thanks to your orc blood, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light.",
    "Menacing",
    "You gain proficiency in the Intimidation skill.",
    "Relentless Endurance",
    "When you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead. You can't use this feature again until you finish a long rest.",
    "Savage Attacks",
    "When you score a critical hit with a melee weapon attack, you can roll one of the weapon's damage dice one additional time and add it to the extra damage of the critical hit.",
  ],
};
