export interface Variant {
  name: string;
  ability: string;
  other: string[];
}

export interface Race {
  name: string;
  ability: string;
  age: string;
  alignment: string;
  size: string;
  speed: string;
  language: string;
  other: string[];
  variants?: Variant[];
}

export interface RaceModifier {
  name: string;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  variants?: string[];
}

export interface AttributeState {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}
