import { AttributeState } from "@/types/race";
import React from "react";

interface VariantBonusSelectorProps {
  selectedBonuses: [keyof AttributeState, keyof AttributeState | undefined];
  setSelectedBonuses: React.Dispatch<
    React.SetStateAction<
      [keyof AttributeState, keyof AttributeState | undefined]
    >
  >;
  attributeKeys: (keyof AttributeState)[];
  selectedRace: string;
}

export const VariantBonusSelector: React.FC<VariantBonusSelectorProps> = ({
  selectedBonuses,
  setSelectedBonuses,
  attributeKeys,
  selectedRace,
}) => {
  const handleBonusChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const newBonus = e.target.value as keyof AttributeState;
    setSelectedBonuses((prev) => {
      const newBonuses = [...prev];
      newBonuses[index] = newBonus;
      return newBonuses as [
        keyof AttributeState,
        keyof AttributeState | undefined
      ];
    });
  };

  if (selectedRace === "changeling") {
    const availableAttributesForBonus = attributeKeys.filter(
      (attr) => attr !== "charisma"
    );

    return (
      <div className="grid grid-cols-2 gap-8">
        <div>
          <label>Select one attribute for +1 bonus:</label>
          <div className="grid grid-cols-1 gap-4">
            <select
              value={selectedBonuses[0]}
              onChange={(e) => handleBonusChange(e, 0)}
              className="mt-2 block w-full p-2 border border-lightGray rounded"
            >
              {availableAttributesForBonus.map((attr) => (
                <option key={attr} value={attr}>
                  {attr.charAt(0).toUpperCase() + attr.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  }

  const availableAttributesForFirstSelect = attributeKeys.filter(
    (attr) => attr !== selectedBonuses[1]
  );
  const availableAttributesForSecondSelect = attributeKeys.filter(
    (attr) => attr !== selectedBonuses[0]
  );

  return (
    <div className="grid grid-cols-2 gap-8">
      <div>
        <label>Select two attributes for +1 bonus:</label>
        <div className="grid grid-cols-2 gap-4">
          <select
            value={selectedBonuses[0]}
            onChange={(e) => handleBonusChange(e, 0)}
            className="mt-2 block w-full p-2 border border-lightGray rounded"
          >
            {availableAttributesForFirstSelect.map((attr) => (
              <option key={attr} value={attr}>
                {attr.charAt(0).toUpperCase() + attr.slice(1)}
              </option>
            ))}
          </select>
          <select
            value={selectedBonuses[1] || ""}
            onChange={(e) => handleBonusChange(e, 1)}
            className="mt-2 block w-full p-2 border border-lightGray rounded"
          >
            <option value="" disabled>
              Select an attribute
            </option>
            {availableAttributesForSecondSelect.map((attr) => (
              <option key={attr} value={attr}>
                {attr.charAt(0).toUpperCase() + attr.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
