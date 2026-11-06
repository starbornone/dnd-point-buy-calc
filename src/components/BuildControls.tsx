"use client";

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

export const BuildControls = () => {
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
    <div className="mt-4 flex flex-col gap-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <label htmlFor="point-budget" className="block font-bold">
          {copy.pointBudget}
        </label>
        <input
          id="point-budget"
          aria-label={copy.pointBudget}
          className="mt-2 w-24 border p-2 rounded text-center"
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
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="bg-navButton text-bgInverse px-4 py-2 rounded min-h-11"
          onClick={applyStandardArray}
        >
          {copy.standardArray}
        </button>
        <button
          type="button"
          className="bg-navButton text-bgInverse px-4 py-2 rounded min-h-11"
          onClick={copyLink}
        >
          {copied ? copy.linkCopied : copy.copyLink}
        </button>
        <button
          type="button"
          className="bg-navButton text-bgInverse px-4 py-2 rounded min-h-11"
          onClick={exportJson}
        >
          {copy.exportJson}
        </button>
        <button
          type="button"
          className="bg-navButton text-bgInverse px-4 py-2 rounded min-h-11"
          onClick={() => fileInput.current?.click()}
        >
          {copy.importJson}
        </button>
        <input
          ref={fileInput}
          type="file"
          accept="application/json,.json"
          className="sr-only"
          aria-label={copy.importJsonBuild}
          onChange={(event) => {
            void importJson(event.target.files?.[0]);
            event.target.value = "";
          }}
        />
        <button
          type="button"
          className="bg-navButton text-bgInverse px-4 py-2 rounded min-h-11"
          onClick={() => window.print()}
        >
          {copy.print}
        </button>
        <button
          type="button"
          className="bg-primary text-white px-4 py-2 rounded min-h-11"
          onClick={reset}
        >
          {copy.reset}
        </button>
      </div>
      </div>
      {importError ? (
        <p className="text-primary" role="alert">
          {importError}
        </p>
      ) : null}
    </div>
  );
};
