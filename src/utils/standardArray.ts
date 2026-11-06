import { attributeKeys } from "@/data/attributeNames";
import { AttributeState } from "@/types";

export const standardArrayAttributes = (): AttributeState => ({
  strength: 15,
  dexterity: 14,
  constitution: 13,
  intelligence: 12,
  wisdom: 10,
  charisma: 8,
});

export const STANDARD_ARRAY_SCORES = attributeKeys.map(
  (key) => standardArrayAttributes()[key]
);
