import { AttributeState } from "@/types";

export const calculateRacialBonuses = ({
  baseModifiers,
  isVariant,
  selectedBonuses,
  selectedRace,
  selectedVariant,
  variantModifiers,
}: {
  baseModifiers: AttributeState;
  isVariant?: boolean;
  selectedBonuses?: [keyof AttributeState, keyof AttributeState];
  selectedRace?: string;
  selectedVariant?: string;
  variantModifiers: AttributeState;
}) => {
  const bonuses = isVariant ? { ...variantModifiers } : { ...baseModifiers };

  if (selectedRace === "changeling" && selectedBonuses) {
    bonuses[selectedBonuses[0]] += 1;
  } else if (selectedVariant === "Variant Human" && selectedBonuses) {
    bonuses[selectedBonuses[0]] += 1;
    bonuses[selectedBonuses[1]] += 1;
  }

  return bonuses;
};
