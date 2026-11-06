import { bonuses } from "@/data/bonuses";
import { Race } from "@/types/race";

export const shifter: Race = {
  name: "Shifter",
  bonuses: bonuses({}),
  ability: "Your subrace determines your ability score increases.",
  age: "Shifters are quick to mature both physically and emotionally, reaching young adulthood at age 10. They rarely live to be more than 70 years old.",
  alignment:
    "Shifters tend toward neutrality, being more interested in survival than in concepts of good and evil.",
  size: "Shifters are about the same size as humans. Your size is Medium.",
  speed: "Your base walking speed is 30 feet.",
  language:
    "You can speak, read, and write Common and one other language of your choice.",
  other: [
    "Darkvision",
    "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
    "Shifting",
    "As a bonus action, you can assume a more bestial appearance. This transformation lasts for 1 minute, until you die, or until you revert as a bonus action. While shifted, you gain temporary hit points equal to your level + your Constitution modifier (minimum of 1 temporary hit point), and you gain a benefit based on your subrace. You must finish a short or long rest before you can shift again.",
  ],
  variants: [
    {
      name: "Beasthide",
      bonuses: bonuses({ constitution: 2, strength: 1 }),
      ability:
        "Your Constitution score increases by 2, and your Strength score increases by 1.",
      other: [
        "Natural Athlete",
        "You have proficiency in the Athletics skill.",
        "Shifting Feature",
        "Whenever you shift, you gain 1d6 additional temporary hit points. While shifted, you have a +1 bonus to AC.",
      ],
    },
    {
      name: "Longtooth",
      bonuses: bonuses({ strength: 2, dexterity: 1 }),
      ability:
        "Your Strength score increases by 2, and your Dexterity score increases by 1.",
      other: [
        "Fierce",
        "You have proficiency in the Intimidation skill.",
        "Shifting Feature",
        "While shifted, you can use your elongated fangs to make an unarmed strike as a bonus action. If you hit with your fangs, the strike deals piercing damage equal to 1d6 + your Strength modifier, instead of the bludgeoning damage normal for an unarmed strike.",
      ],
    },
    {
      name: "Swiftstride",
      bonuses: bonuses({ dexterity: 2, charisma: 1 }),
      ability:
        "Your Dexterity score increases by 2, and your Charisma score increases by 1.",
      other: [
        "Graceful",
        "You have proficiency in the Acrobatics skill.",
        "Shifting Feature",
        "While shifted, your walking speed increases by 10 feet. Additionally, you can move up to 10 feet as a reaction when an enemy ends its turn within 5 feet of you. This movement doesn't provoke opportunity attacks.",
      ],
    },
    {
      name: "Wildhunt",
      bonuses: bonuses({ wisdom: 2, dexterity: 1 }),
      ability:
        "Your Wisdom score increases by 2, and your Dexterity score increases by 1.",
      other: [
        "Natural Tracker",
        "You have proficiency in the Survival skill.",
        "Shifting Feature",
        "While shifted, you have advantage on Wisdom checks, and no creature within 30 feet of you can make an attack roll with advantage against you unless you're incapacitated.",
      ],
    },
  ],
};
