import { config } from "../config.js"

const SOLANA_ADDRESS = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/

export type WalletBalance = {
  mint: string
  symbol: string | null
  name: string | null
  amount: number
  priceUsd: number | null
  logoUrl: string | null
}

export type WalletBalancesPage = {
  balances: WalletBalance[]
  total: number
  pagination: {
    page: number
    limit: number
    hasMore: boolean
  }
}

type HeliusTokenBalance = {
  mint: string
  symbol?: string | null
  name?: string | null
  balance: number
  pricePerToken?: number | null
  logoUrl?: string | null
}

type HeliusBalancesResponse = {
  balances: HeliusTokenBalance[]
  pagination: {
    page: number
    limit: number
    hasMore: boolean
  }
}

export function isSolanaAddress(address: string) {
  return SOLANA_ADDRESS.test(address)
}

export async function fetchWalletBalances(
  address: string,
  page: number,
  limit: number,
): Promise<WalletBalancesPage> {
  const url = new URL(`${config.heliusApiUrl}/v1/wallet/${address}/balances`)
  url.searchParams.set("page", String(page))
  url.searchParams.set("limit", String(limit))
  url.searchParams.set("showNative", "true")
  url.searchParams.set("showNfts", "false")
  url.searchParams.set("showZeroBalance", "false")

  const response = await fetch(url, {
    headers: { "X-Api-Key": config.heliusApiKey },
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new HeliusError(response.status, detail)
  }

  const body = (await response.json()) as HeliusBalancesResponse

  return {
    balances: body.balances.map((token) => ({
      mint: token.mint,
      symbol: token.symbol ?? null,
      name: token.name ?? null,
      amount: token.balance,
      priceUsd: token.pricePerToken ?? null,
      logoUrl: token.logoUrl ?? null,
    })),
    total: body.balances.reduce((sum, token) => sum + token.balance * (token.pricePerToken ?? 0), 0),
    pagination: body.pagination,
  }
}

export class HeliusError extends Error {
  constructor(
    readonly status: number,
    readonly detail: string,
  ) {
    super(`Helius balances request failed (${status})`)
  }
}
