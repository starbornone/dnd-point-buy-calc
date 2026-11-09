# Overview

**D&D 5e Point-Buy Calculator** (`dnd-point-buy-calc`) is a Next.js web app that builds starting ability scores for *Dungeons & Dragons* 5th Edition characters using the point-buy rules, with racial bonuses, variants, and related starting choices applied live.

## Who it is for

- Players building a 5e character before session zero
- Dungeon Masters checking whether a proposed array fits the campaign budget
- Contributors and coding agents working in this repository

## Core capabilities

- Adjust Strength, Dexterity, Constitution, Intelligence, Wisdom, and Charisma within point-buy limits
- Fill the Player’s Handbook standard array (15, 14, 13, 12, 10, 8)
- Apply racial ability increases and variant-specific bonuses from the races listed in the [README](../README.md)
- Choose flexible ASI slots, skills, languages, tools, cantrips, feats, or draconic ancestry when a race grants them
- See totals, point cost, remaining budget, and ability modifiers update immediately
- Switch UI locale between English and Simplified Chinese (other languages are planned)
- Share or restore a build via URL / import-export flows present in the app

## Non-goals

Assumption: the README describes a **5e** calculator, not a full character sheet or VTT.

- Not a complete character builder (no classes, levels, equipment loadouts, or spell lists beyond race-granted cantrips)
- Not a rules encyclopedia for every published 5e option
- Not D&D **5.5e / 2024 Player’s Handbook** support yet — that is tracked on the [roadmap](../roadmap/roadmap.json)
- No backend, accounts, or multiplayer sync

## Status

The project is **active**. Shipped 5e point-buy and racial coverage are documented in the README; remaining work (5.5e update and additional locales) lives in `roadmap/`.

## Next reads

- [Getting started](getting-started.md) — install and run locally
- [Architecture](architecture.md) — how the app is structured
- [Development](development.md) — scripts, layout, and agent workflow
- [AGENTS.md](../AGENTS.md) — working agreements for coding agents
