"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLocale, useMessages } from "@/context/LocaleContext";
import { useRace } from "@/context/RaceContext";
import { useStats } from "@/context/StatsContext";
import { withLocale } from "@/i18n/locale";
import { MAX_POINT_BUDGET, MIN_POINT_BUDGET } from "@/utils/calculatePointCost";
import { standardArrayAttributes } from "@/utils/standardArray";
import {
  buildFileName,
  defaultBuild,
  fromBuildFile,
  serializeBuild,
  toBuildFile,
  type CharacterBuild,
} from "@/utils/characterBuild";
import { useEffect, useRef, useState } from "react";
import { AttributeTable } from "./AttributeTable";
import { CharacterOptions } from "./CharacterOptions";
import { RacialTraits } from "./RacialTraits";

const actionClass = "min-h-11 break-words px-2 text-sm leading-snug [overflow-wrap:anywhere]";
type Feedback = "linkCopied" | "copyError" | "invalidJson" | "importReadError" | "importError" | "importSuccess";
type SetupAction = "reset" | "standardArray";
type SetupChange =
  | { action: SetupAction; previous: CharacterBuild; resultQuery: string }
  | { action: "restored"; resultQuery: string };

export const CharacterForm = () => {
  const { locale } = useLocale();
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
  const { attributes, pointBudget, setPointBudget, loadStats } = useStats();
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [setupChange, setSetupChange] = useState<SetupChange | null>(null);
  const feedbackIsSuccess = feedback === "linkCopied" || feedback === "importSuccess";
  const fileInput = useRef<HTMLInputElement>(null);
  const setupActions = useRef<HTMLDivElement>(null);
  const standardArrayButton = useRef<HTMLButtonElement>(null);
  const resetButton = useRef<HTMLButtonElement>(null);
  const importRequest = useRef(0);
  const build: CharacterBuild = {
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
  const buildQuery = serializeBuild(build);
  const currentSetupChange = setupChange?.resultQuery === buildQuery ? setupChange : null;
  const undo = currentSetupChange?.action === "restored" ? null : currentSetupChange;
  const setupMessage = currentSetupChange?.action === "restored"
    ? copy.previousBuildRestored
    : undo && (undo.action === "reset" ? copy.buildReset : copy.standardArrayApplied);

  useEffect(() => {
    if (setupChange) setupActions.current?.scrollIntoView({ block: "nearest" });
  }, [setupChange]);

  const loadBuild = (next: CharacterBuild) => {
    loadRace(
      next.race,
      next.variant,
      next.bonuses,
      next.skills,
      next.languages,
      next.tool,
      next.cantrip,
      next.dragon,
      next.feat,
      next.featAbility
    );
    loadStats(next.attributes, next.budget);
  };

  const applySetupAction = (action: SetupAction, next: CharacterBuild) => {
    importRequest.current += 1;
    setFeedback(null);
    const resultQuery = serializeBuild(next);
    if (resultQuery === buildQuery) return;

    setSetupChange({ action, previous: build, resultQuery });
    loadBuild(next);
  };

  const restorePreviousBuild = () => {
    if (!undo) return;

    importRequest.current += 1;
    setFeedback(null);
    loadBuild(undo.previous);
    setSetupChange({ action: "restored", resultQuery: serializeBuild(undo.previous) });
    const actionButton = undo.action === "reset" ? resetButton : standardArrayButton;
    actionButton.current?.focus({ preventScroll: true });
  };

  const copyLink = async () => {
    const query = withLocale(buildQuery, locale);
    const url = `${window.location.origin}${window.location.pathname}${
      query ? `?${query}` : ""
    }`;
    try {
      await navigator.clipboard.writeText(url);
      setFeedback("linkCopied");
    } catch {
      setFeedback("copyError");
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
    setFeedback(null);
  };

  const importJson = async (file: File | undefined) => {
    if (!file) return;
    const request = ++importRequest.current;
    setFeedback(null);

    let text: string;
    try {
      text = await file.text();
    } catch {
      if (request === importRequest.current) setFeedback("importReadError");
      return;
    }
    if (request !== importRequest.current) return;

    let value: unknown;
    try {
      value = JSON.parse(text);
    } catch {
      setFeedback("invalidJson");
      return;
    }

    const parsed = fromBuildFile(value);
    if (!parsed) {
      setFeedback("importError");
      return;
    }

    loadBuild(parsed);
    setSetupChange(null);
    setFeedback("importSuccess");
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
            <CharacterOptions />
          </div>
          <div ref={setupActions} className="grid gap-3 border-t border-border pt-3 sm:grid-cols-2 lg:grid-cols-1">
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
              <Button
                ref={standardArrayButton}
                type="button"
                className={actionClass}
                onClick={() => applySetupAction("standardArray", { ...build, attributes: standardArrayAttributes() })}
              >
                {copy.standardArray}
              </Button>
              <Button
                ref={resetButton}
                type="button"
                variant="secondary"
                className={actionClass}
                aria-label={copy.resetScores}
                onClick={() => applySetupAction("reset", defaultBuild())}
              >
                {copy.reset}
              </Button>
            </div>
            <div className={setupMessage ? "flex items-center justify-between gap-2 rounded-md border border-border bg-muted p-2 sm:col-span-2 lg:col-span-1" : "sr-only"}>
              <p role="status" className="text-sm">{setupMessage}</p>
              {undo && (
                <Button type="button" variant="secondary" className={actionClass} onClick={restorePreviousBuild}>
                  {copy.undo}
                </Button>
              )}
            </div>
          </div>
        </Card>
      </section>

      <div className="grid min-w-0 gap-4 sm:gap-5 lg:gap-6">
        <AttributeTable />
        <RacialTraits />
        <Card
          role="region"
          aria-labelledby="build-tools-heading"
          className="flex flex-col gap-3 sm:p-5 xl:p-6"
        >
          <h2 id="build-tools-heading" className="font-display text-2xl leading-tight text-primary">{copy.buildTools}</h2>
          <div className="grid grid-cols-2 gap-2 min-[480px]:grid-cols-4">
            <Button type="button" variant="secondary" className={actionClass} onClick={copyLink}>
              {copy.copyLink}
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
          <p
            className={feedback ? (feedbackIsSuccess ? "text-sm text-muted-foreground" : "text-sm text-danger-foreground") : "sr-only"}
            role="status"
          >
            {feedback ? copy[feedback] : null}
          </p>
        </Card>
      </div>
    </form>
  );
};
