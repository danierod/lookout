import "dotenv/config"

export const config = {
  port: Number(process.env.PORT ?? 4000),
  databasePath: process.env.DATABASE_PATH ?? "data/lookout.sqlite",
  redisUrl: process.env.REDIS_URL ?? "redis://localhost:6379",
}
