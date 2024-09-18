import { Race } from "@/types/race";

export const gnome: Race = {
  name: "Gnome",
  ability: "Your Intelligence score increases by 2.",
  age: "Gnomes mature at the same rate humans do, and most are expected to settle down into an adult life by around age 40. They can live 350 to almost 500 years.",
  alignment:
    "Gnomes are most often good. Those who lend toward law are sages, engineers, researchers, scholars, investigators, or inventors. Those who lend toward chaos are minstrels, tricksters, wanderers, or fanciful jewelers.",
  size: "Gnomes are between 3 and 4 feet tall and average about 40 pounds. Your size is Small.",
  speed: "Your base walking speed is 25 feet.",
  language: "You can speak, read, and write Common and Gnomish.",
  other: [
    "Darkvision",
    "Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of grey.",
    "Gnome Cunning",
    "You have advantage on all Intelligence, Wisdom, and Charisma saving throws against magic.",
  ],
  variants: [
    {
      name: "Forest Gnome",
      ability: "Your Dexterity score increases by 1.",
      other: [
        "Natural Illusionist",
        "You know the minor illusion cantrip. Intelligence is your spellcasting ability for it.",
        "Speak with Small Beasts",
        "Through sounds and gestures, you can communicate simple ideas with Small or smaller beasts. Forest gnomes love animals and often keep squirrels, badgers, rabbits, moles, woodpeckers, and other creatures as beloved pets.",
      ],
    },
    {
      name: "Rock Gnome",
      ability: "Your Constitution score increases by 1.",
      other: [
        "Artificer's Lore",
        "Whenever you make an Intelligence (History) check related to magic items, alchemical objects, or technological devices, you can add twice your proficiency bonus, instead of any proficiency bonus you normally apply.",
        "Tinker",
        "You have proficiency with artisan's tools (tinker's tools). Using those tools, you can spend 1 hour and 10 gp worth of materials to construct a Tiny clockwork device (AC 5, 1 hp).",
      ],
    },
  ],
};
