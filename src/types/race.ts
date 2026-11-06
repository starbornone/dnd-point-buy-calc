export interface AttributeState {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export type BonusPicks = [
  keyof AttributeState | undefined,
  keyof AttributeState | undefined,
];

export interface FloatingBonus {
  count: 1 | 2;
  exclude: (keyof AttributeState)[];
}

export interface SkillChoice {
  count: 1 | 2;
  options?: readonly string[];
}

export interface LanguageChoice {
  count: 1 | 2;
  exclude?: readonly string[];
}

export interface ToolChoice {
  options?: readonly string[];
}

export interface CantripChoice {
  list: "wizard";
}

export interface Variant {
  name: string;
  bonuses: AttributeState;
  ability: string;
  other: string[];
  replacesParent?: boolean;
  speed?: string;
  floatingBonus?: FloatingBonus;
  skillChoice?: SkillChoice;
  grantedSkills?: readonly string[];
  grantedTools?: readonly string[];
  grantedCantrips?: readonly string[];
  languageChoice?: LanguageChoice;
  toolChoice?: ToolChoice;
  cantripChoice?: CantripChoice;
}

export interface Race {
  name: string;
  bonuses: AttributeState;
  ability: string;
  age: string;
  alignment: string;
  size: string;
  speed: string;
  language: string;
  other: string[];
  variants?: Variant[];
  floatingBonus?: FloatingBonus;
  skillChoice?: SkillChoice;
  grantedSkills?: readonly string[];
  grantedTools?: readonly string[];
  grantedCantrips?: readonly string[];
  languageChoice?: LanguageChoice;
  toolChoice?: ToolChoice;
  cantripChoice?: CantripChoice;
  draconicAncestry?: boolean;
}
