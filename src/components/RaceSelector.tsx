"use client";

import { useLocale, useMessages } from "@/context/LocaleContext";
import { useRace } from "@/context/RaceContext";
import { raceData } from "@/data/raceData";
import { raceDropdown } from "@/data/raceDropdown";
import { raceLabel, variantLabel } from "@/i18n/names";

export const RaceSelector = () => {
  const { locale } = useLocale();
  const copy = useMessages();
  const { selectedRace, setSelectedRace, selectedVariant, setSelectedVariant } =
    useRace();
  const availableVariants =
    raceData[selectedRace]?.variants?.map((variant) => variant.name) ?? [];

  const handleRaceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRace(e.target.value);
  };

  const handleVariantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVariant(e.target.value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label htmlFor="race" className="block font-bold">
          {copy.selectRace}
        </label>
        <select
          id="race"
          className="mt-2 block w-full p-2 border border-lightGray rounded"
          value={selectedRace}
          onChange={handleRaceChange}
        >
          <option value="" disabled>
            {copy.selectRacePlaceholder}
          </option>
          {raceDropdown.map((race) => (
            <option key={race.value} value={race.value}>
              {raceLabel(locale, race.value)}
            </option>
          ))}
        </select>
      </div>
      <div>
        {availableVariants.length > 0 && (
          <>
            <label htmlFor="variant" className="block font-bold">
              {copy.selectVariant}
            </label>
            <select
              id="variant"
              className="mt-2 block w-full p-2 border border-lightGray rounded"
              value={selectedVariant}
              onChange={handleVariantChange}
            >
              {selectedRace === "human" ? null : (
                <option value="" disabled>
                  {copy.selectVariantPlaceholder}
                </option>
              )}
              {availableVariants.map((variant) => (
                <option key={variant} value={variant}>
                  {variantLabel(locale, variant)}
                </option>
              ))}
            </select>
          </>
        )}
      </div>
    </div>
  );
};
