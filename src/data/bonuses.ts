import { AttributeState } from "@/types";

export const emptyBonuses = (): AttributeState => ({
  strength: 0,
  dexterity: 0,
  constitution: 0,
  intelligence: 0,
  wisdom: 0,
  charisma: 0,
});

export const bonuses = (partial: Partial<AttributeState>): AttributeState => ({
  ...emptyBonuses(),
  ...partial,
});

export const addBonuses = (
  base: AttributeState,
  extra: AttributeState
): AttributeState => ({
  strength: base.strength + extra.strength,
  dexterity: base.dexterity + extra.dexterity,
  constitution: base.constitution + extra.constitution,
  intelligence: base.intelligence + extra.intelligence,
  wisdom: base.wisdom + extra.wisdom,
  charisma: base.charisma + extra.charisma,
});
