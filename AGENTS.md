# Agent guide

This file is for the Lookout product. The product implementation has not started.

`poc/` is a separate proof of concept. It is not the product architecture, the chosen stack, or the place for product code. When a task is about that proof of concept, read `poc/AGENTS.md`. Keep every proof-of-concept change and doc inside `poc/`.

## Docs

| Path | Role |
| --- | --- |
| `docs/product.md` | What to build, and in what order |
| `docs/architecture.md` | Product structure. No implementation is recorded here yet. |
| `docs/engineering.md` | Code rules UI work must follow |
| `docs/decisions/` | Choices the product must keep |

## Boundaries

- A wallet is a public Solana address. Do not add key import, signing, or buy/sell/send execution. See [docs/decisions/0001-address-only-lookup.md](docs/decisions/0001-address-only-lookup.md).
- Do not start the product inside `poc/`.
- Do not copy proof-of-concept modules, routes, or providers into `docs/`, `README.md`, or this file.

## When the product changes

Update the doc that owns the fact in the same change:

- A product boundary or priority → `docs/product.md`
- A package, route, or data flow in the product → `docs/architecture.md`
- A code rule for UI work → `docs/engineering.md`
- A choice that later work must not undo → a new file in `docs/decisions/`
- A command or invariant on this page → `AGENTS.md`

When a trade-off is required, use this order: user experience, then engineering quality, then velocity.
