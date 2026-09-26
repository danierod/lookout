import { config } from "../config.js"

export type TokenDetail = {
  mint: string
  symbol: string
  name: string
  priceUsd: number
  change24h: number
  liquidityUsd: number
  volume24h: number
  iconUrl: string | null
}

type DexPair = {
  baseToken?: {
    address?: string
    name?: string
    symbol?: string
  }
  priceUsd?: string | null
  priceChange?: { h24?: number | null }
  volume?: { h24?: number | null }
  liquidity?: { usd?: number | null }
  info?: { imageUrl?: string | null }
}

const DEX_BATCH_SIZE = 30

export async function fetchTokenDetail(mint: string): Promise<TokenDetail | null> {
  const [token] = await fetchTokenDetails([mint])
  return token ?? null
}

export async function fetchTokenDetails(mints: string[]): Promise<TokenDetail[]> {
  const chunks = chunk(mints, DEX_BATCH_SIZE)
  const pairs = (await Promise.all(chunks.map(fetchPairs))).flat()

  return mints.flatMap((mint) => {
    const token = tokenFromPairs(pairs, mint)
    return token ? [token] : []
  })
}

function chunk<T>(items: T[], size: number) {
  const chunks: T[][] = []
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size))
  }
  return chunks
}

async function fetchPairs(mints: string[]) {
  const response = await fetch(`${config.dexscreenerApiUrl}/tokens/v1/solana/${mints.join(",")}`)

  if (!response.ok) {
    const detail = await response.text()
    throw new DexScreenerError(response.status, detail)
  }

  return (await response.json()) as DexPair[]
}

function tokenFromPairs(pairs: DexPair[], mint: string): TokenDetail | null {
  const pair = bestPair(pairs, mint)
  if (!pair?.baseToken?.address) return null

  return {
    mint: pair.baseToken.address,
    symbol: pair.baseToken.symbol ?? "",
    name: pair.baseToken.name ?? "",
    priceUsd: Number(pair.priceUsd) || 0,
    change24h: pair.priceChange?.h24 ?? 0,
    liquidityUsd: pair.liquidity?.usd ?? 0,
    volume24h: pair.volume?.h24 ?? 0,
    iconUrl: pair.info?.imageUrl ?? iconUrl(pairs, mint) ?? null,
  }
}

function bestPair(pairs: DexPair[], mint: string) {
  return pairs
    .filter((pair) => pair.baseToken?.address === mint)
    .reduce<DexPair | null>((best, pair) => {
      if (!best) return pair
      return liquidityUsd(pair) > liquidityUsd(best) ? pair : best
    }, null)
}

function liquidityUsd(pair: DexPair) {
  return pair.liquidity?.usd ?? 0
}

function iconUrl(pairs: DexPair[], mint: string) {
  return pairs.find((pair) => pair.baseToken?.address === mint && pair.info?.imageUrl)?.info?.imageUrl
}

export class DexScreenerError extends Error {
  constructor(
    readonly status: number,
    readonly detail: string,
  ) {
    super(`DexScreener token request failed (${status})`)
  }
}
