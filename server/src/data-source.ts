import { DataSource } from "typeorm"
import { config } from "./config.js"

export const AppDataSource = new DataSource({
  type: "better-sqlite3",
  database: config.databasePath,
  synchronize: true,
  entities: [],
})
