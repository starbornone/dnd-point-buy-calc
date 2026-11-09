"use client";

import { BuildSync } from "@/components/BuildSync";
import { LocaleDocument, LocaleProvider } from "@/context/LocaleContext";
import { RaceProvider } from "@/context/RaceContext";
import { StatsProvider } from "@/context/StatsContext";
import type { Locale } from "@/i18n/locale";

export default function Providers({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
}) {
  return (
    <LocaleProvider initialLocale={initialLocale}>
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
