"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface RaceContextType {
  selectedRace: string;
  setSelectedRace: (race: string) => void;
  selectedVariant: string;
  setSelectedVariant: (variant: string) => void;
}

const RaceContext = createContext<RaceContextType | undefined>(undefined);

export const RaceProvider = ({ children }: { children: ReactNode }) => {
  const [selectedRace, setSelectedRace] = useState<string>("");
  const [selectedVariant, setSelectedVariant] = useState<string>("");

  return (
    <RaceContext.Provider
      value={{
        selectedRace,
        setSelectedRace,
        selectedVariant,
        setSelectedVariant,
      }}
    >
      {children}
    </RaceContext.Provider>
  );
};

export const useRace = () => {
  const context = useContext(RaceContext);
  if (!context) {
    throw new Error("useRace must be used within a RaceProvider");
  }
  return context;
};
