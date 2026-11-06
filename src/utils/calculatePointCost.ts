export const MIN_ABILITY_SCORE = 8;
export const MAX_ABILITY_SCORE = 15;
export const POINT_BUY_BUDGET = 27;
export const MIN_POINT_BUDGET = 0;
export const MAX_POINT_BUDGET = 100;

export const ABILITY_POINT_COSTS = [
  { score: 8, cost: 0 },
  { score: 9, cost: 1 },
  { score: 10, cost: 2 },
  { score: 11, cost: 3 },
  { score: 12, cost: 4 },
  { score: 13, cost: 5 },
  { score: 14, cost: 7 },
  { score: 15, cost: 9 },
] as const;

const POINT_COST: Record<number, number> = Object.fromEntries(
  ABILITY_POINT_COSTS.map(({ score, cost }) => [score, cost])
);

export const calculatePointCost = (value: number): number => {
  if (!Number.isInteger(value)) return Number.NaN;
  const cost = POINT_COST[value];
  return cost === undefined ? Number.NaN : cost;
};

export const formatPointCost = (value: number): string => {
  const cost = calculatePointCost(value);
  return Number.isNaN(cost) ? "\u2014" : String(cost);
};
