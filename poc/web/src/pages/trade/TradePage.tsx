import { useState } from "react"
import { Link, useParams, useSearchParams } from "react-router-dom"
import { tokenPath } from "../../app/paths.ts"
import { findToken } from "../../data/fixtures.ts"
import { formatUsd } from "../../lib/format.ts"

const usdc = findToken("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v")

export function TradePage() {
  const { mint = "" } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const token = findToken(mint)
  const side = searchParams.get("side") === "sell" ? "sell" : "buy"
  const [amount, setAmount] = useState("10")

  if (!token || !usdc) {
    return (
      <section>
        <h1>Token not found</h1>
        <Link to={tokenPath(mint)}>Back</Link>
      </section>
    )
  }

  const parsed = Number(amount)
  const preview = Number.isFinite(parsed) && parsed > 0 ? parsed : 0
  const receive = side === "buy" ? preview / token.priceUsd : preview * token.priceUsd
  const receiveLabel = side === "buy" ? token.symbol : "USDC"

  return (
    <section>
      <p className="caption">
        <Link to={tokenPath(token.mint)}>{token.symbol}</Link>
      </p>
      <h1>{side === "buy" ? "Buy" : "Sell"}</h1>
      <div className="segment" role="group" aria-label="Side">
        <button
          type="button"
          aria-pressed={side === "buy"}
          onClick={() => setSearchParams({ side: "buy" })}
        >
          Buy
        </button>
        <button
          type="button"
          aria-pressed={side === "sell"}
          onClick={() => setSearchParams({ side: "sell" })}
        >
          Sell
        </button>
      </div>
      <div className="field">
        <label htmlFor="amount">{side === "buy" ? "You pay (USDC)" : `You sell (${token.symbol})`}</label>
        <input
          id="amount"
          inputMode="decimal"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
      </div>
      <div className="quote">
        <p className="caption">Sample rate · {formatUsd(token.priceUsd)}</p>
        <p className="quote-out">
          You receive {receive.toLocaleString("en-US", { maximumFractionDigits: 4 })} {receiveLabel}
        </p>
      </div>
      <button type="button" disabled>
        Continue
      </button>
      <p>Quote handoff is not connected.</p>
    </section>
  )
}
