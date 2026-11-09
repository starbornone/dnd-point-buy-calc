# Getting started

Run the calculator locally with Node.js 24 and npm (or yarn).

## Prerequisites

- **Node.js** `24.x` (see `engines` in `package.json`)
- **npm** or **yarn**
- Git, for cloning

For production SEO (canonical URLs, Open Graph, sitemap), set `NEXT_PUBLIC_SITE_URL` to the public origin (see `.env.example`).

If Node is missing or is a different major version, `npm install` / `next` may fail or warn. Use an nvm/fnm-managed 24.x runtime.

Unsupported / untested: non-Node runtimes, and Node majors outside 24.x. The README does not claim Windows/macOS/Linux differences beyond a normal Node toolchain — all three should work if Node 24 is installed.

## Install

```bash
git clone git@github.com:starbornone/DnD-Point-Buy-Calc.git
cd DnD-Point-Buy-Calc
npm install
```

Yarn is also acceptable for install if you prefer it; scripts below use npm as documented in the README.

## Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

You should see the point-buy calculator title, race selector, ability score table, and language select (English and 简体中文).

## First useful action

1. Select a race (for example **Dragonborn**).
2. Confirm racial bonuses appear on Strength and Charisma and update totals.
3. Raise or lower a score and watch point cost / points remaining change.
4. Optionally click the standard-array control to fill 15, 14, 13, 12, 10, 8.

## Failure symptoms

| Symptom | Likely cause |
| --- | --- |
| `engine` / Node version errors on install | Node is not 24.x |
| Port 3000 already in use | Another process holds the port; stop it or start Next on another port |
| Blank page / module errors after pull | Stale `node_modules` — re-run `npm install` |
| Clone fails over SSH | GitHub SSH key missing; use HTTPS clone instead |

## Verify tooling

```bash
npm run typecheck
npm test
npm run lint
```

These scripts are defined in `package.json` and are the local quality gates before a change.

## Next

- [Development](development.md) for layout and workflow
- [Overview](overview.md) for product scope
