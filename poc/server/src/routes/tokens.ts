import { Router } from "express"
import { DexScreenerError, fetchTokenDetail, fetchTokenDetails } from "../dexscreener/token.js"
import { isSolanaAddress } from "../helius/balances.js"

export const tokensRouter = Router()

const MAX_MINTS = 100

tokensRouter.get("/v1/tokens/:mint", async (req, res) => {
  const mints = [...new Set(req.params.mint.split(",").filter(Boolean))]

  if (mints.length === 0 || mints.length > MAX_MINTS || mints.some((mint) => !isSolanaAddress(mint))) {
    res.status(400).json({ error: "Invalid token mint" })
    return
  }

  try {
    if (mints.length === 1) {
      const token = await fetchTokenDetail(mints[0])
      if (!token) {
        res.status(404).json({ error: "Token not found" })
        return
      }

      res.json(token)
      return
    }

    const tokens = await fetchTokenDetails(mints);
    console.log(mints)
    res.json(tokens)
  } catch (error) {
    if (error instanceof DexScreenerError && error.status === 429) {
      res.status(429).json({ error: "Failed to fetch token" })
      return
    }

    res.status(502).json({ error: "Failed to fetch token" })
  }
})
