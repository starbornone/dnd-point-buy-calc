# AGENTS

## Project

- **Title:** D&D 5e Point-Buy Calculator
- **Key:** `dnd-point-buy-calc`
- **Purpose:** Browser calculator for Dungeons & Dragons 5e point-buy ability scores, applying racial bonuses, variants, and related starting choices, with English and Simplified Chinese UI and a shareable in-browser build flow.

## Layout

| Path | Why it matters |
| --- | --- |
| [README.md](README.md) | Human product entrypoint: features, race list, install |
| [docs/](docs/overview.md) | Overview, architecture, setup, contributing, roadmap contract |
| [roadmap/](roadmap/roadmap.json) | Todo / completed / cancelled backlog |
| `src/app/` | Next.js App Router shell and providers |
| `src/components/` | Calculator UI |
| `src/context/` | Locale, race, and stats state |
| `src/data/` | Race and lookup tables |
| `src/utils/` | Point cost, modifiers, build serialize/parse |
| `src/i18n/` | Locales, messages, names, Chinese traits |

## Working agreements

- Node.js **24.x**; package manager npm (yarn also fine for install).
- Common commands: `npm run dev`, `npm test`, `npm run typecheck`, `npm run lint`, `npm run build`.
- Prefer small diffs. Add Vitest coverage when changing calculation or build serialization.
- Do not invent auth, databases, CI, or APIs the repo does not already use.
- Keep README race lists and `src/data/races/` aligned when races change.

## Documentation

- Update [docs/](docs/overview.md) when setup, architecture, or contributor process changes.
- Keep [README.md](README.md) and docs consistent in the same change.
- Start with [docs/overview.md](docs/overview.md) and [docs/architecture.md](docs/architecture.md).

## Roadmap

This project's key is `dnd-point-buy-calc` and its title is `D&D 5e Point-Buy Calculator`. Keep the
roadmap in three files in `roadmap/` at the repository root:

- `roadmap/roadmap.json`: project status and items still to do, highest priority first
- `roadmap/completed.json`: finished items
- `roadmap/cancelled.json`: items that will not be done

All three use this shape:

```json
{
  "schema": "name-roadmap/v1",
  "file": "roadmap",
  "updatedAt": "2026-10-14T09:30:00+11:00",
  "project": { "key": "dnd-point-buy-calc", "title": "D&D 5e Point-Buy Calculator", "status": "active", "summary": "Optional, roadmap.json only." },
  "items": [
    { "id": "stable-kebab-id", "title": "Short imperative title", "group": "Optional area", "notes": "Optional detail" }
  ]
}
```

Rules:

1. `schema` is always `"name-roadmap/v1"`. `file` is `"roadmap"`,
   `"completed"` or `"cancelled"` to match the filename.
2. `project.key`, `project.title` and `project.status` are identical in all
   three files. Never change `project.key`. `status` is `active`, `paused` or
   `complete`. `summary` appears only in `roadmap.json`.
3. Every item has an `id`: lowercase kebab-case, unique across all three files,
   never renamed and never reused, even after the item is completed or cancelled.
   Titles and notes may be edited freely; the id stays the same.
4. Allowed item fields are `id`, `title`, `group` and `notes`, plus
   `completedAt` (`completed.json` only, required) and `cancelledAt` with an
   optional `reason` (`cancelled.json` only). Add no other fields.
5. When work is finished, move the item from `roadmap.json` to the end of
   `completed.json` and add `completedAt`. When it is dropped, move it to the
   end of `cancelled.json` and add `cancelledAt` and a short `reason`. Never
   delete an item outright. If a cancelled item is revived, move it back to
   `roadmap.json` with the same id and remove `cancelledAt`/`reason`.
6. Each item is in exactly one file. Split work into new items with new ids
   rather than changing what an existing id means.
7. Set `updatedAt` in every file you change. Timestamps are ISO 8601 with a
   UTC offset, e.g. `2026-10-14T09:30:00+11:00`.
8. Keep `roadmap.json` items in priority order. Titles are at most 500
   characters; notes and reasons at most 20,000; at most 2,000 items per file.
9. Output valid JSON only: UTF-8, two-space indent, no comments, no trailing
   commas. Create a missing file with an empty `items` array.
10. Update the roadmap in the same change as the work it describes: mark an
    item completed only when that work is actually done.

The format contract for other repositories this repo will import is in
[docs/roadmap-format.md](docs/roadmap-format.md).

## Do / don’t

**Do**

- Prefer small, reviewable diffs
- Update roadmap items in the same change as the work
- Run tests/typecheck for logic changes
- Link docs with relative paths

**Don’t**

- Rename or reuse roadmap `id`s
- invent APIs, auth, databases, or CI the project does not use
- mark roadmap items completed before the work lands
- expand into a full character builder unless a roadmap item says so
