import { attributeKeys } from "./attributeNames";
import { AttributeState } from "@/types";

type Ability = keyof AttributeState;

export const feats = [
  "Actor",
  "Alert",
  "Athlete",
  "Charger",
  "Crossbow Expert",
  "Defensive Duelist",
  "Dual Wielder",
  "Dungeon Delver",
  "Durable",
  "Elemental Adept",
  "Grappler",
  "Great Weapon Master",
  "Healer",
  "Heavily Armored",
  "Heavy Armor Master",
  "Inspiring Leader",
  "Keen Mind",
  "Lightly Armored",
  "Linguist",
  "Lucky",
  "Mage Slayer",
  "Magic Initiate",
  "Martial Adept",
  "Medium Armor Master",
  "Mobile",
  "Moderately Armored",
  "Mounted Combatant",
  "Observant",
  "Polearm Master",
  "Resilient",
  "Ritual Caster",
  "Savage Attacker",
  "Sentinel",
  "Sharpshooter",
  "Shield Master",
  "Skilled",
  "Skulker",
  "Spell Sniper",
  "Tavern Brawler",
  "Tough",
  "War Caster",
  "Weapon Master",
] as const;

export type FeatName = (typeof feats)[number];

const featAbilityOptions: Partial<Record<FeatName, readonly Ability[]>> = {
  Actor: ["charisma"],
  Athlete: ["strength", "dexterity"],
  Durable: ["constitution"],
  "Heavily Armored": ["strength"],
  "Heavy Armor Master": ["strength"],
  "Keen Mind": ["intelligence"],
  "Lightly Armored": ["strength", "dexterity"],
  Linguist: ["intelligence"],
  "Moderately Armored": ["strength", "dexterity"],
  Observant: ["intelligence", "wisdom"],
  Resilient: attributeKeys,
  "Tavern Brawler": ["strength", "constitution"],
  "Weapon Master": ["strength", "dexterity"],
};

export const featOptions = (feat: string): readonly Ability[] =>
  featAbilityOptions[feat as FeatName] ?? [];

export const isFeatName = (feat: string): feat is FeatName =>
  feats.includes(feat as FeatName);
