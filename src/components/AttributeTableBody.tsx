"use client";

import { Input } from "@/components/ui/input";
import { useLocale, useMessages } from "@/context/LocaleContext";
import { abilityLabel } from "@/i18n/names";
import { cn } from "@/lib/utils";
import { AttributeState } from "@/types/race";
import { calculateModifier, formatPointCost } from "@/utils";
import { useState } from "react";

interface AttributeTableBodyProps {
  attributes: AttributeState;
  racialBonuses: AttributeState;
  featBonuses?: AttributeState;
  attributeKeys: (keyof AttributeState)[];
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    attr: keyof AttributeState
  ) => void;
}

const metricClass = "min-w-0 text-center md:table-cell md:px-2 md:py-1.5";
const metricLabelClass = "block break-words text-xs leading-tight md:hidden";

export const AttributeTableBody: React.FC<AttributeTableBodyProps> = ({
  attributes,
  racialBonuses,
  featBonuses,
  attributeKeys,
  handleChange,
}) => {
  const { locale } = useLocale();
  const copy = useMessages();
  const [drafts, setDrafts] = useState<
    Partial<Record<keyof AttributeState, string>>
  >({});

  const topCellSpan = featBonuses ? "col-span-3" : "col-span-2";
  const bonusCell = cn(metricClass, featBonuses && "col-span-2");
  const resultCell = cn(metricClass, featBonuses && "col-span-3");

  const clearDraft = (attrKey: keyof AttributeState) => {
    setDrafts((current) => {
      if (!(attrKey in current)) return current;
      const next = { ...current };
      delete next[attrKey];
      return next;
    });
  };

  return (
    <tbody role="rowgroup" className="grid gap-2 min-[580px]:grid-cols-2 md:table-row-group md:[&>tr:not(:last-child)>*]:border-b md:[&>tr>*]:border-secondary">
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
            role="row"
            className={cn(
              "grid items-center gap-x-1 gap-y-2 rounded-md border border-secondary p-2.5 md:table-row md:border-0 md:p-0 md:hover:bg-background",
              featBonuses ? "grid-cols-6" : "grid-cols-[repeat(3,minmax(0,1fr))_minmax(0,1.25fr)]"
            )}
          >
            <th
              scope="row"
              role="rowheader"
              className={cn("min-w-0 break-words text-left font-bold md:table-cell md:py-2 md:pl-4 md:pr-2", topCellSpan)}
            >
              {label}
            </th>
            <td role="cell" className={cn("flex min-w-0 items-center justify-end gap-1.5 md:table-cell md:px-2 md:py-1.5 md:text-center", topCellSpan)}>
              <Input
                id={scoreId}
                aria-label={copy.scoreAria(label)}
                className="min-h-11 w-14 shrink-0 p-1 text-center tabular-nums md:w-16"
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
            <td role="cell" className={bonusCell}>
              <span className={metricLabelClass} aria-hidden="true">{copy.cost}</span>
              {formatPointCost(attrValue)}
            </td>
            <td role="cell" className={bonusCell}>
              <span className={metricLabelClass} aria-hidden="true">{copy.racial}</span>
              {racialBonus}
            </td>
            {featBonuses ? (
              <td role="cell" className={bonusCell}>
                <span className={metricLabelClass} aria-hidden="true">{copy.feat}</span>
                {featBonus}
              </td>
            ) : null}
            <td role="cell" className={resultCell}>
              <span className={metricLabelClass} aria-hidden="true">{copy.total}</span>
              <span className="font-bold text-primary">{total}</span>
            </td>
            <td role="cell" className={resultCell}>
              <span className={metricLabelClass} aria-hidden="true">{copy.modifier}</span>
              <span>{calculateModifier(total)}</span>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};
