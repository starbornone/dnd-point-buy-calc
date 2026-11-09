"use client";

import { useLocale } from "@/context/LocaleContext";
import { useRace } from "@/context/RaceContext";
import { useStats } from "@/context/StatsContext";
import { withLocale } from "@/i18n/locale";
import { parseBuild, serializeBuild } from "@/utils/characterBuild";
import { useEffect, useState } from "react";

export const BuildSync = () => {
  const { locale } = useLocale();
  const {
    edition,
    origin2024,
    selectedRace,
    selectedVariant,
    selectedBonuses,
    selectedSkills,
    selectedLanguages,
    selectedTool,
    selectedCantrip,
    selectedDragon,
    selectedFeat,
    selectedFeatAbility,
    loadRace,
  } = useRace();
  const { attributes, pointBudget, loadStats } = useStats();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const parsed = parseBuild(window.location.search);
    if (parsed) {
      loadRace(parsed);
      loadStats(parsed.attributes, parsed.budget);
    }
    setReady(true);
  }, [loadRace, loadStats]);

  useEffect(() => {
    if (!ready) return;
    const query = withLocale(
      serializeBuild({
        race: selectedRace,
        variant: selectedVariant,
        attributes,
        bonuses: selectedBonuses,
        skills: selectedSkills,
        languages: selectedLanguages,
        tool: selectedTool,
        cantrip: selectedCantrip,
        dragon: selectedDragon,
        feat: selectedFeat,
        featAbility: selectedFeatAbility,
        budget: pointBudget,
        origin2024: edition === "2024" ? origin2024 : undefined,
      }),
      locale
    );
    const current = window.location.search.replace(/^\?/, "");
    if (query === current) return;
    const { pathname, hash } = window.location;
    window.history.replaceState(null, "", `${pathname}${query ? `?${query}` : ""}${hash}`);
  }, [
    ready,
    edition,
    origin2024,
    selectedRace,
    selectedVariant,
    selectedBonuses,
    selectedSkills,
    selectedLanguages,
    selectedTool,
    selectedCantrip,
    selectedDragon,
    selectedFeat,
    selectedFeatAbility,
    attributes,
    pointBudget,
    locale,
  ]);

  return null;
};
