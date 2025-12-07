import { drizzle } from "drizzle-orm/node-postgres";

export function initDatabase() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in environment variables");
  }
  return drizzle(process.env.DATABASE_URL);
}
