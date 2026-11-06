import { emptyBonuses } from "@/data/bonuses";
import { raceData } from "@/data/raceData";
import { AttributeState } from "@/types/race";
import { combineFixedBonuses } from "./calculateRacialBonuses";

export const getFixedBonuses = (
  raceKey: string,
  variantName: string
): AttributeState => {
  const race = raceData[raceKey];
  if (!race) return emptyBonuses();

  const variant = variantName
    ? race.variants?.find((entry) => entry.name === variantName)
    : undefined;

  return combineFixedBonuses(race, variant);
};
