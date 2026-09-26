import "dotenv/config"

export const config = {
  port: Number(process.env.PORT ?? 4000),
  databasePath: process.env.DATABASE_PATH ?? "data/lookout.sqlite",
  redisUrl: process.env.REDIS_URL ?? "redis://localhost:6379",
  heliusApiKey: process.env.HELIUS_API_KEY ?? "",
  heliusApiUrl: process.env.HELIUS_API_URL ?? "https://api.helius.xyz",
  dexscreenerApiUrl: process.env.DEXSCREENER_API_URL ?? "https://api.dexscreener.com",
}
