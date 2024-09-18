import { Race } from "@/types/race";

export const mergeRaceAndVariant = (
  baseRace: Race,
  variantName: string | null
) => {
  if (!variantName) return baseRace;

  const variant = baseRace.variants?.find((v) => v.name === variantName);
  if (!variant) return baseRace;

  return {
    ...baseRace,
    ability: variant.ability || baseRace.ability,
    other: variant.other || baseRace.other,
  };
};
