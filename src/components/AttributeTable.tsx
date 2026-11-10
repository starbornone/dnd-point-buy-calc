
import { Card } from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import { useMessages } from "@/context/LocaleContext";
import { useRace } from "@/context/RaceContext";
import { useStats } from "@/context/StatsContext";
import { attributeKeys } from "@/data";
import { raceData } from "@/data/raceData";
import { cn } from "@/lib/utils";
import { calculateBackgroundBonuses } from "@/utils/origin2024";
import {
  calculateFeatBonus,
  calculatePointCost,
  calculateRacialBonuses,
  featGrantsIncrease,
  getFixedBonuses,
  handleAttributeChange,
  MAX_ABILITY_SCORE,
  MIN_ABILITY_SCORE,
  resolveFloatingBonus,
} from "@/utils";
import { AttributeTableBody } from "./AttributeTableBody";

export const AttributeTable = () => {
  const copy = useMessages();
  const { attributes, setAttributes, pointBudget } = useStats();
  const { edition, origin2024, selectedRace, selectedVariant, selectedBonuses, selectedFeat, selectedFeatAbility } =
    useRace();

  const race = raceData[selectedRace];
  const variant = race?.variants?.find((entry) => entry.name === selectedVariant);
  const bonusLabel = edition === "2024" ? copy.background : copy.racial;
  const sourceBonuses = edition === "2024" ? calculateBackgroundBonuses(origin2024) : calculateRacialBonuses({
    fixedBonuses: getFixedBonuses(selectedRace, selectedVariant),
    floatingBonus: resolveFloatingBonus(race, variant),
    selectedBonuses,
  });
  const featBonuses = calculateFeatBonus(selectedFeat, selectedFeatAbility);
  const showFeat = edition === "2014" && featGrantsIncrease(selectedFeat);

  const costs = attributeKeys.map((key) => calculatePointCost(attributes[key]));
  const pointCost = costs.every((cost) => !Number.isNaN(cost))
    ? costs.reduce((sum, cost) => sum + cost, 0)
    : null;
  const remaining = pointCost === null ? null : pointBudget - pointCost;
  const overBudget = remaining !== null && remaining < 0;

  return (
    <section aria-labelledby="scores-heading" className="min-w-0">
      <Card className="ledger-feature flex flex-col gap-4 sm:gap-5 sm:p-5 xl:p-6">
        <div className="contents md:flex md:items-center md:justify-between md:gap-3">
          <h2 id="scores-heading" className="font-display text-2xl leading-tight text-primary sm:text-3xl">
            {copy.abilityScores}
          </h2>
          <dl className="sticky top-2 z-10 grid grid-cols-2 divide-x divide-border overflow-hidden rounded-md border border-border bg-card text-[0.65rem] font-medium uppercase leading-snug tracking-wider md:static md:min-w-56" aria-hidden="true">
            <div className="flex items-center justify-between gap-1 bg-background px-2.5 py-2 text-muted-foreground md:flex-col md:items-start md:px-4">
              <dt>{copy.totalCost}</dt>
              <dd className="font-display text-2xl leading-none tracking-normal text-foreground tabular-nums md:text-3xl">{pointCost ?? "—"}</dd>
            </div>
            <div
              className={cn(
                "flex items-center justify-between gap-1 px-2.5 py-2 md:flex-col md:items-start md:px-4",
                overBudget ? "bg-danger text-danger-foreground" : "bg-muted text-primary"
              )}
            >
              <dt>{overBudget ? copy.pointsOverBudget : copy.pointsRemaining}</dt>
              <dd className="font-display text-2xl leading-none tracking-normal tabular-nums md:text-3xl">
                {remaining === null ? "—" : Math.abs(remaining)}
              </dd>
            </div>
          </dl>
          <p className="sr-only" role="status" aria-atomic="true">
            {copy.pointSummary(String(pointCost ?? "—"), pointBudget, String(remaining ?? "—"))}
          </p>
        </div>

        {overBudget ? <p className="text-sm text-danger-foreground">{copy.pointLimit(pointBudget)}</p> : null}

        <Table
          aria-labelledby="scores-heading"
          role="table"
          className="block text-sm tabular-nums md:table md:border-separate md:border-spacing-0 md:overflow-hidden md:rounded-md md:border md:border-border md:bg-card"
        >
          <thead role="rowgroup" className="sr-only md:not-sr-only md:table-header-group md:bg-muted md:text-primary">
            <tr role="row" className="text-center [&>th]:px-2 [&>th]:py-3">
              <th scope="col" role="columnheader" className="text-left first:pl-4">
                {copy.attribute}
              </th>
              <th scope="col" role="columnheader">{copy.score}</th>
              <th scope="col" role="columnheader">{copy.cost}</th>
              <th scope="col" role="columnheader">{bonusLabel}</th>
              {showFeat && <th scope="col" role="columnheader">{copy.feat}</th>}
              <th scope="col" role="columnheader">{copy.total}</th>
              <th scope="col" role="columnheader">{copy.modifier}</th>
            </tr>
          </thead>

          <AttributeTableBody
            key={`${edition}:${selectedRace}:${selectedVariant}`}
            attributes={attributes}
            sourceBonuses={sourceBonuses}
            bonusLabel={bonusLabel}
            featBonuses={showFeat ? featBonuses : undefined}
            attributeKeys={attributeKeys}
            handleChange={(event, attr) =>
              handleAttributeChange(event, attr, setAttributes)
            }
            stepScore={(attr, delta) => {
              setAttributes((current) => {
                const next = Math.min(MAX_ABILITY_SCORE, Math.max(MIN_ABILITY_SCORE, current[attr] + delta));
                return next === current[attr] ? current : { ...current, [attr]: next };
              });
            }}
          />
        </Table>
      </Card>
    </section>
  );
};
