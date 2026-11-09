export const languageGroups = [
  {
    name: "Standard languages",
    languages: [
      "Common",
      "Dwarvish",
      "Elvish",
      "Giant",
      "Gnomish",
      "Goblin",
      "Halfling",
      "Orc",
    ],
  },
  {
    name: "Exotic languages",
    languages: [
      "Abyssal",
      "Celestial",
      "Draconic",
      "Deep Speech",
      "Infernal",
      "Primordial",
      "Sylvan",
      "Undercommon",
    ],
  },
] as const;

export type LanguageGroupName = (typeof languageGroups)[number]["name"];

export const languages = languageGroups.flatMap((group) => group.languages);

export type LanguageName = (typeof languages)[number];
