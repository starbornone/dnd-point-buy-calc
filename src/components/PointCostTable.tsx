"use client";

import { Table } from "@/components/ui/table";
import { useMessages } from "@/context/LocaleContext";
import { ABILITY_POINT_COSTS } from "@/utils/calculatePointCost";

export const PointCostTable = () => {
  const copy = useMessages();

  return (
    <Table className="text-center text-sm tabular-nums">
      <caption className="pb-2 text-left font-bold">{copy.costTable}</caption>
      <thead className="bg-secondary">
        <tr>
          <th scope="col" className="py-1.5">{copy.score}</th>
          <th scope="col" className="py-1.5">{copy.cost}</th>
        </tr>
      </thead>
      <tbody>
        {ABILITY_POINT_COSTS.map(({ score, cost }) => (
          <tr key={score} className="border-b border-secondary">
            <th scope="row">{score}</th>
            <td>{cost}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
