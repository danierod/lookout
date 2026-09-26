# Lookout proof of concept

This folder is a disposable proof of concept. It is not the Lookout product. Product intent lives in [docs/product.md](../docs/product.md). Notes for this tree live here, not in the root `docs/` folder.

## Run

Install dependencies from the repo root:

```sh
pnpm install
```

Start the API (port 4000):

```sh
pnpm poc:server
```

Start the web app (Vite, port 5173):

```sh
pnpm poc:web
```

Wallet balances need `HELIUS_API_KEY` in `poc/server/.env`. That file is gitignored. See [docs/architecture.md](docs/architecture.md) for every variable.

## Docs

| File | What it holds |
| --- | --- |
| [AGENTS.md](AGENTS.md) | How to change this proof of concept |
| [docs/architecture.md](docs/architecture.md) | Packages, routes, and data flow |
| [web/AGENTS.md](web/AGENTS.md) | Web app notes |
| [server/AGENTS.md](server/AGENTS.md) | API notes |
