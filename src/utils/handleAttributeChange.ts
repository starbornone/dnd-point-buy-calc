import { AttributeState } from "@/types/race";
import { Dispatch, SetStateAction } from "react";

export const handleAttributeChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  attr: keyof AttributeState,
  setAttributes: Dispatch<SetStateAction<AttributeState>>
) => {
  const value = parseInt(e.target.value, 10);
  setAttributes((prev) => ({
    ...prev,
    [attr]: value,
  }));
};
