import { Race } from "@/types/race";

export const shifter: Race = {
  name: "Shifter",
  ability: "Your Dexterity score increases by 1.",
  age: "Shifters reach maturity slightly faster than humans, growing to adulthood around age 10. They live to be around 70 years old.",
  alignment:
    "Shifters have a strong connection to their primal instincts, making them tend toward chaotic alignments. Their inherent adaptability and independence drive them to value personal freedom.",
  size: "Shifters are about the same size as humans. Your size is Medium.",
  speed: "Your base walking speed is 30 feet.",
  language:
    "You can speak, read, and write Common and one other language of your choice.",
  other: [
    "Darkvision",
    "Your lycanthropic heritage grants you the ability to see in dark conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can’t discern color in darkness, only shades of gray.",
    "Shifting",
    "On your turn, you can shift as a bonus action. Shifting lasts for 1 minute or until you end it on your turn as a bonus action. While shifting, you gain temporary hit points equal to your level + your Constitution bonus (minimum of 1). You also gain a feature that depends on your shifter subrace, described below. You must finish a short or long rest before you can shift again.",
  ],
  variants: [
    {
      name: "Beasthide",
      ability: "Your Constitution score increases by 1.",
      other: ["Shifting Feature", "While shifting, you gain a +1 bonus to AC."],
    },
    {
      name: "Cliffwalk",
      ability: "Your Dexterity score increases by 1.",
      other: [
        "Shifting Feature",
        "While shifting, you gain a climb speed of 30 feet.",
      ],
    },
    {
      name: "Longstride",
      ability: "Your Dexterity score increases by 1.",
      other: [
        "Shifting Feature",
        "While shifting, you can use the Dash action as a bonus action.",
      ],
    },
    {
      name: "Longtooth",
      ability: "Your Strength score increases by 1.",
      other: [
        "Shifting Feature",
        "While shifting, you can make a bite attack as an action. This is a melee weapon attack that uses Strength for its attack roll and damage bonus and deals 1d6 piercing damage. If this attack hits a target that is your size or smaller, the target is also grappled.",
      ],
    },
    {
      name: "Razorclaw",
      ability: "Your Dexterity score increases by 1.",
      other: [
        "Shifting Feature",
        "While shifting, you can make an unarmed strike as a bonus action. You can use your Dexterity for its attack roll and damage bonus, and this attack deals slashing damage.",
      ],
    },
    {
      name: "Wildhunt",
      ability: "Your Wisdom score increases by 1.",
      other: [
        "Shifting Feature",
        "While shifting, you gain advantage on all Wisdom-based checks and saving throws.",
      ],
    },
  ],
};
