import { Redis } from "ioredis"
import { config } from "../config.js"

export const redis = new Redis(config.redisUrl, {
  lazyConnect: true,
  maxRetriesPerRequest: 1,
})
