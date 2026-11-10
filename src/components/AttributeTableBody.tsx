
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocale, useMessages } from "@/context/LocaleContext";
import { abilityLabel } from "@/i18n/names";
import { cn } from "@/lib/utils";
import { AttributeState } from "@/types/race";
import { calculateModifier } from "@/utils/calculateModifier";
import { calculatePointCost, formatPointCost, MAX_ABILITY_SCORE, MIN_ABILITY_SCORE } from "@/utils/calculatePointCost";
import { useState } from "react";

interface AttributeTableBodyProps {
  attributes: AttributeState;
  sourceBonuses: AttributeState;
  bonusLabel: string;
  featBonuses?: AttributeState;
  attributeKeys: (keyof AttributeState)[];
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    attr: keyof AttributeState
  ) => boolean;
  stepScore: (attr: keyof AttributeState, delta: -1 | 1) => void;
}

const metricClass = "min-w-0 text-center md:table-cell md:px-2 md:py-1.5";
const metricLabelClass = "block break-words text-xs leading-tight text-muted-foreground md:hidden";
const stepButtonClass = "size-11 shrink-0 p-0 text-xl leading-none max-md:scroll-mt-16";

export const AttributeTableBody: React.FC<AttributeTableBodyProps> = ({
  attributes,
  sourceBonuses,
  bonusLabel,
  featBonuses,
  attributeKeys,
  handleChange,
  stepScore,
}) => {
  const { locale } = useLocale();
  const copy = useMessages();
  const [drafts, setDrafts] = useState<
    Partial<Record<keyof AttributeState, string>>
  >({});

  const bonusCell = cn(metricClass, featBonuses ? "col-span-4" : "col-span-3");
  const resultCell = cn(metricClass, featBonuses ? "col-span-6" : "col-span-3");

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
        const sourceBonus = sourceBonuses[attrKey];
        const featBonus = featBonuses?.[attrKey] ?? 0;
        const total = attrValue + sourceBonus + featBonus;
        const label = abilityLabel(locale, attrKey);
        const scoreId = `score-${attrKey}`;
        const draft = drafts[attrKey];
        const draftScore = Number.parseInt(draft ?? "", 10);
        const error =
          draftScore < MIN_ABILITY_SCORE ? copy.scoreTooLow(MIN_ABILITY_SCORE) :
          draftScore > MAX_ABILITY_SCORE ? copy.scoreTooHigh(MAX_ABILITY_SCORE) : undefined;
        const errorId = `${scoreId}-error`;
        const hintId = `${scoreId}-next-cost`;
        const atMaximum = attrValue >= MAX_ABILITY_SCORE;
        const nextCost = atMaximum
          ? copy.maximumBaseScore
          : copy.nextScoreCost(attrValue + 1, calculatePointCost(attrValue + 1) - calculatePointCost(attrValue));
        const step = (delta: -1 | 1) => {
          clearDraft(attrKey);
          stepScore(attrKey, delta);
        };

        return (
          <tr
            key={attrKey}
            role="row"
            className="grid grid-cols-12 items-center gap-x-1 gap-y-2 rounded-md border border-border bg-card p-2.5 md:table-row md:border-0 md:p-0 md:hover:bg-muted"
          >
            <th
              scope="row"
              role="rowheader"
              className="col-span-5 min-w-0 break-words text-left font-semibold md:table-cell md:py-2 md:pl-4 md:pr-2"
            >
              {label}
            </th>
            <td role="cell" className="col-span-7 min-w-0 text-right md:table-cell md:px-2 md:py-1.5 md:text-center">
              <div className="flex justify-end gap-1 md:justify-center">
                <Button
                  type="button"
                  variant="secondary"
                  className={stepButtonClass}
                  aria-label={copy.decreaseScore(label)}
                  disabled={attrValue <= MIN_ABILITY_SCORE}
                  onClick={() => step(-1)}
                >
                  −
                </Button>
                <Input
                  id={scoreId}
                  aria-label={copy.scoreAria(label)}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? `${errorId} ${hintId}` : hintId}
                  className="min-h-11 w-10 min-w-0 p-1 text-center tabular-nums [appearance:textfield] max-md:scroll-mt-16 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
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
                <Button
                  type="button"
                  variant="secondary"
                  className={stepButtonClass}
                  aria-label={copy.increaseScore(label)}
                  aria-describedby={hintId}
                  disabled={atMaximum}
                  onClick={() => step(1)}
                >
                  +
                </Button>
              </div>
              <p id={hintId} className="mt-1 text-xs text-muted-foreground">{nextCost}</p>
              <p id={errorId} role="status" className={error ? "mt-1 text-xs text-danger-foreground" : "sr-only"}>
                {error}
              </p>
            </td>
            <td role="cell" className={bonusCell}>
              <span className={metricLabelClass} aria-hidden="true">{copy.cost}</span>
              {formatPointCost(attrValue)}
            </td>
            <td role="cell" className={bonusCell}>
              <span className={metricLabelClass} aria-hidden="true">{bonusLabel}</span>
              {sourceBonus}
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
