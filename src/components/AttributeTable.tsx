"use client";

import { AttributeTableBody, VariantBonusSelector } from "@/components";
import { useRace } from "@/context/RaceContext";
import { useStats } from "@/context/StatsContext";
import { attributeKeys } from "@/data";
import { AttributeState } from "@/types";
import {
  calculateRacialBonuses,
  getModifiers,
  handleAttributeChange,
} from "@/utils";
import { useState } from "react";

export const AttributeTable = () => {
  const { attributes, setAttributes } = useStats();
  const { selectedRace, selectedVariant } = useRace();
  const [selectedBonuses, setSelectedBonuses] = useState<
    [keyof AttributeState, keyof AttributeState | undefined]
  >(["strength", undefined]);

  const baseModifiers = getModifiers("race", selectedRace);
  const variantModifiers = getModifiers("variant", selectedVariant);

  const bonusesForRacialCalculation: [
    keyof AttributeState,
    keyof AttributeState
  ] = [selectedBonuses[0], selectedBonuses[1] || "strength"];

  const racialBonuses = calculateRacialBonuses({
    baseModifiers,
    isVariant: selectedVariant !== "",
    selectedBonuses: bonusesForRacialCalculation,
    selectedRace,
    selectedVariant,
    variantModifiers,
  });

  return (
    <div className="mt-4">
      {(selectedVariant === "Variant Human" ||
        selectedRace === "changeling" ||
        selectedRace === "halfElf") && (
        <VariantBonusSelector
          selectedBonuses={selectedBonuses}
          setSelectedBonuses={setSelectedBonuses}
          attributeKeys={attributeKeys}
          selectedRace={selectedRace}
        />
      )}

      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="text-left">Attribute</th>
            <th className="text-center">Score</th>
            <th className="text-center">Cost</th>
            <th className="text-center">Racial</th>
            <th className="text-center">Total</th>
            <th className="text-center">Modifier</th>
          </tr>
        </thead>

        <AttributeTableBody
          attributes={attributes}
          racialBonuses={racialBonuses}
          attributeKeys={attributeKeys}
          handleChange={(e, attr) =>
            handleAttributeChange(e, attr, setAttributes)
          }
        />
      </table>
    </div>
  );
};
