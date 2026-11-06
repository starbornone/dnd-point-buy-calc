import { AttributeState } from "@/types/race";
import { Dispatch, SetStateAction } from "react";
import { MAX_ABILITY_SCORE, MIN_ABILITY_SCORE } from "./calculatePointCost";

export const handleAttributeChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  attr: keyof AttributeState,
  setAttributes: Dispatch<SetStateAction<AttributeState>>
) => {
  const value = Number.parseInt(e.target.value, 10);
  if (
    !Number.isInteger(value) ||
    value < MIN_ABILITY_SCORE ||
    value > MAX_ABILITY_SCORE
  ) {
    return;
  }

  setAttributes((prev) => ({
    ...prev,
    [attr]: value,
  }));
};
