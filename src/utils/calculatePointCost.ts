export const calculatePointCost = (value: number) => {
  if (value <= 9) return 0;
  if (value <= 13) return value - 9;
  if (value <= 15) return (value - 13) * 2 + 4;
  return Math.floor((value - 15) * 1.5 + 9);
};
