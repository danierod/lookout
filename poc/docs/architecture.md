# Proof of concept architecture

This document describes `poc/` only. The Lookout product architecture is [docs/architecture.md](../../docs/architecture.md), and that implementation has not started.

```
poc/web      React 19, Vite, React Router, TanStack Query
poc/server   Express 5, TypeORM, better-sqlite3, ioredis
```

Root scripts in `package.json`: `poc:web` and `poc:server`.

## Web

Entry: `poc/web/src/main.tsx`. Routes: `poc/web/src/app/App.tsx` and `poc/web/src/app/paths.ts`.

| Path | Screen | Data |
| --- | --- | --- |
| `/` | Import | Address stored in React state |
| `/portfolio` | Portfolio | `GET /v1/wallet/:address/balances`, then token icons |
| `/tokens` | Search | `poc/web/src/data/fixtures.ts` |
| `/tokens/:mint` | Token detail | Fixtures |
| `/tokens/:mint/trade` | Buy/sell preview | Fixtures. No transaction is sent. |
| `/watchlist` | Watchlist | In-memory mint list, seeded from fixtures |

`WalletUiProvider` in `poc/web/src/app/wallet-ui.tsx` holds the current address and the watchlist. Both reset on refresh.

The browser calls the API through `apiBaseUrl` in `poc/web/src/lib/api.ts`. Default: `http://localhost:4000`. Override with `VITE_API_URL`.

Portfolio loading is `poc/web/src/pages/portfolio/usePortfolio.ts`.

## Server

Entry: `poc/server/src/index.ts`. Config: `poc/server/src/config.ts`.

| Method | Path | Source |
| --- | --- | --- |
| `GET` | `/health` | Process liveness |
| `GET` | `/v1/wallet/:address/balances` | Helius. `poc/server/src/helius/balances.ts` |
| `GET` | `/v1/tokens/:mint` | DexScreener. One mint, or a comma-separated list up to 100. `poc/server/src/dexscreener/token.ts` |

Wallet balances require a Solana address of 32–44 base58 characters. `page` defaults to 1. `limit` defaults to 100 and cannot exceed 100. Helius is called with native balances on, NFTs off, and zero balances off. `total` is the sum of `amount * priceUsd` on the returned page, not the whole wallet.

Missing `HELIUS_API_KEY` returns 500 on the balances route. Upstream failure returns 502. Upstream HTTP 429 returns 429.

## Startup dependencies

On listen, the server:

1. Creates the parent directory for the SQLite file.
2. Initializes TypeORM (`poc/server/src/data-source.ts`). `synchronize` is true. `entities` is empty, so no tables are mapped yet.
3. Connects to Redis (`poc/server/src/cache/redis.ts`). A failed connect logs `redis unavailable` and the process still serves traffic. No route reads Redis yet.

## Environment

Put these in `poc/server/.env`. Defaults are in `poc/server/src/config.ts`.

| Variable | Default |
| --- | --- |
| `PORT` | `4000` |
| `DATABASE_PATH` | `data/lookout.sqlite` (relative to `poc/server` when started via pnpm) |
| `REDIS_URL` | `redis://localhost:6379` |
| `HELIUS_API_KEY` | empty |
| `HELIUS_API_URL` | `https://api.helius.xyz` |
| `DEXSCREENER_API_URL` | `https://api.dexscreener.com` |

`poc/server/data`, `.env`, and `*.sqlite` are gitignored.

## Portfolio request

1. Import screen writes the address into `WalletUiProvider` and navigates to `/portfolio`.
2. `usePortfolio` requests `/v1/wallet/:address/balances`.
3. The server validates the address and asks Helius for that page of balances.
4. The web app then requests `/v1/tokens/:mint,:mint,...` and uses DexScreener icons on each row.
