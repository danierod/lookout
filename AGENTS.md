# Agent guide

This file is for the Lookout product. The client package is `app`. Feature work has not started.

`poc/` is a separate proof of concept. It is not the product architecture, the chosen stack, or the place for product code. When a task is about that proof of concept, read `poc/AGENTS.md`. Keep every proof-of-concept change and doc inside `poc/`.

## Docs

| Path | Role |
| --- | --- |
| `docs/product.md` | What to build, and in what order |
| `docs/architecture.md` | Product structure. No implementation is recorded here yet. |
| `docs/engineering.md` | Code rules UI work must follow |
| `docs/guides/react-native-client.md` | How the React Native client is set up, and why |
| `DESIGN.md` | Visual language agents follow |
| `docs/design/theme.css` | Token values UI code uses |
| `docs/decisions/` | Choices the product must keep |
| `docs/features/_template.md` | Blank brief for a new feature |

## Commands

Run the client app from the repo root:

```sh
pnpm app
```

That starts the Expo dev server for the `app` package.

## Boundaries

- A wallet is a public Solana address. Do not add key import, signing, or buy/sell/send execution. See [docs/decisions/0001-address-only-lookup.md](docs/decisions/0001-address-only-lookup.md).
- Do not start the product inside `poc/`.
- Do not copy proof-of-concept modules, routes, or providers into `docs/`, `README.md`, or this file.

## When the product changes

Update the doc that owns the fact in the same change:

- A product boundary or priority → `docs/product.md`
- A package, route, or data flow in the product → `docs/architecture.md`
- A code rule for UI work → `docs/engineering.md`
- A visual token → `DESIGN.md` and `docs/design/theme.css` in the same change
- A choice that later work must not undo → a new file in `docs/decisions/`
- A feature brief → `docs/features/<feature-name>.md`, copied from `docs/features/_template.md`
- A command or invariant on this page → `AGENTS.md`

## Draft or plan a feature

When the user asks to draft or plan a new feature, copy `docs/features/_template.md` to `docs/features/<feature-name>.md` and fill it in the same change.

- Write only what the user, `docs/product.md`, and the decision records already support.
- Leave **Open** as an unanswered list. Do not invent an answer to close an item.
- Do not put colors, type, spacing, radius, or component structure in the brief.
- When the feature changes what the product is, update `docs/product.md` in the same change.
- When the feature locks a boundary later work must not undo, add a file in `docs/decisions/` in the same change.

When a trade-off is required, use this order: user experience, then engineering quality, then velocity.
