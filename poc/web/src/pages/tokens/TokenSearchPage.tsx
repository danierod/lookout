import { useMemo, useState } from "react"
import { tokens } from "../../data/fixtures.ts"
import { TokenRow } from "../../components/TokenRow.tsx"

export function TokenSearchPage() {
  const [query, setQuery] = useState("")
  const normalized = query.trim().toLowerCase()
  const results = useMemo(
    () =>
      tokens.filter((token) => {
        if (!normalized) return true
        return (
          token.symbol.toLowerCase().includes(normalized) ||
          token.name.toLowerCase().includes(normalized) ||
          token.mint.toLowerCase().includes(normalized)
        )
      }),
    [normalized],
  )

  return (
    <section>
      <p className="eyebrow">Tokens</p>
      <h1>Search</h1>
      <label className="sr-only" htmlFor="token-search">
        Search tokens
      </label>
      <input
        id="token-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Symbol, name, or mint"
      />
      {results.length === 0 ? (
        <p className="muted empty">No tokens match that search.</p>
      ) : (
        <div className="list">
          {results.map((token) => (
            <TokenRow key={token.mint} token={token} />
          ))}
        </div>
      )}
    </section>
  )
}
