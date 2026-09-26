import { TokenRow } from "../../components/TokenRow.tsx"
import { formatAmount, formatUsd } from "../../lib/format.ts"
import { usePortfolio } from "./usePortfolio.ts"

export function PortfolioPage() {
  const {balances, total} = usePortfolio();

  return (
    <section>
      <p className="eyebrow">Portfolio</p>
      <h1>{formatUsd(total || 0)}</h1>
      <div className="list">
        {balances?.map((holding) => (
          <TokenRow
            key={holding.mint}
            token={holding}
            detail={`${formatAmount(holding.amount)} ${holding.symbol}`}
          />
        ))}
      </div>
    </section>
  )
}
