import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { paths } from "../../app/paths.ts"
import { useWalletUi } from "../../app/wallet-ui.tsx"
import { sampleAddress } from "../../data/fixtures.ts"

export function ImportPage() {
  const navigate = useNavigate()
  const { address, setAddress } = useWalletUi()
  const [draft, setDraft] = useState(address)
  const [error, setError] = useState("")

  function openPortfolio(nextAddress: string) {
    const trimmed = nextAddress.trim()
    if (!trimmed) return
    setAddress(trimmed)
    navigate(paths.portfolio)
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    const trimmed = draft.trim()
    if (!trimmed) {
      setError("Enter a public Solana address.")
      return
    }
    setError("")
    openPortfolio(trimmed)
  }

  return (
    <main className="import">
      <form className="import-card" onSubmit={onSubmit}>
        <p className="caption">Lookout</p>
        <h1>Import a wallet</h1>
        <p>Paste a public Solana address. This screen does not read a chain yet.</p>
        <div className="field">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            name="address"
            value={draft}
            onChange={(event) => {
              setDraft(event.target.value)
              if (error) setError("")
            }}
            autoComplete="off"
            spellCheck={false}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "address-error" : undefined}
          />
          {error ? (
            <p id="address-error" className="field-error" role="alert">
              {error}
            </p>
          ) : null}
        </div>
        <div className="actions">
          <button type="submit">Continue</button>
          <button type="button" className="secondary" onClick={() => openPortfolio(sampleAddress)}>
            Use sample wallet
          </button>
        </div>
      </form>
    </main>
  )
}
