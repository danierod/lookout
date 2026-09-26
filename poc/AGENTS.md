# Proof of concept

This folder is an experiment. It is not the Lookout product and not the target architecture.

Keep every change and every doc for this experiment inside `poc/`. Do not record its packages, routes, or providers in the root `README.md`, `AGENTS.md`, or `docs/`.

The product boundary still applies: a wallet is a public address. Do not add key import, signing, or buy/sell/send execution. See [docs/decisions/0001-address-only-lookup.md](../docs/decisions/0001-address-only-lookup.md).

## Layout

| Path | Role |
| --- | --- |
| `poc/web` | React app. Package name `web`. |
| `poc/server` | Express API. Package name `server`. |
| `poc/docs/architecture.md` | How this proof of concept is wired |
| `poc/web/AGENTS.md` | Web notes |
| `poc/server/AGENTS.md` | API notes |

## Commands

Run these from the repo root.

```sh
pnpm install
pnpm poc:web       # Vite dev server
pnpm poc:server    # API on port 4000
pnpm --filter web lint
pnpm --filter web build
pnpm --filter server build
```

There is no test script.

## When this experiment changes

Update `poc/docs/architecture.md` in the same change when a route, env var, or data flow changes. Update `poc/AGENTS.md` when a command or invariant on this page changes.

Do not update root `docs/` to describe this folder.
