# Overview

**D&D 5e Point-Buy Calculator** (`dnd-point-buy-calc`) is a Vite + React SPA for building starting ability scores. It opens in 2024 mode (5.5e) and offers a 2014 mode (5e) in Character Setup.

## Who it is for

- Players building a 5e character before session zero
- Dungeon Masters checking whether a proposed array fits the campaign budget
- Contributors and coding agents working in this repository

## Core capabilities

- Adjust Strength, Dexterity, Constitution, Intelligence, Wisdom, and Charisma within point-buy limits
- Fill the Player’s Handbook standard array (15, 14, 13, 12, 10, 8)
- In 2024 mode, choose a Player’s Handbook species and background, then apply the background’s ability increases. The origin summary shows the background’s feat and skills.
- In 2014 mode, apply racial ability increases and variant-specific bonuses, and make the starting choices listed in the [README](../README.md).
- See totals, point cost, remaining budget, and ability modifiers update immediately
- Switch UI locale between English and Simplified Chinese (other languages are planned)
- Share or restore a build via URL / import-export flows present in the app

## Non-goals

Assumption: the README describes a **5e** calculator, not a full character sheet or VTT.

- Not a complete character builder (no classes, levels, equipment loadouts, or spell lists beyond race-granted cantrips)
- Not a rules encyclopedia for every published 5e option
- No backend, accounts, or multiplayer sync

## Status

The project is **active**. The README documents coverage for both editions. The remaining locale work is in the [roadmap](../roadmap/roadmap.json).

## Next reads

- [Getting started](getting-started.md) — install and run locally
- [Architecture](architecture.md) — how the app is structured
- [Development](development.md) — scripts, layout, and agent workflow
- [AGENTS.md](../AGENTS.md) — working agreements for coding agents
