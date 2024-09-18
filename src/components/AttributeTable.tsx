"use client";

import { VariantBonusSelector } from "@/components";
import { useRace } from "@/context/RaceContext";
import { useStats } from "@/context/StatsContext";
import { racialModifiers } from "@/data/racialModifiers";
import { AttributeState } from "@/types/race";
import { calculateModifier, calculatePointCost } from "@/utils";
import { findRaceKeyByName } from "@/utils/findRaceKeyByName";
import { useState } from "react";

export const AttributeTable = () => {
  const { attributes, setAttributes } = useStats();
  const { selectedRace, selectedVariant } = useRace();
  const [selectedBonuses, setSelectedBonuses] = useState<[string, string]>([
    "strength",
    "dexterity",
  ]);

  const attributeKeys: (keyof AttributeState)[] = [
    "strength",
    "dexterity",
    "constitution",
    "intelligence",
    "wisdom",
    "charisma",
  ];

  const getModifiers = (raceOrVariant: string, name: string) => {
    let key = name;

    if (raceOrVariant === "variant") {
      key = findRaceKeyByName(name) || name;
    }

    return (
      racialModifiers[key as keyof typeof racialModifiers] || {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0,
      }
    );
  };

  const calculateRacialBonuses = (
    base: AttributeState,
    variant: AttributeState
  ) => {
    let bonuses = selectedVariant ? { ...variant } : { ...base };

    // Check if selected variant is "Variant Human" and apply bonuses
    if (selectedVariant === "Variant Human") {
      // Apply +1 to the selected two attributes for Variant Human
      bonuses[selectedBonuses[0]] += 1;
      bonuses[selectedBonuses[1]] += 1;
    }

    return bonuses;
  };

  const baseModifiers = getModifiers("race", selectedRace);
  const variantModifiers = getModifiers("variant", selectedVariant);

  const racialBonuses = calculateRacialBonuses(baseModifiers, variantModifiers);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    attr: keyof AttributeState
  ) => {
    const value = parseInt(e.target.value, 10);
    setAttributes((prev) => ({
      ...prev,
      [attr]: value,
    }));
  };

  return (
    <div className="mt-4">
      {selectedVariant === "Variant Human" && (
        <VariantBonusSelector
          selectedBonuses={selectedBonuses}
          setSelectedBonuses={setSelectedBonuses}
          attributeKeys={attributeKeys}
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
        <tbody>
          {attributeKeys.map((attrKey) => {
            const attrValue = attributes[attrKey];
            const racialBonus = racialBonuses[attrKey];
            const total = attrValue + racialBonus;

            return (
              <tr key={attrKey}>
                <td>{attrKey.charAt(0).toUpperCase() + attrKey.slice(1)}</td>
                <td className="text-center">
                  <input
                    type="number"
                    className="border p-1 rounded text-center w-24"
                    value={attrValue}
                    onChange={(e) => handleChange(e, attrKey)}
                  />
                </td>
                <td className="text-center">{calculatePointCost(attrValue)}</td>
                <td className="text-center">{racialBonus}</td>
                <td className="text-center">{total}</td>
                <td className="text-center">{calculateModifier(total)}</td>
              </tr>
            );
          })}
          <tr>
            <td>
              <strong>Total Cost</strong>
            </td>
            <td></td>
            <td className="text-center">
              {attributeKeys.reduce(
                (acc, attrKey) => acc + calculatePointCost(attributes[attrKey]),
                0
              )}
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
