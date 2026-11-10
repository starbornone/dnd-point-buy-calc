# Getting started

Run the calculator locally with Node.js 24 and npm (or yarn).

## Prerequisites

- **Node.js** `24.x` (see `engines` in `package.json`)
- **npm** or **yarn**
- Git, for cloning

For production SEO (canonical URLs, Open Graph, sitemap), set `VITE_SITE_URL` to the public origin (see `.env.example`). Static crawler files under `public/` use the default origin until you regenerate them for another host.

If Node is missing or is a different major version, `npm install` / `vite` may fail or warn. Use an nvm/fnm-managed 24.x runtime.

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

Open [http://localhost:5173](http://localhost:5173).

You should see the point-buy calculator, the rules edition selector, the ability score table, and the language selector (English and 简体中文).

## First useful action

1. In the default 2024 rules, choose a species and the **Farmer** background.
2. Choose **+1 to all three** and confirm the totals for Strength, Constitution, and Wisdom each rise by one.
3. Raise or lower a base score to see point costs and the remaining budget update.
4. To use the original race picker, select **2014 rules (5e)** in Character Setup.

## Failure symptoms

| Symptom | Likely cause |
| --- | --- |
| `engine` / Node version errors on install | Node is not 24.x |
| Port 5173 already in use | Another process holds the port; stop it or start Vite on another port |
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
