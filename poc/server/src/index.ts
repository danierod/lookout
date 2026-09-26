import "reflect-metadata"
import { mkdirSync } from "node:fs"
import { dirname } from "node:path"
import cors from "cors"
import express from "express"
import { redis } from "./cache/redis.js"
import { config } from "./config.js"
import { AppDataSource } from "./data-source.js"
import { tokensRouter } from "./routes/tokens.js"
import { walletRouter } from "./routes/wallet.js"

mkdirSync(dirname(config.databasePath), { recursive: true })

const app = express()
app.use(cors())
app.use(express.json())

app.get("/health", (_req, res) => {
  res.json({ ok: true })
})

app.use(walletRouter)
app.use(tokensRouter)

await AppDataSource.initialize()

redis.on("error", () => {})
await redis.connect().catch(() => {
  console.warn("redis unavailable")
})

app.listen(config.port, () => {
  console.log(`server listening on ${config.port}`)
})
