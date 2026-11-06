"use client";

import { BuildSync } from "@/components/BuildSync";
import { LocaleDocument, LocaleProvider } from "@/context/LocaleContext";
import { RaceProvider } from "@/context/RaceContext";
import { StatsProvider } from "@/context/StatsContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <RaceProvider>
        <StatsProvider>
          <LocaleDocument />
          <BuildSync />
          {children}
        </StatsProvider>
      </RaceProvider>
    </LocaleProvider>
  );
}
