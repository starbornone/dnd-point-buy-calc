# FAQ

## Is this the 2024 / “5.5e” rules?

No. The shipped product is a **D&D 5e** point-buy calculator as described in the [README](../README.md). Support for the 2024 Player’s Handbook (often called 5.5e) is an open [roadmap](../roadmap/roadmap.json) item.

## Which races are included?

See the Racial Modifiers and Variants section in the [README](../README.md). That list is the product source of truth for players; `src/data/races/` is the implementation source of truth for contributors.

## Which UI languages work today?

English and Simplified Chinese. Japanese, Macedonian, and Russian are tracked on the roadmap and stay out of the language selector until ready.

## Does the app save characters to a server?

No. Assumption from the architecture: builds are handled in the browser (URL sync / import-export). There is no documented account system.

## Where should agents start?

[AGENTS.md](../AGENTS.md), then [getting-started.md](getting-started.md) and [architecture.md](architecture.md).
