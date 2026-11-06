"use client";

import { useLocale } from "@/context/LocaleContext";
import { useRace } from "@/context/RaceContext";
import { useStats } from "@/context/StatsContext";
import { readLocale, withLocale } from "@/i18n/locale";
import { parseBuild, serializeBuild } from "@/utils/characterBuild";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const BuildSync = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { locale, setLocale } = useLocale();
  const {
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
    setLocale(readLocale(window.location.search));
    const parsed = parseBuild(window.location.search);
    if (parsed) {
      loadRace(
        parsed.race,
        parsed.variant,
        parsed.bonuses,
        parsed.skills,
        parsed.languages,
        parsed.tool,
        parsed.cantrip,
        parsed.dragon,
        parsed.feat,
        parsed.featAbility
      );
      loadStats(parsed.attributes, parsed.budget);
    }
    setReady(true);
  }, [loadRace, loadStats, setLocale]);

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
      }),
      locale
    );
    const current = window.location.search.replace(/^\?/, "");
    if (query === current) return;
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [
    ready,
    router,
    pathname,
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
