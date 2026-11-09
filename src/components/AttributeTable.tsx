"use client";

import { Card } from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import { useMessages } from "@/context/LocaleContext";
import { useRace } from "@/context/RaceContext";
import { useStats } from "@/context/StatsContext";
import { attributeKeys } from "@/data";
import { raceData } from "@/data/raceData";
import { cn } from "@/lib/utils";
import {
  calculateFeatBonus,
  calculatePointCost,
  calculateRacialBonuses,
  featGrantsIncrease,
  getFixedBonuses,
  handleAttributeChange,
  resolveFloatingBonus,
} from "@/utils";
import { AttributeTableBody } from "./AttributeTableBody";

export const AttributeTable = () => {
  const copy = useMessages();
  const { attributes, setAttributes, pointBudget } = useStats();
  const { selectedRace, selectedVariant, selectedBonuses, selectedFeat, selectedFeatAbility } =
    useRace();

  const race = raceData[selectedRace];
  const variant = race?.variants?.find((entry) => entry.name === selectedVariant);
  const racialBonuses = calculateRacialBonuses({
    fixedBonuses: getFixedBonuses(selectedRace, selectedVariant),
    floatingBonus: resolveFloatingBonus(race, variant),
    selectedBonuses,
  });
  const featBonuses = calculateFeatBonus(selectedFeat, selectedFeatAbility);
  const showFeat = featGrantsIncrease(selectedFeat);

  const costs = attributeKeys.map((key) => calculatePointCost(attributes[key]));
  const pointCost = costs.every((cost) => !Number.isNaN(cost))
    ? costs.reduce((sum, cost) => sum + cost, 0)
    : null;
  const remaining = pointCost === null ? null : pointBudget - pointCost;
  const overBudget = remaining !== null && remaining < 0;

  return (
    <section aria-labelledby="scores-heading" className="min-w-0">
      <Card className="flex flex-col gap-4 rounded-lg border border-secondary bg-white p-3 sm:gap-5 sm:p-5 xl:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 id="scores-heading" className="text-xl font-bold">
            {copy.abilityScores}
          </h2>
          <dl className="grid grid-cols-2 gap-2 text-xs leading-snug sm:text-sm" aria-hidden="true">
            <div className="rounded-md bg-background px-2.5 py-2 sm:px-4">
              <dt>{copy.totalCost}</dt>
              <dd className="text-lg font-bold tabular-nums">{pointCost ?? "—"}</dd>
            </div>
            <div
              className={cn(
                "rounded-md px-2.5 py-2 sm:px-4",
                overBudget ? "bg-primary text-primary-foreground" : "bg-secondary text-primary"
              )}
            >
              <dt>{copy.pointsRemaining}</dt>
              <dd className="text-lg font-bold tabular-nums">{remaining ?? "—"}</dd>
            </div>
          </dl>
          <p className="sr-only" role="status" aria-atomic="true">
            {copy.pointSummary(String(pointCost ?? "—"), pointBudget, String(remaining ?? "—"))}
          </p>
        </div>

        <Table
          aria-labelledby="scores-heading"
          role="table"
          className="block text-sm tabular-nums md:table md:border-separate md:border-spacing-0 md:overflow-hidden md:rounded-md md:border md:border-secondary"
        >
          <thead role="rowgroup" className="sr-only md:not-sr-only md:table-header-group md:bg-secondary">
            <tr role="row" className="text-center [&>th]:px-2 [&>th]:py-3">
              <th scope="col" role="columnheader" className="text-left first:pl-4">
                {copy.attribute}
              </th>
              <th scope="col" role="columnheader">{copy.score}</th>
              <th scope="col" role="columnheader">{copy.cost}</th>
              <th scope="col" role="columnheader">{copy.racial}</th>
              {showFeat && <th scope="col" role="columnheader">{copy.feat}</th>}
              <th scope="col" role="columnheader">{copy.total}</th>
              <th scope="col" role="columnheader">{copy.modifier}</th>
            </tr>
          </thead>

          <AttributeTableBody
            key={`${selectedRace}:${selectedVariant}`}
            attributes={attributes}
            racialBonuses={racialBonuses}
            featBonuses={showFeat ? featBonuses : undefined}
            attributeKeys={attributeKeys}
            handleChange={(event, attr) =>
              handleAttributeChange(event, attr, setAttributes)
            }
          />
        </Table>
      </Card>
    </section>
  );
};
