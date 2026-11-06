"use client";

import { useLocale, useMessages } from "@/context/LocaleContext";
import { abilityLabel } from "@/i18n/names";
import { AttributeState } from "@/types/race";
import { calculateModifier, calculatePointCost, formatPointCost } from "@/utils";
import { useState } from "react";

interface AttributeTableBodyProps {
  attributes: AttributeState;
  racialBonuses: AttributeState;
  featBonuses?: AttributeState;
  attributeKeys: (keyof AttributeState)[];
  pointBudget: number;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    attr: keyof AttributeState
  ) => void;
}

const cellClass =
  "flex items-center justify-between gap-3 py-1 md:table-cell md:py-0 md:text-center";

export const AttributeTableBody: React.FC<AttributeTableBodyProps> = ({
  attributes,
  racialBonuses,
  featBonuses,
  attributeKeys,
  pointBudget,
  handleChange,
}) => {
  const { locale } = useLocale();
  const copy = useMessages();
  const [drafts, setDrafts] = useState<
    Partial<Record<keyof AttributeState, string>>
  >({});

  const costs = attributeKeys.map((attrKey) =>
    calculatePointCost(attributes[attrKey])
  );
  const totalCost = costs.every((cost) => !Number.isNaN(cost))
    ? costs.reduce((sum, cost) => sum + cost, 0)
    : null;
  const pointsRemaining =
    totalCost === null ? null : pointBudget - totalCost;
  const overBudget = pointsRemaining !== null && pointsRemaining < 0;
  const totalClass = `block py-1 md:table-cell md:py-0 md:text-center ${
    overBudget ? "font-bold text-primary" : ""
  }`;

  const clearDraft = (attrKey: keyof AttributeState) => {
    setDrafts((current) => {
      if (!(attrKey in current)) return current;
      const next = { ...current };
      delete next[attrKey];
      return next;
    });
  };

  return (
    <tbody>
      {attributeKeys.map((attrKey) => {
        const attrValue = attributes[attrKey];
        const racialBonus = racialBonuses[attrKey];
        const featBonus = featBonuses?.[attrKey] ?? 0;
        const total = attrValue + racialBonus + featBonus;
        const label = abilityLabel(locale, attrKey);
        const scoreId = `score-${attrKey}`;

        return (
          <tr
            key={attrKey}
            className="mb-3 block rounded border border-lightGray p-3 md:mb-0 md:table-row md:border-0 md:p-0"
          >
            <th
              scope="row"
              className="block text-left font-bold md:table-cell md:font-normal"
            >
              {label}
            </th>
            <td className={cellClass}>
              <span className="md:hidden">{copy.score}</span>
              <input
                id={scoreId}
                aria-label={copy.scoreAria(label)}
                className="border p-1 rounded text-center w-16 min-h-11 md:w-12 md:min-h-0"
                inputMode="numeric"
                max={15}
                min={8}
                onBlur={() => clearDraft(attrKey)}
                onChange={(e) => {
                  const raw = e.target.value;
                  if (raw === "" || raw === "1") {
                    setDrafts((current) => ({ ...current, [attrKey]: raw }));
                    return;
                  }
                  handleChange(e, attrKey);
                  clearDraft(attrKey);
                }}
                type="number"
                value={drafts[attrKey] ?? attrValue}
              />
            </td>
            <td className={cellClass}>
              <span className="md:hidden">{copy.cost}</span>
              <span>{formatPointCost(attrValue)}</span>
            </td>
            <td className={cellClass}>
              <span className="md:hidden">{copy.racial}</span>
              <span>{racialBonus}</span>
            </td>
            {featBonuses ? (
              <td className={cellClass}>
                <span className="md:hidden">{copy.feat}</span>
                <span>{featBonus}</span>
              </td>
            ) : null}
            <td className={cellClass}>
              <span className="md:hidden">{copy.total}</span>
              <span>{total}</span>
            </td>
            <td className={cellClass}>
              <span className="md:hidden">{copy.modifier}</span>
              <span>{calculateModifier(total)}</span>
            </td>
          </tr>
        );
      })}
      <tr className="mb-3 block rounded border border-lightGray p-3 md:mb-0 md:table-row md:border-0 md:p-0">
        <th scope="row" className="block text-left md:table-cell">
          {copy.totalCost}
        </th>
        <td className="hidden md:table-cell"></td>
        <td className={totalClass}>{totalCost === null ? "\u2014" : totalCost}</td>
        <td className="hidden md:table-cell"></td>
        {featBonuses ? <td className="hidden md:table-cell"></td> : null}
        <td className="hidden md:table-cell"></td>
        <td className="hidden md:table-cell"></td>
      </tr>
      <tr className="block rounded border border-lightGray p-3 md:table-row md:border-0 md:p-0">
        <th scope="row" className="block text-left md:table-cell">
          {copy.pointsRemaining}
        </th>
        <td className="hidden md:table-cell"></td>
        <td className={totalClass}>
          {pointsRemaining === null ? "\u2014" : pointsRemaining}
        </td>
        <td className="hidden md:table-cell"></td>
        {featBonuses ? <td className="hidden md:table-cell"></td> : null}
        <td className="hidden md:table-cell"></td>
        <td className="hidden md:table-cell"></td>
      </tr>
    </tbody>
  );
};
