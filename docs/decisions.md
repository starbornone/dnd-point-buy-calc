# Decisions

Lightweight records inferred from the README and the shipped codebase. Not a full ADR archive.

## ADR-001: Next.js + TypeScript + Tailwind

**Context:** The calculator needs a responsive browser UI with typed race rules and live recalculation.

**Decision:** Build with Next.js, TypeScript, React, and Tailwind CSS (as stated in the README).

**Consequences:** Contributors need a Node 24 toolchain. UI and rules live in one frontend package; there is no separate API service to deploy.

## ADR-002: React Context for calculator state

**Context:** Race selection, scores, and bonuses must stay in sync across the form, trait panel, and print/share views without full page reloads.

**Decision:** Use the React Context API for global calculator state (README: locale/race/stats-style global state).

**Consequences:** State is client-side only. Persistence is via URL/build helpers, not a database. Agents should extend existing providers rather than introducing a new global store without cause.

## ADR-003: 5e race data as TypeScript modules

**Context:** Many races and variants need structured bonuses and trait text.

**Decision:** Encode races under `src/data/races/` and assemble them through `raceData` / dropdown registries, with UI copy and Chinese trait text in `src/i18n/`.

**Consequences:** Adding a race is a data + i18n change more than a UI rewrite. Keeping the README race list accurate is part of the change.

## ADR-004: Scope stays point-buy + racial starting choices

**Context:** Players need ability scores and racial grants, not a full digital character sheet.

**Decision:** Ship point buy, standard array, racial ASIs/variants, and race-granted choices (skills, languages, tools, cantrips, feats, ancestry). Do not treat classes, leveling, or inventory as in-scope unless the roadmap says otherwise.

**Consequences:** Feature requests for full builder tooling should become roadmap items or be declined; 5.5e support is tracked separately rather than silently mixed into 5e data.

## ADR-005: name-roadmap/v1 JSON in `roadmap/`

**Context:** Humans and agents need a stable, importable backlog shared with other repositories.

**Decision:** Track work in `roadmap/roadmap.json`, `roadmap/completed.json`, and `roadmap/cancelled.json` using the [name-roadmap/v1](roadmap-format.md) contract; agent rules live in [AGENTS.md](../AGENTS.md).

**Consequences:** Item `id`s are permanent. Roadmap updates ship in the same change as the work. Priority order in `roadmap.json` is meaningful.
