"use client";

import { AttributeState } from "@/types/race";
import { createContext, ReactNode, useContext, useState } from "react";

interface StatsContextType {
  attributes: AttributeState;
  setAttributes: (
    attributes: AttributeState | ((prev: AttributeState) => AttributeState)
  ) => void;
}

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export const StatsProvider = ({ children }: { children: ReactNode }) => {
  const [attributes, setAttributes] = useState<AttributeState>({
    strength: 8,
    dexterity: 8,
    constitution: 8,
    intelligence: 8,
    wisdom: 8,
    charisma: 8,
  });

  return (
    <StatsContext.Provider value={{ attributes, setAttributes }}>
      {children}
    </StatsContext.Provider>
  );
};

export const useStats = () => {
  const context = useContext(StatsContext);
  if (!context) {
    throw new Error("useStats must be used within a StatsProvider");
  }
  return context;
};
