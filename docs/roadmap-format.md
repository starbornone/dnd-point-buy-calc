# Roadmap format contract

This repository uses the **name-roadmap/v1** import contract so other repos (and humans) can read or merge backlog state predictably.

## Files

Keep three files under `roadmap/` at the repository root:

| File | `file` field | Purpose |
| --- | --- | --- |
| `roadmap/roadmap.json` | `"roadmap"` | Project status and open work, **highest priority first** |
| `roadmap/completed.json` | `"completed"` | Finished items |
| `roadmap/cancelled.json` | `"cancelled"` | Will not be done |

## Schema shape

```json
{
  "schema": "name-roadmap/v1",
  "file": "roadmap",
  "updatedAt": "2026-10-14T09:30:00+11:00",
  "project": {
    "key": "dnd-point-buy-calc",
    "title": "D&D 5e Point-Buy Calculator",
    "status": "active",
    "summary": "Optional, roadmap.json only."
  },
  "items": [
    {
      "id": "stable-kebab-id",
      "title": "Short imperative title",
      "group": "Optional area",
      "notes": "Optional detail"
    }
  ]
}
```

## Field rules

1. `schema` is always `"name-roadmap/v1"`. `file` is `"roadmap"`, `"completed"`, or `"cancelled"` to match the filename.
2. `project.key`, `project.title`, and `project.status` are identical in all three files. Never change `project.key`. `status` is `active`, `paused`, or `complete`. `summary` appears only in `roadmap.json`.
3. Every item has an `id`: lowercase kebab-case, unique across all three files, never renamed and never reused, even after completion or cancellation. Titles and notes may be edited; the id stays the same.
4. Allowed item fields are `id`, `title`, `group`, and `notes`, plus:
   - `completedAt` — required in `completed.json`
   - `cancelledAt` and optional `reason` — in `cancelled.json` only  
   Add no other fields.
5. Titles ≤ 500 characters; notes and reasons ≤ 20,000; ≤ 2,000 items per file.
6. Timestamps are ISO 8601 with a UTC offset. Set `updatedAt` on every file you change.
7. Output valid JSON only: UTF-8, two-space indent, no comments, no trailing commas. A missing file should be created with `"items": []`.

## Move semantics

| Event | Action |
| --- | --- |
| Work finished | Move item from `roadmap.json` to the **end** of `completed.json`; add `completedAt`. |
| Work dropped | Move item to the **end** of `cancelled.json`; add `cancelledAt` and a short `reason`. |
| Cancelled work revived | Move back to `roadmap.json` with the **same** `id`; remove `cancelledAt` / `reason`. |

Never delete an item outright. Each item exists in exactly one file. Split work into new items with new ids rather than changing what an existing id means.

Update the roadmap in the **same change** as the work it describes: mark completed only when that work is actually done.

## This project

- `project.key`: `dnd-point-buy-calc`
- `project.title`: `D&D 5e Point-Buy Calculator`

Live files: [roadmap.json](../roadmap/roadmap.json), [completed.json](../roadmap/completed.json), [cancelled.json](../roadmap/cancelled.json).

## Minimal valid examples

### `roadmap.json`

```json
{
  "schema": "name-roadmap/v1",
  "file": "roadmap",
  "updatedAt": "2026-11-09T20:26:45+11:00",
  "project": {
    "key": "dnd-point-buy-calc",
    "title": "D&D 5e Point-Buy Calculator",
    "status": "active",
    "summary": "Point-buy calculator for D&D 5e ability scores with racial bonuses and variants."
  },
  "items": [
    {
      "id": "example-open-item",
      "title": "Do the next highest-priority task",
      "group": "example",
      "notes": "Illustrative only."
    }
  ]
}
```

### `completed.json`

```json
{
  "schema": "name-roadmap/v1",
  "file": "completed",
  "updatedAt": "2026-11-09T20:26:45+11:00",
  "project": {
    "key": "dnd-point-buy-calc",
    "title": "D&D 5e Point-Buy Calculator",
    "status": "active"
  },
  "items": [
    {
      "id": "example-done-item",
      "title": "Ship a finished slice",
      "group": "example",
      "completedAt": "2026-11-09T20:26:45+11:00"
    }
  ]
}
```

### `cancelled.json`

```json
{
  "schema": "name-roadmap/v1",
  "file": "cancelled",
  "updatedAt": "2026-11-09T20:26:45+11:00",
  "project": {
    "key": "dnd-point-buy-calc",
    "title": "D&D 5e Point-Buy Calculator",
    "status": "active"
  },
  "items": []
}
```
