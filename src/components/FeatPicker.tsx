
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { useLocale, useMessages } from "@/context/LocaleContext";
import { featOptions } from "@/data/feats";
import { featRulesUrl, getFeatPrerequisite, getFeatSummary } from "@/i18n/featSummaries";
import { abilityLabel, featLabel, originFeatLabel } from "@/i18n/names";
import { cn } from "@/lib/utils";
import type { AttributeState } from "@/types/race";
import { grantedFeatAbility } from "@/utils/calculateFeatBonus";
import { calculateModifier } from "@/utils/calculateModifier";
import type { RulesEdition } from "@/utils/origin2024";
import { ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

type AbilityChoice = keyof AttributeState | "";

interface FeatPickerProps {
  id: string;
  label: string;
  edition: RulesEdition;
  options: readonly string[];
  value: string;
  abilityChoice?: AbilityChoice;
  scoresBeforeFeat?: AttributeState;
  onSelect: (feat: string, ability: AbilityChoice) => void;
}

export const FeatPicker = ({
  id, label, edition, options, value, abilityChoice = "", scoresBeforeFeat, onSelect,
}: FeatPickerProps) => {
  const { locale } = useLocale();
  const copy = useMessages();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [bonusOnly, setBonusOnly] = useState(false);
  const [draft, setDraft] = useState<{ feat: string; ability: AbilityChoice }>({ feat: "", ability: "" });
  const searchInput = useRef<HTMLInputElement>(null);
  const previewRow = useRef<HTMLLIElement>(null);
  const dialogId = useId();
  const previewId = `${dialogId}-preview`;
  const bonusId = `${dialogId}-ability`;
  const legacy = edition === "2014";
  const terms = search.trim().toLocaleLowerCase(locale).split(/\s+/).filter(Boolean);
  const results = open ? options
    .map((feat) => {
      const name = legacy ? featLabel(locale, feat) : originFeatLabel(locale, feat);
      const summary = getFeatSummary(edition, feat, locale) ?? "";
      const abilities = legacy ? featOptions(feat) : [];
      const searchable = [feat, name, summary, ...abilities.map((ability) => abilityLabel(locale, ability))]
        .join(" ").toLocaleLowerCase(locale);
      return { feat, name, summary, abilities, searchable };
    })
    .filter(({ abilities, searchable }) => (!bonusOnly || abilities.length > 0) && terms.every((term) => searchable.includes(term)))
    .sort((a, b) => Number(b.feat === value) - Number(a.feat === value) || a.name.localeCompare(b.name, locale)) : [];
  const bonusAbility = legacy ? grantedFeatAbility(draft.feat, draft.ability) : "";
  const scoreBefore = scoresBeforeFeat && bonusAbility ? scoresBeforeFeat[bonusAbility] : undefined;
  const scorePreview = bonusAbility && scoreBefore !== undefined
    ? copy.featScorePreview(abilityLabel(locale, bonusAbility), scoreBefore, scoreBefore + 1, calculateModifier(scoreBefore + 1))
    : "";

  useEffect(() => {
    if (open && draft.feat) previewRow.current?.scrollIntoView({ block: "nearest" });
  }, [open, draft.feat]);

  return (
    <div className="min-w-0">
      <p className="mb-2 text-sm">{label}</p>
      <Dialog open={open} onOpenChange={(nextOpen) => {
        if (nextOpen) {
          setSearch("");
          setBonusOnly(false);
          setDraft({ feat: value, ability: abilityChoice });
        }
        setOpen(nextOpen);
      }}>
        <DialogTrigger asChild>
          <Button id={id} type="button" variant="secondary" className="min-h-11 w-full justify-start break-words px-2.5 text-sm">
            {value ? copy.changeFeat : copy.chooseFeat}
          </Button>
        </DialogTrigger>
        <DialogContent
          aria-describedby={undefined}
          className="max-w-2xl gap-3 overflow-hidden print:hidden"
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            searchInput.current?.focus();
          }}
        >
          <div className="shrink-0 space-y-2">
            <DialogTitle>{copy.chooseFeat}</DialogTitle>
            <Input
              ref={searchInput}
              type="search"
              aria-label={copy.searchFeats}
              placeholder={copy.featSearchHint}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="min-h-11 w-full"
            />
            {legacy && (
              <label className="flex min-h-8 items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="size-4 shrink-0 appearance-auto accent-primary focus:ring-ring focus:ring-offset-background"
                  checked={bonusOnly}
                  onChange={(event) => setBonusOnly(event.target.checked)}
                />
                {copy.featAbilityFilter}
              </label>
            )}
            <p role="status" className="text-xs text-muted-foreground">{copy.featResults(results.length)}</p>
          </div>
          <div className="-mx-1 min-h-0 overflow-y-auto overscroll-contain p-1">
            {results.length === 0 ? <p className="py-3 text-sm">{copy.noFeatResults}</p> : (
              <ul className="grid gap-2">
                {results.map(({ feat, name, summary, abilities }) => {
                  const expanded = feat === draft.feat;
                  const prerequisite = expanded ? getFeatPrerequisite(edition, feat, locale) : undefined;
                  return (
                    <li
                      key={feat}
                      ref={expanded ? previewRow : undefined}
                      className={cn("rounded-md border border-border", expanded && "border-primary bg-muted")}
                    >
                      <button
                        type="button"
                        aria-expanded={expanded}
                        aria-controls={expanded ? previewId : undefined}
                        className="block min-h-11 w-full rounded-md px-2.5 py-2 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring hover:bg-muted"
                        onClick={() => setDraft(expanded
                          ? { feat: "", ability: "" }
                          : { feat, ability: feat === value ? abilityChoice : "" })}
                      >
                        <span className="flex items-start justify-between gap-2">
                          <span className="flex flex-wrap items-baseline gap-x-2">
                            <span className="text-sm font-semibold text-primary">{name}</span>
                            {feat === value && <span className="text-xs text-muted-foreground">{copy.currentFeat}</span>}
                            {abilities.length > 0 && <span className="text-xs text-muted-foreground">+1</span>}
                          </span>
                          <ChevronDown aria-hidden="true" className={cn("mt-0.5 size-4 shrink-0 text-muted-foreground", expanded && "rotate-180")} />
                        </span>
                        {!expanded && <span className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{summary}</span>}
                      </button>
                      {expanded && (
                        <div id={previewId} className="grid gap-2 border-t border-border p-2.5 text-sm">
                          <p>{summary}</p>
                          {prerequisite && <p className="font-medium">{copy.featPrerequisite(prerequisite)}</p>}
                          {abilities.length > 1 && (
                            <div className="min-w-0">
                              <label htmlFor={bonusId} className="mb-1 block">{copy.featAbility(name)}</label>
                              <NativeSelect
                                id={bonusId}
                                aria-required="true"
                                value={draft.ability}
                                onChange={(event) => {
                                  const ability = grantedFeatAbility(feat, event.target.value);
                                  setDraft({ feat, ability });
                                }}
                              >
                                <option value="">{copy.selectAttribute}</option>
                                {abilities.map((ability) => <option key={ability} value={ability}>{abilityLabel(locale, ability)}</option>)}
                              </NativeSelect>
                            </div>
                          )}
                          {scorePreview && <p role="status" className="font-medium">{scorePreview}</p>}
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <a href={featRulesUrl[edition]} target="_blank" rel="noopener noreferrer" className="text-xs text-primary underline underline-offset-2">
                              {copy.featRuleReference(edition)}
                            </a>
                            <Button
                              type="button"
                              className="min-h-11 px-3 text-sm"
                              disabled={abilities.length > 1 && !bonusAbility}
                              onClick={() => {
                                onSelect(feat, bonusAbility);
                                setOpen(false);
                              }}
                            >
                              {copy.useFeat}
                            </Button>
                          </div>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <div className="flex shrink-0 flex-wrap justify-end gap-2">
            {value && (
              <Button type="button" variant="secondary" className="min-h-11 px-3 text-sm" onClick={() => {
                onSelect("", "");
                setOpen(false);
              }}>
                {copy.clearFeat}
              </Button>
            )}
            <DialogClose asChild>
              <Button type="button" variant="secondary" className="min-h-11 px-3 text-sm">{copy.cancelFeatChoice}</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
