export const paths = {
  import: "/",
  portfolio: "/portfolio",
  tokens: "/tokens",
  token: "/tokens/:mint",
  watchlist: "/watchlist",
  trade: "/tokens/:mint/trade",
} as const

export function tokenPath(mint: string) {
  return `/tokens/${mint}`
}

export function tradePath(mint: string, side: "buy" | "sell" = "buy") {
  return `/tokens/${mint}/trade?side=${side}`
}
