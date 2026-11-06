"use client";

import { useMessages } from "@/context/LocaleContext";
import { ABILITY_POINT_COSTS } from "@/utils/calculatePointCost";

export const PointCostTable = () => {
  const copy = useMessages();

  return (
    <table className="mt-4 w-full text-center">
      <caption className="text-left font-bold">{copy.costTable}</caption>
      <thead>
        <tr>
          <th scope="col">{copy.score}</th>
          <th scope="col">{copy.cost}</th>
        </tr>
      </thead>
      <tbody>
        {ABILITY_POINT_COSTS.map(({ score, cost }) => (
          <tr key={score}>
            <th scope="row">{score}</th>
            <td>{cost}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
