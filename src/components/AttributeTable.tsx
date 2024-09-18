"use client";

import { useRace } from "@/context/RaceContext";
import { useStats } from "@/context/StatsContext";
import { finalModifiers, pointCosts } from "@/data";
import { racialModifiers } from "@/data/racialModifiers";
import { AttributeState } from "@/types/race";
import { findRaceKeyByName } from "@/utils/findRaceKeyByName";

export const AttributeTable = () => {
  const { attributes, setAttributes } = useStats();
  const { selectedRace, selectedVariant } = useRace();

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
    return selectedVariant ? { ...variant } : { ...base };
  };

  const baseModifiers = getModifiers("race", selectedRace);
  const variantModifiers = getModifiers("variant", selectedVariant);

  const racialBonuses = calculateRacialBonuses(baseModifiers, variantModifiers);

  const calculatePointCost = (value: number) => pointCosts[value] || 0;
  const calculateModifier = (value: number) => finalModifiers[value] || 0;

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
