import { AttributeState } from "@/types";

export const calculateRacialBonuses = ({
  baseModifiers,
  variantModifiers,
  isVariant,
  selectedVariant,
  selectedBonuses,
}: {
  baseModifiers: AttributeState;
  variantModifiers: AttributeState;
  isVariant?: boolean;
  selectedVariant?: string;
  selectedBonuses?: [keyof AttributeState, keyof AttributeState];
}) => {
  const bonuses = isVariant ? { ...variantModifiers } : { ...baseModifiers };

  if (selectedVariant === "Variant Human" && selectedBonuses) {
    bonuses[selectedBonuses[0]] += 1;
    bonuses[selectedBonuses[1]] += 1;
  }

  return bonuses;
};
