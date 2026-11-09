import { raceData } from "@/data/raceData";
import { mergeRaceAndVariant } from "@/utils/mergeRaceAndVariant";
import type { Locale } from "./locale";
import { raceTraitsZh } from "./raceTraits.zh";

export const getRaceTraits = (locale: Locale, raceKey: string, variantName: string) => {
  const race = raceData[raceKey];
  if (!race) return null;

  const translation = locale === "zh" ? raceTraitsZh[raceKey] : undefined;
  if (!translation) return mergeRaceAndVariant(race, variantName);

  const { variants, ...text } = translation;
  const localizedRace = {
    ...race,
    ...text,
    variants: race.variants?.map((variant) => ({
      ...variant,
      ...variants?.[variant.name],
    })),
  };

  return mergeRaceAndVariant(localizedRace, variantName);
};
