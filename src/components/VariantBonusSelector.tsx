
import { useLocale, useMessages } from "@/context/LocaleContext";
import { attributeKeys } from "@/data/attributeNames";
import { abilityLabel } from "@/i18n/names";
import { cn } from "@/lib/utils";
import { AttributeState, BonusPicks, FloatingBonus } from "@/types/race";
import { getSelectedFloatingBonuses } from "@/utils/calculateRacialBonuses";
import type { Dispatch, SetStateAction } from "react";

interface VariantBonusSelectorProps {
  selectedBonuses: BonusPicks;
  setSelectedBonuses: Dispatch<SetStateAction<BonusPicks>>;
  fixedBonuses: AttributeState;
  floatingBonus: FloatingBonus;
}

export const VariantBonusSelector = ({
  selectedBonuses,
  setSelectedBonuses,
  fixedBonuses,
  floatingBonus,
}: VariantBonusSelectorProps) => {
  const { locale } = useLocale();
  const copy = useMessages();
  const picks = getSelectedFloatingBonuses(floatingBonus, selectedBonuses);
  const atLimit = picks.size === floatingBonus.count;
  const eligible = attributeKeys.filter((ability) => !floatingBonus.exclude.includes(ability));
  const automaticBonuses = attributeKeys
    .filter((ability) => fixedBonuses[ability] !== 0)
    .map((ability) => {
      const bonus = fixedBonuses[ability];
      return copy.automaticAbilityBonus(abilityLabel(locale, ability), bonus > 0 ? `+${bonus}` : String(bonus));
    });

  const toggleBonus = (ability: keyof AttributeState) => {
    setSelectedBonuses((current) => {
      const next = getSelectedFloatingBonuses(floatingBonus, current);
      if (next.has(ability)) {
        next.delete(ability);
      } else if (next.size < floatingBonus.count) {
        next.add(ability);
      } else {
        return current;
      }
      const [first, second] = Array.from(next);
      return [first, second];
    });
  };

  return (
    <fieldset
      id="ability-bonuses"
      aria-describedby="ability-bonus-instructions"
      className="col-span-full min-w-0 rounded-md border border-border p-2.5 text-sm"
    >
      <legend className="px-1 font-semibold text-primary">{copy.abilityBonuses}</legend>
      {automaticBonuses.length > 0 && (
        <p className="mb-1 text-muted-foreground">{automaticBonuses.join(" · ")}</p>
      )}
      <p id="ability-bonus-instructions">{copy.chooseAbilityBonuses(floatingBonus.count)}</p>
      <p role="status" className="mt-1 text-xs text-muted-foreground">
        {copy.abilityBonusProgress(picks.size, floatingBonus.count)}
      </p>
      <div className="mt-2 grid grid-cols-[repeat(auto-fit,minmax(min(100%,7.5rem),1fr))] gap-2">
        {eligible.map((ability) => {
          const selected = picks.has(ability);
          const disabled = atLimit && !selected;
          return (
            <label
              key={ability}
              className={cn(
                "flex min-h-11 items-center gap-1.5 rounded-md border border-input bg-background px-2 py-1.5",
                selected && "border-primary bg-muted",
                disabled ? "cursor-not-allowed text-muted-foreground" : "cursor-pointer hover:bg-muted"
              )}
            >
              <input
                type="checkbox"
                className="size-4 shrink-0 appearance-auto accent-primary focus:ring-ring focus:ring-offset-background"
                checked={selected}
                disabled={disabled}
                onChange={() => toggleBonus(ability)}
              />
              <span className="min-w-0 break-words">
                {abilityLabel(locale, ability)}
                {selected && <span aria-hidden="true" className="whitespace-nowrap text-primary"> +1</span>}
              </span>
            </label>
          );
        })}
      </div>
      {atLimit && <p className="mt-2 text-xs text-muted-foreground">{copy.changeAbilityBonuses}</p>}
    </fieldset>
  );
};
