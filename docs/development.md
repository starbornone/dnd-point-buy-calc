# Development

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Vite development server |
| `npm run build` | Typecheck and production build |
| `npm start` | Preview the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest once (`vitest run`) |

Use Node **24.x**. Prefer small, focused changes with matching tests under `src/**/*.test.ts` when touching calculation or build-serialization logic. Component tests use React Testing Library and opt into jsdom with `// @vitest-environment jsdom` in the test file. CI runs typecheck, lint, tests, and the production build.

## Repo layout

```
src/
  main.tsx       # Vite entry
  App.tsx        # Page shell
  Providers.tsx  # Locale / race / stats providers
  components/    # UI (calculator form, tables, selectors)
  context/       # Locale, race, stats providers
  data/          # Races, skills, languages, tools, feats, …
  i18n/          # Locales, messages, names, trait translations
  utils/         # Pure calculation and build encode/decode
  types/         # Shared TypeScript types
public/          # Static SEO assets (robots, sitemap, manifest, OG image)
docs/            # Agent-ready documentation (this tree)
roadmap/         # roadmap.json, completed.json, cancelled.json
AGENTS.md        # Coding-agent entrypoint
README.md        # Human product entrypoint
```

## Local workflow

1. Branch or work on `main` per your team’s norm.
2. Change data, utils, or UI as needed ([architecture](architecture.md)).
3. Run `npm test` and `npm run typecheck` for logic changes; `npm run lint` when touching broader UI.
4. Manually click through race selection and score edits in `npm run dev`.
5. Update [docs](overview.md) when behavior or setup changes; update `roadmap/` in the **same** change as the work it describes ([contributing](contributing.md)).

## i18n notes

- Active locales: `en`, `zh` (`src/i18n/locale.ts`).
- Planned (listed in `PLANNED_LOCALES`, hidden from the selector until enabled): Japanese, Macedonian, Russian.
- UI strings: `src/i18n/messages.ts`. Display names: `src/i18n/names.ts`. Chinese racial traits: `src/i18n/raceTraits.zh.ts`.

## Safety for agents

- Do not invent a backend, auth, or CI config the repo does not already use.
- Do not rename roadmap item `id`s ([roadmap format](roadmap-format.md)).
- Keep README race lists and `src/data/races/` aligned when adding or removing races.
