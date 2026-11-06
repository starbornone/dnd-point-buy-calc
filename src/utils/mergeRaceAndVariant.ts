import { Race } from "@/types/race";
import { combineFixedBonuses } from "./calculateRacialBonuses";

export const mergeRaceAndVariant = (
  baseRace: Race,
  variantName: string | null
): Race => {
  if (!variantName) return baseRace;

  const variant = baseRace.variants?.find((entry) => entry.name === variantName);
  if (!variant) return baseRace;

  const ability = variant.replacesParent
    ? variant.ability
    : [baseRace.ability, variant.ability].filter(Boolean).join(" ");

  return {
    ...baseRace,
    ability,
    speed: variant.speed ?? baseRace.speed,
    other: [...baseRace.other, ...variant.other],
    bonuses: combineFixedBonuses(baseRace, variant),
    floatingBonus: variant.replacesParent
      ? variant.floatingBonus
      : (variant.floatingBonus ?? baseRace.floatingBonus),
  };
};
