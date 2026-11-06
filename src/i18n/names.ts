import { raceDropdown } from "@/data/raceDropdown";
import { skills } from "@/data/skills";
import { AttributeState } from "@/types";
import { Locale } from "./locale";

type SkillName = (typeof skills)[number];
type RaceKey = (typeof raceDropdown)[number]["value"];

const identity = <T extends string>(items: readonly T[]): Record<T, string> =>
  Object.fromEntries(items.map((item) => [item, item])) as unknown as Record<T, string>;

export const abilityNames: Record<Locale, Record<keyof AttributeState, string>> = {
  en: {
    strength: "Strength",
    dexterity: "Dexterity",
    constitution: "Constitution",
    intelligence: "Intelligence",
    wisdom: "Wisdom",
    charisma: "Charisma",
  },
  es: {
    strength: "Fuerza",
    dexterity: "Destreza",
    constitution: "Constitución",
    intelligence: "Inteligencia",
    wisdom: "Sabiduría",
    charisma: "Carisma",
  },
};

export const skillNames: Record<Locale, Record<SkillName, string>> = {
  en: identity(skills),
  es: {
    Acrobatics: "Acrobacias",
    "Animal Handling": "Trato con animales",
    Arcana: "Arcano",
    Athletics: "Atletismo",
    Deception: "Engaño",
    History: "Historia",
    Insight: "Perspicacia",
    Intimidation: "Intimidación",
    Investigation: "Investigación",
    Medicine: "Medicina",
    Nature: "Naturaleza",
    Perception: "Percepción",
    Performance: "Interpretación",
    Persuasion: "Persuasión",
    Religion: "Religión",
    "Sleight of Hand": "Juego de manos",
    Stealth: "Sigilo",
    Survival: "Supervivencia",
  },
};

export const raceNames: Record<Locale, Record<RaceKey, string>> = {
  en: {
    aarakocra: "Aarakocra",
    aasimar: "Aasimar",
    changeling: "Changeling",
    dragonborn: "Dragonborn",
    dwarf: "Dwarf",
    elf: "Elf",
    firbolg: "Firbolg",
    genasi: "Genasi",
    githyanki: "Githyanki",
    githzerai: "Githzerai",
    gnome: "Gnome",
    goliath: "Goliath",
    halfElf: "Half-Elf",
    halfOrc: "Half-Orc",
    halfling: "Halfling",
    human: "Human",
    kobold: "Kobold",
    lizardfolk: "Lizardfolk",
    shifter: "Shifter",
    tabaxi: "Tabaxi",
    tiefling: "Tiefling",
    warforged: "Warforged",
  },
  es: {
    aarakocra: "Aarakocra",
    aasimar: "Aasimar",
    changeling: "Cambiante",
    dragonborn: "Dracónido",
    dwarf: "Enano",
    elf: "Elfo",
    firbolg: "Firbolg",
    genasi: "Genasi",
    githyanki: "Githyanki",
    githzerai: "Githzerai",
    gnome: "Gnomo",
    goliath: "Goliat",
    halfElf: "Semielfo",
    halfOrc: "Semiorco",
    halfling: "Mediano",
    human: "Humano",
    kobold: "Kóbold",
    lizardfolk: "Hombre lagarto",
    shifter: "Shifter",
    tabaxi: "Tabaxi",
    tiefling: "Tiefling",
    warforged: "Warforged",
  },
};

const variantNames: Record<Locale, Record<string, string>> = {
  en: {},
  es: {
    "Hill Dwarf": "Enano de las colinas",
    "Mountain Dwarf": "Enano de las montañas",
    "Dark Elf (Drow)": "Elfo oscuro (drow)",
    "High Elf": "Alto elfo",
    "Wood Elf": "Elfo de los bosques",
    "Forest Gnome": "Gnomo de los bosques",
    "Rock Gnome": "Gnomo de las rocas",
    "Lightfoot Halfling": "Mediano piesligeros",
    "Stout Halfling": "Mediano fornido",
    "Standard Human": "Humano estándar",
    "Variant Human": "Humano variante",
    "Air Genasi": "Genasi del aire",
    "Earth Genasi": "Genasi de la tierra",
    "Fire Genasi": "Genasi del fuego",
    "Water Genasi": "Genasi del agua",
    Fallen: "Caído",
  },
};

export const abilityLabel = (locale: Locale, key: keyof AttributeState): string =>
  abilityNames[locale][key];

export const skillLabel = (locale: Locale, skill: string): string =>
  skillNames[locale][skill as SkillName] ?? skill;

export const raceLabel = (locale: Locale, key: string): string =>
  raceNames[locale][key as RaceKey] ?? raceNames.en[key as RaceKey] ?? key;

export const variantLabel = (locale: Locale, name: string): string =>
  variantNames[locale][name] ?? name;
