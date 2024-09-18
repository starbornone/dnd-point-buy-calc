"use client";

import { RaceProvider } from "@/context/RaceContext";
import { SettingsProvider } from "@/context/SettingsContext";
import { StatsProvider } from "@/context/StatsContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SettingsProvider>
      <RaceProvider>
        <StatsProvider>{children}</StatsProvider>
      </RaceProvider>
    </SettingsProvider>
  );
}
