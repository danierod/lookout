import { Link } from "react-router-dom"
import { tokenPath } from "../app/paths.ts"
import type { Token } from "../data/fixtures.ts"
import { formatChange, formatUsd } from "../lib/format.ts"

export function TokenRow({ token, detail }: { token: Token; detail?: string }) {
  return (
    <Link to={tokenPath(token.mint)} className="row">
      <span className="mark" aria-hidden="true">
        {token.symbol.slice(0, 1)}
      </span>
      <span className="row-name">
        <strong>{token.symbol}</strong>
        <small>{detail ? `${token.name} · ${detail}` : token.name}</small>
      </span>
      <span className="row-price">
        <strong>{formatUsd(token.priceUsd)}</strong>
        <small className={token.change24h >= 0 ? "up" : "down"}>{formatChange(token.change24h)}</small>
      </span>
    </Link>
  )
}
