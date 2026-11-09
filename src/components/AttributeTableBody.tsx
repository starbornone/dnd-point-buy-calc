"use client";

import { Input } from "@/components/ui/input";
import { useLocale, useMessages } from "@/context/LocaleContext";
import { abilityLabel } from "@/i18n/names";
import { cn } from "@/lib/utils";
import { AttributeState } from "@/types/race";
import { calculateModifier } from "@/utils/calculateModifier";
import { formatPointCost, MAX_ABILITY_SCORE, MIN_ABILITY_SCORE } from "@/utils/calculatePointCost";
import { useState } from "react";

interface AttributeTableBodyProps {
  attributes: AttributeState;
  racialBonuses: AttributeState;
  featBonuses?: AttributeState;
  attributeKeys: (keyof AttributeState)[];
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    attr: keyof AttributeState
  ) => boolean;
}

const metricClass = "min-w-0 text-center md:table-cell md:px-2 md:py-1.5";
const metricLabelClass = "block break-words text-xs leading-tight text-muted-foreground md:hidden";

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
    <tbody role="rowgroup" className="grid gap-2 min-[580px]:grid-cols-2 md:table-row-group md:[&>tr:not(:last-child)>*]:border-b md:[&>tr>*]:border-border">
      {attributeKeys.map((attrKey) => {
        const attrValue = attributes[attrKey];
        const racialBonus = racialBonuses[attrKey];
        const featBonus = featBonuses?.[attrKey] ?? 0;
        const total = attrValue + racialBonus + featBonus;
        const label = abilityLabel(locale, attrKey);
        const scoreId = `score-${attrKey}`;
        const draft = drafts[attrKey];
        const draftScore = Number.parseInt(draft ?? "", 10);
        const error =
          draftScore < MIN_ABILITY_SCORE ? copy.scoreTooLow(MIN_ABILITY_SCORE) :
          draftScore > MAX_ABILITY_SCORE ? copy.scoreTooHigh(MAX_ABILITY_SCORE) : undefined;
        const errorId = `${scoreId}-error`;

        return (
          <tr
            key={attrKey}
            role="row"
            className={cn(
              "grid items-center gap-x-1 gap-y-2 rounded-md border border-border bg-card p-2.5 md:table-row md:border-0 md:p-0 md:hover:bg-muted",
              featBonuses ? "grid-cols-6" : "grid-cols-[repeat(3,minmax(0,1fr))_minmax(0,1.25fr)]"
            )}
          >
            <th
              scope="row"
              role="rowheader"
              className={cn("min-w-0 break-words text-left font-semibold md:table-cell md:py-2 md:pl-4 md:pr-2", topCellSpan)}
            >
              {label}
            </th>
            <td role="cell" className={cn("flex min-w-0 flex-col items-end gap-1 md:table-cell md:px-2 md:py-1.5 md:text-center", topCellSpan)}>
              <Input
                id={scoreId}
                aria-label={copy.scoreAria(label)}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? errorId : undefined}
                className="min-h-11 w-14 shrink-0 p-1 text-center tabular-nums md:w-16"
                inputMode="numeric"
                max={MAX_ABILITY_SCORE}
                min={MIN_ABILITY_SCORE}
                onBlur={() => clearDraft(attrKey)}
                onChange={(e) => {
                  if (!handleChange(e, attrKey)) {
                    const raw = e.target.value;
                    setDrafts((current) => ({ ...current, [attrKey]: raw }));
                    return;
                  }
                  clearDraft(attrKey);
                }}
                type="number"
                value={draft ?? attrValue}
              />
              <p id={errorId} role="status" className={error ? "mx-auto max-w-28 text-xs text-danger-foreground" : "sr-only"}>
                {error}
              </p>
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
