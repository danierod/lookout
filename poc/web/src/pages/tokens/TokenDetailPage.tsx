import { Link, useParams } from "react-router-dom"
import { paths, tradePath } from "../../app/paths.ts"
import { useWalletUi } from "../../app/wallet-ui.tsx"
import { findToken } from "../../data/fixtures.ts"
import { formatChange, formatCompactUsd, formatUsd } from "../../lib/format.ts"

export function TokenDetailPage() {
  const { mint = "" } = useParams()
  const token = findToken(mint)
  const { isWatched, toggleWatch } = useWalletUi()

  if (!token) {
    return (
      <section>
        <h1>Token not found</h1>
        <Link to={paths.tokens}>Back to tokens</Link>
      </section>
    )
  }

  const watched = isWatched(token.mint)

  return (
    <section>
      <p className="caption">{token.name}</p>
      <h1>{token.symbol}</h1>
      <p className="display">{formatUsd(token.priceUsd)}</p>
      <p className={token.change24h >= 0 ? "gain" : "loss"}>{formatChange(token.change24h)}</p>
      <dl className="stats">
        <div>
          <dt>Mint</dt>
          <dd className="mint">{token.mint}</dd>
        </div>
        <div>
          <dt>Liquidity</dt>
          <dd>{formatCompactUsd(token.liquidityUsd)}</dd>
        </div>
        <div>
          <dt>24h volume</dt>
          <dd>{formatCompactUsd(token.volume24h)}</dd>
        </div>
      </dl>
      <div className="actions">
        <Link className="button" to={tradePath(token.mint, "buy")}>
          Buy
        </Link>
        <Link className="button secondary" to={tradePath(token.mint, "sell")}>
          Sell
        </Link>
        <button type="button" className="text" onClick={() => toggleWatch(token.mint)}>
          {watched ? "Remove from watchlist" : "Add to watchlist"}
        </button>
      </div>
    </section>
  )
}
