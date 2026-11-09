"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useMessages } from "@/context/LocaleContext";
import { useRace } from "@/context/RaceContext";
import { useStats } from "@/context/StatsContext";
import {
  MAX_POINT_BUDGET,
  MIN_POINT_BUDGET,
  POINT_BUY_BUDGET,
} from "@/utils/calculatePointCost";
import { emptyLanguagePicks } from "@/utils/languageChoice";
import { emptySkillPicks } from "@/utils/skillChoice";
import { standardArrayAttributes } from "@/utils/standardArray";
import {
  buildFileName,
  defaultAttributes,
  emptyBonusPicks,
  fromBuildFile,
  serializeBuild,
  toBuildFile,
} from "@/utils/characterBuild";
import { useRef, useState } from "react";
import { AttributeTable } from "./AttributeTable";
import { CharacterOptions } from "./CharacterOptions";
import { RaceSelector } from "./RaceSelector";
import { RacialTraits } from "./RacialTraits";

const actionClass = "min-h-11 break-words px-2 text-sm leading-snug [overflow-wrap:anywhere]";

export const CharacterForm = () => {
  const copy = useMessages();
  const {
    loadRace,
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
  } = useRace();
  const { attributes, pointBudget, setPointBudget, setAttributes, loadStats } = useStats();
  const [copied, setCopied] = useState(false);
  const [importError, setImportError] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);
  const build = {
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
  };

  const applyStandardArray = () => {
    setAttributes(standardArrayAttributes());
    setCopied(false);
  };

  const reset = () => {
    loadRace("", "", emptyBonusPicks(), emptySkillPicks(), emptyLanguagePicks(), "", "", "", "", "");
    loadStats(defaultAttributes(), POINT_BUY_BUDGET);
    setCopied(false);
  };

  const copyLink = async () => {
    const query = serializeBuild(build);
    const url = `${window.location.origin}${window.location.pathname}${
      query ? `?${query}` : ""
    }`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const exportJson = () => {
    const file = toBuildFile(build);
    const blob = new Blob([JSON.stringify(file, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = buildFileName(build);
    link.click();
    URL.revokeObjectURL(url);
    setImportError("");
  };

  const importJson = async (file: File | undefined) => {
    if (!file) return;
    try {
      const parsed = fromBuildFile(JSON.parse(await file.text()));
      if (!parsed) {
        setImportError(copy.importError);
        return;
      }
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
      setCopied(false);
      setImportError("");
    } catch {
      setImportError(copy.importError);
    }
  };

  return (
    <form
      className="mt-5 grid items-start gap-4 sm:mt-8 sm:gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-6 print:hidden"
      id="dnd5e-pbc"
      onSubmit={(event) => event.preventDefault()}
    >
      <section aria-labelledby="setup-heading" className="min-w-0">
        <Card className="flex flex-col gap-4 sm:gap-5 sm:p-5 xl:p-6">
          <h2 id="setup-heading" className="font-display text-2xl leading-tight text-primary">
            {copy.characterSetup}
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,13rem),1fr))] items-end gap-3 sm:gap-4 [&_label]:text-sm">
            <RaceSelector />
            <CharacterOptions />
          </div>
          <div className="grid gap-3 border-t border-border pt-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="point-budget" className="text-sm font-semibold">
                {copy.pointBudget}
              </label>
              <Input
                id="point-budget"
                className="min-h-11 w-20 shrink-0 text-center tabular-nums"
                inputMode="numeric"
                max={MAX_POINT_BUDGET}
                min={MIN_POINT_BUDGET}
                onChange={(event) => {
                  const value = Number.parseInt(event.target.value, 10);
                  if (
                    Number.isInteger(value) &&
                    value >= MIN_POINT_BUDGET &&
                    value <= MAX_POINT_BUDGET
                  ) {
                    setPointBudget(value);
                  }
                }}
                type="number"
                value={pointBudget}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button type="button" className={actionClass} onClick={applyStandardArray}>
                {copy.standardArray}
              </Button>
              <Button type="button" variant="secondary" className={actionClass} onClick={reset}>
                {copy.reset}
              </Button>
            </div>
          </div>
        </Card>
      </section>

      <div className="grid min-w-0 gap-4 sm:gap-5 lg:gap-6">
        <AttributeTable />
        <Card
          role="region"
          aria-labelledby="build-tools-heading"
          className="flex flex-col gap-3 sm:p-5 xl:p-6"
        >
          <h2 id="build-tools-heading" className="font-display text-2xl leading-tight text-primary">{copy.buildTools}</h2>
          <div className="grid grid-cols-2 gap-2 min-[480px]:grid-cols-4">
            <Button type="button" variant="secondary" className={actionClass} onClick={copyLink}>
              {copied ? copy.linkCopied : copy.copyLink}
            </Button>
            <Button type="button" variant="secondary" className={actionClass} onClick={exportJson}>
              {copy.exportJson}
            </Button>
            <Button
              type="button"
              variant="secondary"
              className={actionClass}
              onClick={() => fileInput.current?.click()}
            >
              {copy.importJson}
            </Button>
            <input
              ref={fileInput}
              type="file"
              accept="application/json,.json"
              className="sr-only"
              tabIndex={-1}
              aria-label={copy.importJsonBuild}
              onChange={(event) => {
                void importJson(event.target.files?.[0]);
                event.target.value = "";
              }}
            />
            <Button type="button" variant="secondary" className={actionClass} onClick={() => window.print()}>
              {copy.print}
            </Button>
          </div>
          {importError ? (
            <p className="text-sm text-danger-foreground" role="alert">
              {importError}
            </p>
          ) : null}
        </Card>
      </div>

      <RacialTraits />
    </form>
  );
};
