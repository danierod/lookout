# Web

React app in `poc/web`. Dev server: `pnpm poc:web` from the repo root, or `pnpm dev` from this directory. Lint: `pnpm lint` (oxlint). Production build: `pnpm build`.

## State

- Server data goes through TanStack Query. Portfolio: `src/pages/portfolio/usePortfolio.ts`.
- The open address and watchlist live in `src/app/wallet-ui.tsx`. They are memory only.
- Search, token detail, watchlist rows, and the trade preview read `src/data/fixtures.ts`. Do not pretend those screens are live chain data.
- API origin: `src/lib/api.ts`. Default `http://localhost:4000`.

## Routes

Defined in `src/app/paths.ts`. Shell for everything except import: `src/components/AppShell.tsx`.

Keep new screens inside the table in `poc/docs/architecture.md`. A screen that calls a new endpoint needs the server route and that architecture doc in the same change. Do not record the screen in the root `docs/` folder.

## UI

Follow the product visual language in [DESIGN.md](../../DESIGN.md) and [docs/design/theme.css](../../docs/design/theme.css). `src/main.tsx` imports that theme file. Do not invent colors, type sizes, spacing, radius, or durations in this app. The theme is light only.

Prefer a continuous path back to portfolio or import over a dead end. Buy and sell controls on the trade page are a preview. They must not sign or send.
