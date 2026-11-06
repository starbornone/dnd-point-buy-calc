import { bonuses } from "@/data/bonuses";
import { Race } from "@/types/race";

export const aasimar: Race = {
  name: "Aasimar",
  bonuses: bonuses({ charisma: 2 }),
  grantedCantrips: ["Light"],
  ability: "Your Charisma score increases by 2.",
  age: "Aasimar mature at the same rate as humans, but they can live up to 160 years.",
  alignment:
    "Imbued with celestial power, most aasimar are good. Those who fall into evil reject their heritage.",
  size: "Aasimar have the same range of height and weight as humans. Your size is Medium.",
  speed: "Your base walking speed is 30 feet.",
  language: "You can speak, read, and write Common and Celestial.",
  other: [
    "Darkvision",
    "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of grey.",
    "Celestial Resistance",
    "You have resistance to necrotic damage and radiant damage.",
    "Healing Hands",
    "As an action, you can touch a creature and restore a number of hit points equal to your level. You can't use this trait again until you finish a long rest.",
    "Light Bearer",
    "You know the light cantrip. Charisma is your spellcasting ability for it.",
  ],
  variants: [
    {
      name: "Protector",
      bonuses: bonuses({ wisdom: 1 }),
      ability: "Your Wisdom score increases by 1.",
      other: [
        "Radiant Soul",
        "Starting at 3rd level, you can use a bonus action to unleash divine energy for 1 minute. You gain a flying speed of 30 feet, and once on each of your turns you can deal extra radiant damage equal to your level to one target when you deal damage with an attack or a spell. Once you use this trait, you can't use it again until you finish a long rest.",
      ],
    },
    {
      name: "Scourge",
      bonuses: bonuses({ constitution: 1 }),
      ability: "Your Constitution score increases by 1.",
      other: [
        "Radiant Consumption",
        "Starting at 3rd level, you can use a bonus action to unleash searing light for 1 minute. You shed bright light in a 10-foot radius and dim light for an additional 10 feet. At the end of each of your turns, you and each creature within 10 feet of you take radiant damage equal to half your level (rounded up). Once on each of your turns, one attack or spell deals extra radiant damage equal to your level. Once you use this trait, you can't use it again until you finish a long rest.",
      ],
    },
    {
      name: "Fallen",
      bonuses: bonuses({ strength: 1 }),
      ability: "Your Strength score increases by 1.",
      other: [
        "Necrotic Shroud",
        "Starting at 3rd level, you can use a bonus action to unleash necrotic energy for 1 minute. Creatures within 10 feet of you that can see you must succeed on a Charisma saving throw (DC 8 + your proficiency bonus + your Charisma modifier) or be frightened of you until the end of your next turn. Once on each of your turns, one attack or spell deals extra necrotic damage equal to your level. Once you use this trait, you can't use it again until you finish a long rest.",
      ],
    },
  ],
};
