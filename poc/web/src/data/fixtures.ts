export type Token = {
  mint: string
  symbol: string
  name: string
  priceUsd: number
  change24h: number
  liquidityUsd: number
  volume24h: number
  iconUrl?: string | null
}

export type Holding = Token & {
  amount: number
}

export const sampleAddress = "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"

export const tokens: Token[] = [
  {
    mint: "So11111111111111111111111111111111111111112",
    symbol: "SOL",
    name: "Solana",
    priceUsd: 148.22,
    change24h: 2.4,
    liquidityUsd: 842_000_000,
    volume24h: 1_240_000_000,
  },
  {
    mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    symbol: "USDC",
    name: "USD Coin",
    priceUsd: 1,
    change24h: 0.01,
    liquidityUsd: 2_100_000_000,
    volume24h: 980_000_000,
  },
  {
    mint: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
    symbol: "JUP",
    name: "Jupiter",
    priceUsd: 0.82,
    change24h: -1.6,
    liquidityUsd: 48_000_000,
    volume24h: 36_000_000,
  },
  {
    mint: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
    symbol: "BONK",
    name: "Bonk",
    priceUsd: 0.0000214,
    change24h: 6.8,
    liquidityUsd: 12_400_000,
    volume24h: 28_000_000,
  },
  {
    mint: "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm",
    symbol: "WIF",
    name: "dogwifhat",
    priceUsd: 1.74,
    change24h: -3.2,
    liquidityUsd: 9_800_000,
    volume24h: 15_200_000,
  },
]

export const holdings: Holding[] = [
  { ...tokens[0], amount: 12.48 },
  { ...tokens[1], amount: 840.15 },
  { ...tokens[2], amount: 620 },
  { ...tokens[3], amount: 4_200_000 },
]

export const initialWatchMints = [tokens[3].mint, tokens[4].mint]

export function findToken(mint: string) {
  return tokens.find((token) => token.mint === mint)
}
