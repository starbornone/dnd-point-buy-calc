# Architecture

Next.js App Router app with localized server-rendered metadata and client-side character state. Race rules live in TypeScript data modules. Pure utilities compute costs, modifiers, and choices.

## High-level flow

```mermaid
flowchart TD
  page["src/app/page.tsx"] --> form["CharacterForm / selectors"]
  page --> traits["RacialTraits / PrintSheet"]
  providers["Providers"] --> locale["LocaleContext"]
  providers --> race["RaceContext"]
  providers --> stats["StatsContext"]
  providers --> sync["BuildSync"]
  form --> race
  form --> stats
  race --> data["src/data/races/*"]
  stats --> utils["src/utils/*"]
  sync --> url["URL query / JSON import-export"]
  locale --> i18n["src/i18n/*"]
```

## Major pieces

| Area | Path | Role |
| --- | --- | --- |
| App shell | `src/app/` | Layout, providers, home page |
| UI | `src/components/` | Form, attribute table, race/options selectors, print sheet, language select |
| State | `src/context/` | Locale, race selection + choices, ability scores / budget |
| Race rules | `src/data/races/`, `src/data/raceData.ts` | Bonuses, traits, language/skill/tool/cantrip grants |
| Lookups | `src/data/` | Skills, languages, tools, feats, dragons, cantrips |
| Calculations | `src/utils/` | Point cost, modifiers, racial bonuses, build serialize/parse |
| i18n | `src/i18n/` | Locales, UI strings, display names, Chinese racial trait text |
| Types | `src/types/` | Race / attribute contracts |

## Control and data flow

1. Middleware reads `?lang=` for the home page. The layout uses that locale for the initial HTML language, metadata, and locale provider. `BuildSync` restores build state from the URL and updates the query in browser history as the user edits.
2. Selecting a race or variant updates `RaceContext`, which drives available choices (skills, languages, tools, cantrips, ancestry, feat).
3. Score edits and flexible ASI picks update `StatsContext`; utils recalculate point cost, remaining budget, racial totals, and modifiers.
4. Locale changes swap UI copy and labels via `LocaleContext` / `src/i18n`; race rules text falls back to English when a locale has no trait translation (Chinese has dedicated trait text).

## Where a typical change lands

| Change | Touch |
| --- | --- |
| New race or variant | `src/data/races/`, dropdown/registry, i18n names (and Chinese traits if supporting `zh`) |
| Point-buy or modifier math | `src/utils/`, matching `*.test.ts` |
| New UI control | `src/components/`, wire through contexts |
| New locale | `src/i18n/locale.ts`, `messages.ts`, `names.ts`, language select; trait text if needed |
| Shareable build field | `src/utils/characterBuild.ts` and `BuildSync` |

## Boundaries

Assumption from the README: this remains a **browser calculator**, not a server API. There is no documented database or auth layer; do not introduce them without an explicit roadmap item.
