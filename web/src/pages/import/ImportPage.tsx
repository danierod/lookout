import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { paths } from "../../app/paths.ts"
import { useWalletUi } from "../../app/wallet-ui.tsx"
import { sampleAddress } from "../../data/fixtures.ts"

export function ImportPage() {
  const navigate = useNavigate()
  const { address, setAddress } = useWalletUi()
  const [draft, setDraft] = useState(address)

  function openPortfolio(nextAddress: string) {
    const trimmed = nextAddress.trim()
    if (!trimmed) return
    setAddress(trimmed)
    navigate(paths.portfolio)
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    openPortfolio(draft)
  }

  return (
    <main className="import">
      <form className="card import-card" onSubmit={onSubmit}>
        <p className="eyebrow">Lookout</p>
        <h1>Import a wallet</h1>
        <p className="muted">Paste a public Solana address. This screen does not read a chain yet.</p>
        <label htmlFor="address">Address</label>
        <input
          id="address"
          name="address"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          autoComplete="off"
          spellCheck={false}
        />
        <div className="actions">
          <button type="submit">Continue</button>
          <button type="button" className="ghost" onClick={() => openPortfolio(sampleAddress)}>
            Use sample wallet
          </button>
        </div>
      </form>
    </main>
  )
}
