# Server

Express API in `poc/server`. Dev server: `pnpm poc:server` from the repo root, or `pnpm dev` from this directory. Build: `pnpm build`.

## Routes

Add HTTP routes under `src/routes/` and mount them from `src/index.ts`. Keep the `/v1/` prefix.

- Balances: `src/routes/wallet.ts` → `src/helius/balances.ts`
- Token market data: `src/routes/tokens.ts` → `src/dexscreener/token.ts`
- Env and defaults: `src/config.ts`

Validate Solana addresses with `isSolanaAddress` in `src/helius/balances.ts`. Map upstream failures to 502, and upstream HTTP 429 to 429. Do not return provider response bodies to the client.

## Data stores

- SQLite via TypeORM (`src/data-source.ts`). No entities yet. `synchronize` is on for this proof of concept.
- Redis (`src/cache/redis.ts`) connects at startup and is optional. Nothing reads it yet. Do not require Redis for a request to succeed.

## Secrets

`HELIUS_API_KEY` stays in `poc/server/.env`. Never send that key to the browser, and never commit `.env`.
