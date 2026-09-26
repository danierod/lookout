import { Router } from "express"
import { config } from "../config.js"
import { fetchWalletBalances, HeliusError, isSolanaAddress } from "../helius/balances.js"

export const walletRouter = Router()

walletRouter.get("/v1/wallet/:address/balances", async (req, res) => {
  const address = req.params.address

  if (!isSolanaAddress(address)) {
    res.status(400).json({ error: "Invalid wallet address" })
    return
  }

  const page = parsePositiveInt(req.query.page, 1)
  const limit = parsePositiveInt(req.query.limit, 100)

  if (page === null || limit === null || limit > 100) {
    res.status(400).json({ error: "page must be >= 1 and limit must be 1-100" })
    return
  }

  if (!config.heliusApiKey) {
    res.status(500).json({ error: "HELIUS_API_KEY is not configured" })
    return
  }

  try {
    const balances = await fetchWalletBalances(address, page, limit)
    res.json(balances)
  } catch (error) {
    if (error instanceof HeliusError) {
      const status = error.status === 429 ? 429 : 502
      res.status(status).json({ error: "Failed to fetch wallet balances" })
      return
    }

    res.status(502).json({ error: "Failed to fetch wallet balances" })
  }
})

function parsePositiveInt(value: unknown, fallback: number) {
  if (value === undefined) return fallback
  if (typeof value !== "string" || !/^[1-9]\d*$/.test(value)) return null
  return Number(value)
}
