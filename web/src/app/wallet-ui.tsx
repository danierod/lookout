import { createContext, useContext, useState, type ReactNode } from "react"
import { initialWatchMints, sampleAddress } from "../data/fixtures.ts"

type WalletUi = {
  address: string
  setAddress: (address: string) => void
  watched: string[]
  isWatched: (mint: string) => boolean
  toggleWatch: (mint: string) => void
}

const WalletUiContext = createContext<WalletUi | null>(null)

export function WalletUiProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState(sampleAddress)
  const [watched, setWatched] = useState(initialWatchMints)

  const value: WalletUi = {
    address,
    setAddress,
    watched,
    isWatched: (mint) => watched.includes(mint),
    toggleWatch: (mint) => {
      setWatched((current) =>
        current.includes(mint) ? current.filter((item) => item !== mint) : [...current, mint],
      )
    },
  }

  return <WalletUiContext value={value}>{children}</WalletUiContext>
}

export function useWalletUi() {
  const value = useContext(WalletUiContext)
  if (!value) throw new Error("useWalletUi must be used inside WalletUiProvider")
  return value
}
