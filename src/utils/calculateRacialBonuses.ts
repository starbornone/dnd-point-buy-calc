import { addBonuses } from "@/data/bonuses";
import { AttributeState, FloatingBonus, Race, Variant } from "@/types";

export const resolveFloatingBonus = (
  race: Race | undefined,
  variant: Variant | undefined
): FloatingBonus | undefined => {
  if (!race) return undefined;
  if (variant?.replacesParent) return variant.floatingBonus;
  return variant?.floatingBonus ?? race.floatingBonus;
};

export const calculateRacialBonuses = ({
  fixedBonuses,
  floatingBonus,
  selectedBonuses,
}: {
  fixedBonuses: AttributeState;
  floatingBonus?: FloatingBonus;
  selectedBonuses: readonly (keyof AttributeState | undefined)[];
}): AttributeState => {
  const totals = { ...fixedBonuses };
  if (!floatingBonus) return totals;

  const used = new Set<keyof AttributeState>();
  for (const pick of selectedBonuses.slice(0, floatingBonus.count)) {
    if (!pick || used.has(pick) || floatingBonus.exclude.includes(pick)) {
      continue;
    }
    totals[pick] += 1;
    used.add(pick);
  }

  return totals;
};

export const combineFixedBonuses = (
  race: Race,
  variant: Variant | undefined
): AttributeState => {
  if (!variant) return race.bonuses;
  if (variant.replacesParent) return variant.bonuses;
  return addBonuses(race.bonuses, variant.bonuses);
};
