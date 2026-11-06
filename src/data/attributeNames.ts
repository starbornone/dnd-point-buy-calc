import { AttributeState } from "@/types";

export const attributeLabels: Record<keyof AttributeState, string> = {
  strength: "Strength",
  dexterity: "Dexterity",
  constitution: "Constitution",
  intelligence: "Intelligence",
  wisdom: "Wisdom",
  charisma: "Charisma",
};

export const attributeKeys = Object.keys(
  attributeLabels
) as (keyof AttributeState)[];
