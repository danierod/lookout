import { Link } from "react-router-dom"
import { paths } from "../../app/paths.ts"
import { useWalletUi } from "../../app/wallet-ui.tsx"
import { tokens } from "../../data/fixtures.ts"
import { TokenRow } from "../../components/TokenRow.tsx"

export function WatchlistPage() {
  const { watched } = useWalletUi()
  const rows = tokens.filter((token) => watched.includes(token.mint))

  return (
    <section>
      <p className="eyebrow">Watchlist</p>
      <h1>Watching</h1>
      {rows.length === 0 ? (
        <p className="muted empty">
          Nothing saved. <Link to={paths.tokens}>Browse tokens</Link> and add one.
        </p>
      ) : (
        <div className="list">
          {rows.map((token) => (
            <TokenRow key={token.mint} token={token} />
          ))}
        </div>
      )}
    </section>
  )
}
