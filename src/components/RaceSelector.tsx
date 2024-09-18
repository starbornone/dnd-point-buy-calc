"use client";

import { useRace } from "@/context/RaceContext";
import { raceDropdown } from "@/data/raceDropdown";
import { racialModifiers } from "@/data/racialModifiers";
import { useState } from "react";

export const RaceSelector = () => {
  const { selectedRace, setSelectedRace, selectedVariant, setSelectedVariant } =
    useRace();
  const [availableVariants, setAvailableVariants] = useState<string[]>([]);

  const handleRaceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const race = e.target.value;
    setSelectedRace(race);
    setSelectedVariant("");

    const variants = racialModifiers[race]?.variants || [];
    setAvailableVariants(variants);
  };

  const handleVariantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVariant(e.target.value);
  };

  return (
    <div className="mt-4">
      <label htmlFor="race" className="block font-bold">
        Select Race
      </label>
      <select
        id="race"
        className="mt-2 block w-full p-2 border border-lightGray rounded"
        value={selectedRace}
        onChange={handleRaceChange}
      >
        <option value="" disabled>
          Select a race
        </option>
        {raceDropdown.map((race) => (
          <option key={race.value} value={race.value}>
            {race.name}
          </option>
        ))}
      </select>

      {availableVariants.length > 0 && (
        <>
          <label htmlFor="variant" className="block font-bold mt-4">
            Select Variant
          </label>
          <select
            id="variant"
            className="mt-2 block w-full p-2 border border-lightGray rounded"
            value={selectedVariant}
            onChange={handleVariantChange}
          >
            <option value="" disabled>
              Select a variant
            </option>
            {availableVariants.map((variant) => (
              <option key={variant} value={variant}>
                {variant}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
};
