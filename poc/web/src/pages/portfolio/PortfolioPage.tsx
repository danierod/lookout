import { TokenRow } from "../../components/TokenRow.tsx"
import { formatAmount, formatUsd } from "../../lib/format.ts"
import { usePortfolio } from "./usePortfolio.ts"

export function PortfolioPage() {
  const { balances, total, isLoading, isError, refetch } = usePortfolio()

  if (isLoading) {
    return (
      <section aria-busy="true">
        <p className="caption">Portfolio</p>
        <div className="skeleton skeleton-display" />
        <div className="list" aria-hidden="true">
          <div className="skeleton skeleton-row" />
          <div className="skeleton skeleton-row" />
          <div className="skeleton skeleton-row" />
        </div>
        <p className="sr-only">Loading holdings.</p>
      </section>
    )
  }

  if (isError) {
    return (
      <section>
        <h1>Portfolio unavailable</h1>
        <p className="field-error" role="alert">
          Wallet balances did not load. Try again.
        </p>
        <button type="button" onClick={() => refetch()}>
          Try again
        </button>
      </section>
    )
  }

  return (
    <section>
      <p className="caption">Portfolio</p>
      <h1 className="display">{formatUsd(total ?? 0)}</h1>
      {balances && balances.length > 0 ? (
        <div className="list">
          {balances.map((holding) => (
            <TokenRow
              key={holding.mint}
              token={holding}
              detail={`${formatAmount(holding.amount)} ${holding.symbol}`}
            />
          ))}
        </div>
      ) : (
        <p>No holdings in this wallet.</p>
      )}
    </section>
  )
}
