"use client";

import { NativeSelect } from "@/components/ui/native-select";
import { useLocale, useMessages } from "@/context/LocaleContext";
import { abilityLabel } from "@/i18n/names";
import { AttributeState, FloatingBonus } from "@/types/race";
import React from "react";

type BonusPicks = [
  keyof AttributeState | undefined,
  keyof AttributeState | undefined,
];

interface VariantBonusSelectorProps {
  selectedBonuses: BonusPicks;
  setSelectedBonuses: React.Dispatch<React.SetStateAction<BonusPicks>>;
  attributeKeys: (keyof AttributeState)[];
  floatingBonus: FloatingBonus;
}

export const VariantBonusSelector: React.FC<VariantBonusSelectorProps> = ({
  selectedBonuses,
  setSelectedBonuses,
  attributeKeys,
  floatingBonus,
}) => {
  const { locale } = useLocale();
  const copy = useMessages();
  const handleBonusChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const raw = e.target.value;
    const newBonus = raw === "" ? undefined : (raw as keyof AttributeState);
    setSelectedBonuses((prev) => {
      const newBonuses: BonusPicks = [prev[0], prev[1]];
      newBonuses[index] = newBonus;
      return newBonuses;
    });
  };

  const optionsFor = (index: number) => {
    const other = selectedBonuses[index === 0 ? 1 : 0];
    return attributeKeys.filter(
      (attr) => !floatingBonus.exclude.includes(attr) && attr !== other
    );
  };

  const renderSelect = (index: number) => {
    const selectId = `floating-bonus-${index}`;
    const value = selectedBonuses[index];
    return (
      <div className="min-w-0">
        <label htmlFor={selectId} className="mb-2 block">
          {floatingBonus.count === 1
            ? copy.oneBonus
            : copy.bonusAttribute(index)}
        </label>
        <NativeSelect
          id={selectId}
          value={value ?? ""}
          onChange={(e) => handleBonusChange(e, index)}
        >
          <option value="">{copy.selectAttribute}</option>
          {optionsFor(index).map((attr) => (
            <option key={attr} value={attr}>
              {abilityLabel(locale, attr)}
            </option>
          ))}
        </NativeSelect>
      </div>
    );
  };

  return (
    <>
      {renderSelect(0)}
      {floatingBonus.count === 2 ? renderSelect(1) : null}
    </>
  );
};
