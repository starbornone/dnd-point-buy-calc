import { languages } from "@/data/languages";
import { LanguageChoice, Race, Variant } from "@/types";

export type LanguagePicks = [string, string];

const languageNames: readonly string[] = languages;

export const emptyLanguagePicks = (): LanguagePicks => ["", ""];

export const resolveLanguageChoice = (
  race: Race | undefined,
  variant: Variant | undefined
): LanguageChoice | undefined => {
  if (!race) return undefined;
  return variant?.languageChoice ?? race.languageChoice;
};

export const languageOptions = (choice: LanguageChoice): readonly string[] => {
  const excluded = new Set(choice.exclude ?? []);
  return languageNames.filter((name) => !excluded.has(name));
};

export const selectLanguages = (
  choice: LanguageChoice | undefined,
  requested: readonly string[]
): LanguagePicks => {
  const picks = emptyLanguagePicks();
  if (!choice) return picks;

  const allowed = new Set(languageOptions(choice));
  const used = new Set<string>();
  for (const name of requested) {
    if (!allowed.has(name) || used.has(name)) continue;
    picks[used.size] = name;
    used.add(name);
    if (used.size === choice.count) break;
  }
  return picks;
};
