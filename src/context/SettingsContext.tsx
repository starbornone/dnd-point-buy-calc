"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface SettingsContextType {
  settings: {
    playersHandbook: boolean;
    dungeonMastersGuide: boolean;
    uaEberron: boolean;
  };
  updateSettings: (
    newSettings: Partial<SettingsContextType["settings"]>
  ) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState({
    playersHandbook: true,
    dungeonMastersGuide: true,
    uaEberron: true,
  });

  const updateSettings = (
    newSettings: Partial<SettingsContextType["settings"]>
  ) => {
    setSettings((prevSettings) => ({ ...prevSettings, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
