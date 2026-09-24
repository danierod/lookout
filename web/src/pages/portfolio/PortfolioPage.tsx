import { holdings } from "../../data/fixtures.ts"
import { TokenRow } from "../../components/TokenRow.tsx"
import { formatAmount, formatUsd } from "../../lib/format.ts"

export function PortfolioPage() {
  const total = holdings.reduce((sum, holding) => sum + holding.amount * holding.priceUsd, 0)

  return (
    <section>
      <p className="eyebrow">Portfolio</p>
      <h1>{formatUsd(total)}</h1>
      <p className="muted">Sample balances for the address in the header.</p>
      <div className="list">
        {holdings.map((holding) => (
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
