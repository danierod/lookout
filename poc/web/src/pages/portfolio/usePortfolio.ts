import { useQuery } from "@tanstack/react-query"
import { useWalletUi } from "../../app/wallet-ui"
import { apiBaseUrl } from "../../lib/api"
import type { Holding } from "../../data/fixtures"

type ApiBalance = {
  mint: string
  symbol: string | null
  name: string | null
  amount: number
  priceUsd: number | null
  logoUrl?: string | null
}

type BalanceReturnType = {
  balances: ApiBalance[]
  total: number
}

type TokenDetail = {
  mint: string
  iconUrl?: string | null
}

function tokenDetails(data: TokenDetail | TokenDetail[] | undefined) {
  if (!data) return []
  return Array.isArray(data) ? data : [data]
}

export const usePortfolio = () => {
  const walletAddress = useWalletUi().address

  const fetchHoldings = async () => {
    const response = await fetch(`${apiBaseUrl}/v1/wallet/${walletAddress}/balances`)
    if (!response.ok) throw new Error("Balances request failed")
    return response.json() as Promise<BalanceReturnType>
  }

  const holdingsQuery = useQuery<BalanceReturnType>({
    queryKey: ['portfolio', walletAddress],
    queryFn: fetchHoldings,
    enabled: !!walletAddress,
    staleTime: 30_000
  })

  const holdings = holdingsQuery.data

  const fetchTokens = (mints?: string) => {
    return fetch(`${apiBaseUrl}/v1/tokens/${mints}`).then(response => response.json())
  }

  const mints = holdings?.balances.map(balance => balance.mint).join(',')

  const {data: tokens} = useQuery<TokenDetail | TokenDetail[]>({
      queryKey: ['token-details', mints],
      queryFn: () => fetchTokens(mints),
      enabled: !!mints?.length,
      staleTime: 60_000
    })

  const icons = new Map(tokenDetails(tokens).map((token) => [token.mint, token.iconUrl]))

  const balances: Holding[] | undefined = holdings?.balances.map((balance) => ({
    mint: balance.mint,
    symbol: balance.symbol ?? "",
    name: balance.name ?? "",
    priceUsd: balance.priceUsd ?? 0,
    change24h: 0,
    liquidityUsd: 0,
    volume24h: 0,
    amount: balance.amount,
    iconUrl: icons.get(balance.mint) ?? balance.logoUrl ?? null,
  }))

  return {
    balances,
    total: holdings?.total,
    tokens,
    isLoading: holdingsQuery.isLoading,
    isError: holdingsQuery.isError,
    refetch: holdingsQuery.refetch,
  };

}