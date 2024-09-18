"use client";

import { useRace } from "@/context/RaceContext";
import { useStats } from "@/context/StatsContext";
import { racialModifiers } from "@/data/racialModifiers";
import { attrNames, modifiers, points } from "@/utils/attributeUtils"; // Import necessary utilities
import { findRaceKeyByName } from "@/utils/findRaceKeyByName";

export const AttributeTable = () => {
  const { attributes, setAttributes } = useStats();
  const { selectedRace, selectedVariant } = useRace();

  // Function to get modifiers (either base or variant)
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

  // Calculate racial bonuses by combining base and variant modifiers
  const calculateRacialBonuses = (base, variant) => {
    return {
      strength: selectedVariant ? variant.strength : base.strength,
      dexterity: selectedVariant ? variant.dexterity : base.dexterity,
      constitution: selectedVariant ? variant.constitution : base.constitution,
      intelligence: selectedVariant ? variant.intelligence : base.intelligence,
      wisdom: selectedVariant ? variant.wisdom : base.wisdom,
      charisma: selectedVariant ? variant.charisma : base.charisma,
    };
  };

  // Get base and variant modifiers
  const baseModifiers = getModifiers("race", selectedRace);
  const variantModifiers = getModifiers("variant", selectedVariant);

  // Combine base and variant modifiers into racial bonuses
  const racialBonuses = calculateRacialBonuses(baseModifiers, variantModifiers);

  // Calculate point cost for an attribute value
  const calculatePointCost = (value: number) => points[value] || 0;

  // Calculate modifier for an attribute value
  const calculateModifier = (value: number) => modifiers[value] || 0;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    attr: keyof typeof attributes
  ) => {
    setAttributes((prev) => ({
      ...prev,
      [attr]: parseInt(e.target.value),
    }));
  };

  return (
    <div className="mt-4">
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="text-left">Attribute</th>
            <th>Score</th>
            <th>Cost</th>
            <th>Racial</th>
            <th>Total</th>
            <th>Modifier</th>
          </tr>
        </thead>
        <tbody>
          {attrNames.map((attrName, index) => {
            const attrKey = attrName.toLowerCase() as keyof typeof attributes;
            const attrValue = attributes[attrKey];
            const racialBonus = racialBonuses[attrKey];
            const total = attrValue + racialBonus;

            return (
              <tr key={attrName}>
                <td>{attrName}</td>
                <td className="text-center">
                  <input
                    type="number"
                    className="border p-1 rounded text-center w-24"
                    value={attrValue}
                    onChange={(e) => handleChange(e, attrKey)}
                    min={8}
                    max={15}
                  />
                </td>
                <td className="text-center">
                  {calculatePointCost(attrValue)} {/* Use points array */}
                </td>
                <td className="text-center">{racialBonus}</td>
                <td className="text-center">{total}</td>
                <td className="text-center">
                  {calculateModifier(total)} {/* Use modifiers array */}
                </td>
              </tr>
            );
          })}
          <tr>
            <td>
              <strong>Total Cost</strong>
            </td>
            <td></td>
            <td className="text-center">
              {attrNames.reduce(
                (acc, _, index) =>
                  acc +
                  calculatePointCost(
                    attributes[
                      attrNames[index].toLowerCase() as keyof typeof attributes
                    ]
                  ),
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
