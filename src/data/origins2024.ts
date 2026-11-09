import type { AttributeState } from "@/types";
import { dragons } from "./dragons";

type Ability = keyof AttributeState;

interface Background2024 {
  abilities: readonly [Ability, Ability, Ability];
  feat: (typeof originFeats2024)[number];
  skills: readonly [string, string];
}

// Player's Handbook (2024), Character Origins. Only starting choices used by the calculator.
export const backgrounds2024: Record<string, Background2024> = {
  Acolyte: { abilities: ["intelligence", "wisdom", "charisma"], feat: "Magic Initiate (Cleric)", skills: ["Insight", "Religion"] },
  Artisan: { abilities: ["strength", "dexterity", "intelligence"], feat: "Crafter", skills: ["Investigation", "Persuasion"] },
  Charlatan: { abilities: ["dexterity", "constitution", "charisma"], feat: "Skilled", skills: ["Deception", "Sleight of Hand"] },
  Criminal: { abilities: ["dexterity", "constitution", "intelligence"], feat: "Alert", skills: ["Sleight of Hand", "Stealth"] },
  Entertainer: { abilities: ["strength", "dexterity", "charisma"], feat: "Musician", skills: ["Acrobatics", "Performance"] },
  Farmer: { abilities: ["strength", "constitution", "wisdom"], feat: "Tough", skills: ["Animal Handling", "Nature"] },
  Guard: { abilities: ["strength", "intelligence", "wisdom"], feat: "Alert", skills: ["Athletics", "Perception"] },
  Guide: { abilities: ["dexterity", "constitution", "wisdom"], feat: "Magic Initiate (Druid)", skills: ["Stealth", "Survival"] },
  Hermit: { abilities: ["constitution", "wisdom", "charisma"], feat: "Healer", skills: ["Medicine", "Religion"] },
  Merchant: { abilities: ["constitution", "intelligence", "charisma"], feat: "Lucky", skills: ["Animal Handling", "Persuasion"] },
  Noble: { abilities: ["strength", "intelligence", "charisma"], feat: "Skilled", skills: ["History", "Persuasion"] },
  Sage: { abilities: ["constitution", "intelligence", "wisdom"], feat: "Magic Initiate (Wizard)", skills: ["Arcana", "History"] },
  Sailor: { abilities: ["strength", "dexterity", "wisdom"], feat: "Tavern Brawler", skills: ["Acrobatics", "Perception"] },
  Scribe: { abilities: ["dexterity", "intelligence", "wisdom"], feat: "Skilled", skills: ["Investigation", "Perception"] },
  Soldier: { abilities: ["strength", "dexterity", "constitution"], feat: "Savage Attacker", skills: ["Athletics", "Intimidation"] },
  Wayfarer: { abilities: ["dexterity", "wisdom", "charisma"], feat: "Lucky", skills: ["Insight", "Stealth"] },
};

interface Species2024 {
  size: "small" | "medium" | "smallOrMedium";
  speed: number;
  lineages?: readonly string[];
}

export const species2024: Record<string, Species2024> = {
  aasimar: { size: "smallOrMedium", speed: 30 },
  dragonborn: { size: "medium", speed: 30, lineages: dragons.map(({ name }) => name) },
  dwarf: { size: "medium", speed: 30 },
  elf: { size: "medium", speed: 30, lineages: ["Drow", "High Elf", "Wood Elf"] },
  gnome: { size: "small", speed: 30, lineages: ["Forest Gnome", "Rock Gnome"] },
  goliath: { size: "medium", speed: 35, lineages: ["Cloud", "Fire", "Frost", "Hill", "Stone", "Storm"] },
  halfling: { size: "small", speed: 30 },
  human: { size: "smallOrMedium", speed: 30 },
  orc: { size: "medium", speed: 30 },
  tiefling: { size: "smallOrMedium", speed: 30, lineages: ["Abyssal", "Chthonic", "Infernal"] },
};

export const originFeats2024 = [
  "Alert", "Crafter", "Healer", "Lucky", "Magic Initiate (Cleric)", "Magic Initiate (Druid)",
  "Magic Initiate (Wizard)", "Musician", "Savage Attacker", "Skilled", "Tavern Brawler", "Tough",
] as const;
