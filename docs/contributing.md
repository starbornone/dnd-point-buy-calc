# Contributing

## Propose changes

1. Prefer small diffs that solve one problem (one race, one locale string pack, one util fix).
2. Match existing TypeScript, React, and Tailwind patterns in `src/`.
3. Add or update Vitest coverage when changing point cost, modifiers, racial rules, or build serialization.
4. Run `npm test`, `npm run typecheck`, and `npm run lint` before opening a PR when those areas are touched.

## Documentation

- [README.md](../README.md) stays the human product entrypoint (features, race list, install).
- Deeper how-to and agent guidance live under [docs/](overview.md) and [AGENTS.md](../AGENTS.md).
- When behavior, install steps, or scope change, update README **and** the relevant `docs/` page in the same change so they do not drift.

## Roadmap discipline

Roadmap items **move with the work they describe**:

- Starting work that is already listed: keep the same `id`.
- Finishing work: move the item from `roadmap/roadmap.json` to the end of `roadmap/completed.json` and set `completedAt`.
- Dropping work: move it to `roadmap/cancelled.json` with `cancelledAt` and a short `reason`.
- Never delete an item or reuse an `id`.

Full contract: [roadmap-format.md](roadmap-format.md). Agent rules: [AGENTS.md](../AGENTS.md).

## Product scope

Stay within the 5e point-buy calculator described in the README unless you are executing an explicit roadmap item (for example the 5.5e update or a new locale).
